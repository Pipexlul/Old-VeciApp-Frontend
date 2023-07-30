import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  Divider,
  rem,
  px,
} from "@mantine/core";

import type { FeatureData } from "../../../types/Features";

import { featureDataOwner, featureDataUser } from "../../../config/features";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(24),
    },
  },

  categoryTitle: {
    fontSize: rem(28),
    fontWeight: 700,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(20),
    },
  },

  description: {
    maxWidth: 600,
    margin: "auto",

    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  cardTitle: {
    "&::after": {
      content: '""',
      display: "block",
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

const FeatureCards: React.FC = () => {
  const { classes, theme } = useStyles();

  const featureDataMapper = (feature: FeatureData) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  );

  const ownerFeatures = featureDataOwner.map(featureDataMapper);
  const clientFeatures = featureDataUser.map(featureDataMapper);

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Moderniza tu experiencia
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Las interacciones que ofrecen los supermercados no tienen que quedarse
        solo allí. Los vecinos merecen una mejor experiencia al comprar o al
        vender en los almacenes de barrio chilenos
      </Text>

      <Text className={classes.categoryTitle} ta="center" mt="lg">
        Para Propietarios/as:
      </Text>
      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={{ base: "sm", sm: rem(30) }}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {ownerFeatures}
      </SimpleGrid>

      <Divider
        orientation="horizontal"
        color={theme.primaryColor}
        mb={{ base: "sm", sm: "md" }}
        mt={{ base: rem(px(theme.spacing.sm) * 3) }}
      />

      <Text className={classes.categoryTitle} ta="center">
        Para Clientes:
      </Text>
      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={{ base: "sm", sm: rem(30) }}
        breakpoints={[{ maxWidth: "md", cols: 1 }]}
      >
        {clientFeatures}
      </SimpleGrid>
    </Container>
  );
};

export default FeatureCards;
