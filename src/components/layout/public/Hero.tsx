import { Link } from "react-router-dom";
import {
  createStyles,
  Container,
  Title,
  Text,
  Button,
  rem,
  Group,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: "#11284b",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `${theme.fn.linearGradient(
      250,
      theme.colors[theme.primaryColor][7],
      "transparent"
    )}, url(https://images.pexels.com/photos/64613/pexels-photo-64613.jpeg)`,
    paddingTop: `calc(${theme.spacing.xl} * 3)`,
    paddingBottom: `calc(${theme.spacing.xl} * 3)`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("md")]: {
      flexDirection: "column",
    },
  },

  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  content: {
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan("md")]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: rem(500),
    fontSize: rem(48),
    filter: `drop-shadow(${rem(2)} ${rem(2)} ${rem(2)} ${theme.black})`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(34),
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: rem(500),
    fontSize: rem(20),
    fontWeight: 500,
    filter: `drop-shadow(${rem(1)} ${rem(1)} ${rem(2)} ${theme.black})`,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: rem(16),
    },
  },

  control: {
    paddingLeft: rem(50),
    paddingRight: rem(50),
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(22),

    [theme.fn.smallerThan("md")]: {
      width: "100%",
    },
  },
}));

const PublicHero: React.FC = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              Apoyando a los{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "red", to: "yellow" }}
              >
                pilares esenciales
              </Text>{" "}
              de los barrios de Chile
            </Title>

            <Text className={classes.description} mt={30}>
              Cotiza y busca los almacenes cercanos a ti y lo que ofrecen. Si
              eres dueño/a de un almacén, pública tu negocio para ser encontrado
              por tus clientes.
            </Text>

            <Group>
              <Link to="/login/user">
                <Button
                  variant="gradient"
                  gradient={{ from: "red", to: "orange" }}
                  size="xl"
                  className={classes.control}
                  mt={40}
                >
                  Zona Cliente
                </Button>
              </Link>
              <Link to="/login/owner">
                <Button
                  variant="gradient"
                  gradient={{ from: "red", to: "orange", deg: -45 }}
                  size="xl"
                  className={classes.control}
                  mt={40}
                >
                  Zona Propietario/a
                </Button>
              </Link>
            </Group>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PublicHero;
