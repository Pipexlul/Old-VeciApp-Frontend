/* eslint-disable react/jsx-props-no-spreading */
import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
  Box,
} from "@mantine/core";

import type { Nullable } from "../../types/UtilityTypes";

import { getFirstLetters } from "../../utils/stringUtils";

const useStyles = createStyles((theme) => ({
  user: {
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}));

interface UserDisplayProps extends UnstyledButtonProps {
  image: Nullable<string>;
  name: string;
  email: string;
}

const UserDisplay: React.FC<UserDisplayProps> = ({
  image,
  name,
  email,
  ...others
}) => {
  const { classes } = useStyles();

  const fallbackLetters = getFirstLetters(name);

  return (
    <UnstyledButton className={classes.user} {...others}>
      <Group>
        <Avatar src={image} radius="xl" color="blue">
          {fallbackLetters}
        </Avatar>

        <Box>
          <Text size="sm" weight={500}>
            {name}
          </Text>
          <Text color="dimmed" size="xs" truncate>
            {email}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  );
};

export type { UserDisplayProps };
export default UserDisplay;
