/* eslint-disable react/jsx-props-no-spreading */

import { z } from "zod";
import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  Paper,
  rem,
  createStyles,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useForm, zodResolver } from "@mantine/form";

const MARGIN_X = 100;
const MARGIN_TOP = 100;
const MARGIN_BOTTOM = 200;
const PADDING = 40;

const valSchema = z.object({
  name: z.string().nonempty({ message: "El nombre es requerido" }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({ message: "El email no está en formato correcto" }),
  subject: z.string().nonempty({ message: "El asunto es requerido" }),
  message: z.string().nonempty({ message: "El mensaje es requerido" }),
});

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

const ContactForm: React.FC = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: zodResolver(valSchema),
    validateInputOnBlur: true,
  });

  const { classes, theme } = useStyles();

  // TODO: Extract isSM into it's own hook
  const isSM = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Paper shadow="lg" withBorder={!isSM} className={classes.root}>
      <form onSubmit={form.onSubmit(() => {})}>
        <Title
          order={2}
          size="h1"
          sx={{ fontFamily: `Greycliff CF, ${theme.fontFamily}` }}
          weight={900}
          align="center"
        >
          ¡Contáctanos!
        </Title>

        <SimpleGrid
          cols={2}
          mt="xl"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <TextInput
            label="Nombre"
            placeholder="Juan Perez"
            name="name"
            variant="filled"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="jperez@gmail.com"
            name="email"
            variant="filled"
            required
            {...form.getInputProps("email")}
          />
        </SimpleGrid>

        <TextInput
          label="Asunto"
          placeholder="Consultas, reclamos o felicitaciones"
          mt="md"
          name="subject"
          variant="filled"
          required
          {...form.getInputProps("subject")}
        />
        <Textarea
          mt="md"
          label="Mensaje"
          placeholder="Escriba su mensaje"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          maxLength={700}
          required
          {...form.getInputProps("message")}
        />

        <Group position="center" mt="xl">
          <Button type="submit" size="md">
            Enviar Mensaje
          </Button>
        </Group>
      </form>
    </Paper>
  );
};

export default ContactForm;
