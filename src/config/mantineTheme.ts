import { type MantineThemeOverride } from "@mantine/core";

const mantineTheme: MantineThemeOverride = {
  colorScheme: "dark",
  primaryColor: "orange",
  primaryShade: 6,
  globalStyles: (_theme) => ({
    "#root": {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    },
  }),
};

export default mantineTheme;
