import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./router";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { NotesDataProvider } from "../src/context/notesContext";
import theme from "./theme";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <NotesDataProvider>
        <Router />
      </NotesDataProvider>
    </ChakraProvider>
  </React.StrictMode>
);
