/* eslint-disable react/jsx-props-no-spreading */
import { z } from "zod";
import {
  Stack,
  Center,
  Paper,
  Text,
  TextInput,
  Title,
  Slider,
  createStyles,
  Divider,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

const TITLE_MULTIPLIER = 1.7;

const RADIUS_CONFIG = {
  min: 0,
  max: 2000,
  defaultVal: 100,
} as const;

const radiusMarks: { value: number; label: string }[] = ((amount: number) => {
  const markNums: number[] = [];

  const step = Math.floor(RADIUS_CONFIG.max / amount);

  for (let i = 0; i <= amount; i += 1) {
    markNums.push(i * step);
  }

  return markNums.map((mark) => ({
    value: mark,
    label: `${mark} m`,
  }));
})(5);

const useStyles = createStyles((theme) => ({
  root: {
    minHeight: "100%",
  },

  paper: {
    padding: theme.spacing.lg,
  },

  title: {
    fontWeight: 700,
    fontSize: `calc(${theme.fontSizes.lg} * ${TITLE_MULTIPLIER})`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: `calc(${theme.fontSizes.sm} * ${TITLE_MULTIPLIER})`,
    },
  },

  form: {},

  sliders: {
    marginTop: theme.spacing.sm,
  },

  labels: {
    display: "inline-block",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    color: "#C1C2C5",
    wordBreak: "break-word",
    cursor: "default",
    WebkitTapHighlightColor: "transparent",
  },
}));

const valSchema = z.object({
  searchFrom: z.string().nonempty({ message: "Ingrese su ubicación" }),
  radius: z
    .number()
    .min(RADIUS_CONFIG.min, { message: "Ingrese un valor mayor a 0" })
    .max(RADIUS_CONFIG.max, { message: "Ingrese un valor menor a 10000" }),
  itemToSearch: z.string().optional(),
});

type UserSearchShape = z.infer<typeof valSchema>;

const UserSearch: React.FC = () => {
  const { classes, theme } = useStyles();

  const form = useForm<UserSearchShape>({
    initialValues: {
      searchFrom: "",
      radius: RADIUS_CONFIG.defaultVal,
      itemToSearch: "",
    },

    validate: zodResolver(valSchema),
  });

  return (
    <Center className={classes.root}>
      <Paper className={classes.paper} shadow="md" withBorder>
        <Stack className={classes.form} spacing="xl">
          <Title
            className={classes.title}
            sx={{ fontFamily: `Greycliff CF, ${theme.fontFamily}` }}
          >
            Busca productos y negocios
          </Title>
          <TextInput
            label="Ubicación"
            placeholder="Dirección desde la cual quieres buscar"
            required
            {...form.getInputProps("searchFrom")}
          />
          <Divider />
          <Stack spacing="xs">
            <Text
              component="label"
              className={classes.labels}
              htmlFor="radiusSlider"
            >
              Radio de busqueda:{" "}
              <Text inherit fz="md" fw={700} span color="green.3">{`${
                form.values.radius
              } ${form.values.radius === 1 ? "metro" : "metros"}`}</Text>
            </Text>
            <Slider
              id="radiusSlider"
              pb="md"
              min={RADIUS_CONFIG.min}
              max={RADIUS_CONFIG.max}
              step={50}
              marks={radiusMarks}
              label={(value) => `${value} ${value === 1 ? "metro" : "metros"}`}
              styles={{
                markLabel: {
                  [theme.fn.smallerThan("sm")]: {
                    display: "none",
                  },
                },
              }}
              {...form.getInputProps("radius")}
            />
          </Stack>
          <Divider />
          <TextInput
            label="Item a buscar"
            description="Campo opcional. Si se deja vacío, se mostraran todos los almacenes en el radio"
            placeholder="Arroz Pregraneado"
          />
        </Stack>
      </Paper>
    </Center>
  );
};

export default UserSearch;
