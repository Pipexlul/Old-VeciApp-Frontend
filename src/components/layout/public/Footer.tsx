import {
  createStyles,
  Container,
  Group,
  ActionIcon,
  Footer,
  rem,
  Title,
} from "@mantine/core";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

const FOOTER_HEIGHT = rem(120);

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },

  github: {
    color: theme.white,
  },

  linkedin: {
    color: theme.colors.cyan[6],
  },
}));

const PublicFooter: React.FC = () => {
  const { classes } = useStyles();

  return (
    <Footer height={FOOTER_HEIGHT} className={classes.footer}>
      <Container className={classes.inner}>
        <Title order={3}>Felipe Guajardo&copy; 2023</Title>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon<"a">
            component="a"
            className={classes.linkedin}
            size="lg"
            href="https://www.linkedin.com/in/felipe-guajardo-gomez/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandLinkedin size="2rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon<"a">
            component="a"
            className={classes.github}
            size="lg"
            href="https://github.com/pipexlul"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconBrandGithub size="2rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </Footer>
  );
};

export default PublicFooter;
