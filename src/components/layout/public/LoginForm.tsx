/* eslint-disable react/jsx-props-no-spreading */

import { z } from "zod";
import {
  createStyles,
  rem,
  Paper,
  Title,
  Text,
  SimpleGrid,
  TextInput,
  PasswordInput,
  Button,
  Center,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Link } from "react-router-dom";

import { useIsSM } from "../../../hooks/useIsSM";

const MARGIN_X = 200;
const MARGIN_TOP = 100;
const MARGIN_BOTTOM = 200;
const PADDING = 40;

const valSchema = z.object({
  email: z.string().email({ message: "El email no está en formato correcto" }),
  password: z.string().nonempty({ message: "La contraseña es requerida" }),
});

type LoginFormShape = z.infer<typeof valSchema>;

interface LoginFormProps {
  userType: "user" | "owner";
}

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
}));

const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
  const form = useForm<LoginFormShape>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: zodResolver(valSchema),
    validateInputOnBlur: true,
  });

  const { classes, theme } = useStyles();

  const isSM = useIsSM();

  const loginClick: React.MouseEventHandler<HTMLButtonElement> = (_e) => {
    if (form.isValid()) {
      console.log("Form is valid");
    } else {
      console.log("Form is invalid");
    }
  };

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
          Zona{" "}
          <Text inherit span>
            {userType === "owner" ? "Propietarios" : "Clientes"}
            <Link to={`/login/${userType === "owner" ? "user" : "owner"}`}>
              <Center>
                <Button
                  variant="light"
                  compact
                  color={userType === "owner" ? "blue" : "green"}
                  mt={isSM ? "sm" : "md"}
                >
                  <Text size="lg" weight={600}>
                    Ir a Zona{" "}
                    {userType === "owner" ? "Clientes" : "Propietarios"}
                  </Text>
                </Button>
              </Center>
            </Link>
          </Text>
        </Title>
        <Title order={3} mt="xl" mb="xl" align="center">
          Iniciar sesión
        </Title>
        <SimpleGrid cols={1} mx={{ base: "xl", md: "sm" }}>
          <TextInput
            label="Correo electrónico"
            placeholder="jperez@gmail.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Contraseña"
            placeholder="******"
            required
            {...form.getInputProps("password")}
          />
        </SimpleGrid>
        <Center>
          <Button
            mt="xl"
            variant="light"
            size={isSM ? "md" : "lg"}
            radius="md"
            onClick={loginClick}
          >
            Iniciar sesión
          </Button>
        </Center>
      </form>
    </Paper>
  );
};

export type { LoginFormProps, LoginFormShape };
export default LoginForm;
