import { NavLink, Link } from "react-router-dom";
import {
  createStyles,
  Header,
  Container,
  Divider,
  Group,
  Burger,
  Paper,
  Transition,
  Title,
  Box,
  rem,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import type { LinkData } from "../../../types/NavLinksConfig";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
    marginTop: rem(20),
    marginBottom: rem(20),

    [theme.fn.smallerThan("sm")]: {
      marginTop: rem(10),
      marginBottom: rem(10),
    },
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },

  registerBtn: {
    backgroundColor: theme.fn.rgba(theme.colors.cyan[6], 0.5),

    "&:hover": {
      backgroundColor: theme.fn.rgba(theme.colors.cyan[6], 0.7),
    },
  },
}));

interface PublicHeaderProps {
  links: LinkData[];
}

const PublicHeader: React.FC<PublicHeaderProps> = ({ links }) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx, theme } = useStyles();

  const isSM = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const items = links.map((link) => (
    <NavLink key={link.href} to={link.href}>
      {({ isActive }) => {
        return (
          <Box
            onClick={close}
            className={cx(classes.link, { [classes.linkActive]: isActive })}
          >
            {link.label}
          </Box>
        );
      }}
    </NavLink>
  ));

  items.push(
    <Divider color="orange" orientation={isSM ? "horizontal" : "vertical"} />
  );
  items.push(
    <Link className={cx(classes.link, classes.registerBtn)} to="register">
      Registrarse
    </Link>
  );

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Title order={1}>VeciApp</Title>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export { type PublicHeaderProps };
export default PublicHeader;
