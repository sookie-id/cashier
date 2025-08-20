import React from "react";
import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import { ThemeProvider } from "styled-components";
import { globalTheme } from "./theme";

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <ThemeProvider theme={globalTheme}>
      <HydratedRouter />
    </ThemeProvider>
  </React.StrictMode>
);
