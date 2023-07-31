import {
  createStyles,
  AppShell,
  Navbar,
  Box,
  Text,
  getStylesRef,
  rem,
} from "@mantine/core";
import { Link, NavLink, Outlet } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";

import { userDashboardData as data } from "../../../config/userDashboardLinks";

import UserDisplay from "../../../components/ui/UserDisplay";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));

const UserDashboard: React.FC = () => {
  const { classes, cx } = useStyles();

  const links = data.map((item) => (
    <NavLink key={item.label} to={item.path}>
      {({ isActive }) => (
        <Box className={cx(classes.link, { [classes.linkActive]: isActive })}>
          <item.icon className={classes.linkIcon} />
          <Text size="md">{item.label}</Text>
        </Box>
      )}
    </NavLink>
  ));

  return (
    <AppShell
      navbar={
        <Navbar hidden hiddenBreakpoint="sm" width={{ sm: 300 }} p="md">
          <Navbar.Section grow>
            <Box className={classes.header}>
              <UserDisplay
                email="hola@gmail.com"
                name="V1 Ultrakill"
                image={null}
              />
            </Box>
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <Link to="/logout" className={classes.link}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <Text size="md">Cerrar sesión</Text>
            </Link>
          </Navbar.Section>
        </Navbar>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default UserDashboard;
