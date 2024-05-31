import "../theme/index.css";
import theme from "../theme/theme";
import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { NotesProvider } from "../context/notes";
import { UserProvider } from "../context/user";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <UserProvider>
        <NotesProvider>
          <Router />
        </NotesProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
