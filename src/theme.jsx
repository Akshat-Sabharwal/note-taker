import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  shadows: {
    dark: "0px 2px 5px 4px hsl(0, 0%, 8%)",
  },
};

export default extendTheme(theme);
