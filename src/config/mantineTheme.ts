import { type MantineThemeOverride } from "@mantine/core";

const mantineTheme: MantineThemeOverride = {
  colorScheme: "dark",
  primaryColor: "orange",
  primaryShade: 6,
  globalStyles: (_theme) => ({
    body: {
      minHeight: "100vh",
    },
  }),
};

export default mantineTheme;
