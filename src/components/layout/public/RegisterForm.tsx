/* eslint-disable react/jsx-props-no-spreading */

import { z } from "zod";
import {
  TextInput,
  SimpleGrid,
  Group,
  Title,
  Button,
  Paper,
  SegmentedControl,
  Center,
  rem,
  createStyles,
  PasswordInput,
} from "@mantine/core";
import { useDisclosure, useTimeout } from "@mantine/hooks";
import { useForm, zodResolver } from "@mantine/form";
import { modals } from "@mantine/modals";

import PasswordText from "../../inputs/PasswordText";

import { useIsSM } from "../../../hooks/useIsSM";

import { confirmModals } from "../../../config/modals";

import { withMergeFormPropWithChangeHandler } from "../../../utils/combineHandlers";

const { register: registerModal } = confirmModals;

const MARGIN_X = 100;
const MARGIN_TOP = 100;
const MARGIN_BOTTOM = 200;
const PADDING = 40;

const valSchema = z
  .object({
    type: z.union([z.literal("user"), z.literal("owner")]),
    name: z.string().nonempty({ message: "El nombre es requerido" }),
    lastName: z.string().nonempty({ message: "El apellido es requerido" }),
    email: z
      .string()
      .email({ message: "El email no está en formato correcto" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Las confirmación es requerida" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas deben coincidir",
    path: ["confirmPassword"],
  });

type RegisterShape = z.infer<typeof valSchema>;

const useStyles = createStyles((theme) => ({
  root: {
    marginLeft: rem(MARGIN_X),
    marginRight: rem(MARGIN_X),
    marginTop: rem(MARGIN_TOP),
    marginBottom: rem(MARGIN_BOTTOM),
    padding: rem(PADDING),

    [theme.fn.smallerThan("sm")]: {
      marginLeft: 0,
      marginRight: 0,
      marginTop: rem(MARGIN_TOP / 2),
      marginBottom: rem(MARGIN_BOTTOM / 4),
      padding: rem(PADDING / 2),
    },
  },

  indicator: {
    backgroundColor: theme.fn.rgba(theme.fn.primaryColor(), 0.5),
  },
}));

type TransformedRegisterShape = (
  obj: RegisterShape
) => Omit<RegisterShape, "confirmPassword">;

const RegisterForm: React.FC = () => {
  const form = useForm<RegisterShape, TransformedRegisterShape>({
    initialValues: {
      type: "user",
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: zodResolver(valSchema),
    validateInputOnBlur: true,
    validateInputOnChange: true,

    transformValues: (values) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...sentFields } = values;

      return sentFields;
    },
  });

  const [validForm, { open: setAsValid, close: setAsInvalid }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();
  const isSM = useIsSM();
  const { start: validateButton } = useTimeout(() => {
    if (form.isValid()) {
      setAsValid();
    } else {
      setAsInvalid();
    }
  }, 10);

  const checkValidation = () => {
    validateButton();
  };

  const mergeProps = withMergeFormPropWithChangeHandler(checkValidation);

  // TODO: Move max password length into a single source of truth

  return (
    <Paper shadow="lg" withBorder={!isSM} className={classes.root}>
      <form>
        <Title
          order={2}
          size="h1"
          sx={{ fontFamily: `Greycliff CF, ${theme.fontFamily}` }}
          weight={900}
          align="center"
        >
          Crea tu cuenta:
        </Title>

        <Center>
          <SegmentedControl
            classNames={{
              indicator: classes.indicator,
            }}
            size={isSM ? "md" : "lg"}
            mt={isSM ? "md" : "xl"}
            orientation={isSM ? "vertical" : "horizontal"}
            color="orange"
            value={form.values.type}
            onChange={(value: RegisterShape["type"]) => {
              form.setFieldValue("type", value);
            }}
            data={[
              { label: "Cliente", value: "user" },
              { label: "Propietario", value: "owner" },
            ]}
          />
        </Center>

        <SimpleGrid
          cols={2}
          mt="xl"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <TextInput
            label="Nombre"
            placeholder="Juan"
            name="name"
            variant="filled"
            required
            {...mergeProps(form.getInputProps("name"))}
          />
          <TextInput
            label="Apellido"
            placeholder="Perez"
            name="lastName"
            variant="filled"
            required
            {...mergeProps(form.getInputProps("lastName"))}
          />
        </SimpleGrid>

        <TextInput
          label="Email"
          placeholder="jperez@gmail.com"
          mt="md"
          name="email"
          variant="filled"
          required
          {...mergeProps(form.getInputProps("email"))}
        />

        <SimpleGrid
          mt="lg"
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <PasswordText
            mt="md"
            label="Contraseña"
            placeholder=""
            name="password"
            variant="filled"
            maxLength={20}
            required
            {...mergeProps(form.getInputProps("password"))}
          />

          <PasswordInput
            mt="md"
            label="Confirmar contraseña"
            placeholder=""
            name="confirmPassword"
            variant="filled"
            maxLength={20}
            required
            {...mergeProps(form.getInputProps("confirmPassword"))}
          />
        </SimpleGrid>

        {/* TODO: Integrate form submission with backend */}
        <Group position="center" mt="xl">
          <Button
            type="button"
            size="md"
            disabled={!validForm}
            onClick={() =>
              modals.openConfirmModal(
                registerModal(
                  form.values.type,
                  () => {
                    console.log("Submitted form:", form.getTransformedValues());
                    // form.reset(); // TODO: Enable reset on success from backend
                  },
                  () => {
                    console.log("Canceled form submission");
                  }
                )
              )
            }
          >
            Crear cuenta
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export { type RegisterShape };
export default RegisterForm;
