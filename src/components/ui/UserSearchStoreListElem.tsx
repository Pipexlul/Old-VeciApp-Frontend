import {
  Button,
  SimpleGrid,
  Stack,
  Text,
  Title,
  createStyles,
} from "@mantine/core";

import { Link } from "react-router-dom";

import type { StoreDataListElement } from "../../types/StoreData";

interface UserSearchStoreListElemProps extends StoreDataListElement {}

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: theme.fn.rgba(theme.colors.gray[6], 0.25),
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
  },
}));

const UserSearchStoreListElem: React.FC<UserSearchStoreListElemProps> = ({
  store_id,
  store_name,
  owner_name,
  distance,
}) => {
  const { classes } = useStyles();

  return (
    <SimpleGrid
      className={classes.root}
      cols={3}
      breakpoints={[
        { maxWidth: "sm", cols: 1 },
        { maxWidth: "md", cols: 2 },
      ]}
    >
      <Stack>
        <Title order={2}>{store_name}</Title>
      </Stack>
      <Stack>
        <Text size="sm">
          {"Nombre propietario/a: "}
          <Text inherit fz="md" fw={600}>
            {owner_name}
          </Text>
        </Text>
      </Stack>
      <Stack>
        <Text size="sm" weight={600}>{`Distancia: ${distance.toFixed(
          0
        )} metros`}</Text>

        <Button component={Link} variant="outline" to={`store/${store_id}`}>
          Ver Más
        </Button>
      </Stack>
    </SimpleGrid>
  );
};

export default UserSearchStoreListElem;
