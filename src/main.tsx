import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// Fontes hospedadas junto com o site (sem depender de terceiros)
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/space-grotesk/index.css";
import "@fontsource/ibm-plex-sans/latin-400.css";
import "@fontsource/ibm-plex-sans/latin-500.css";
import "@fontsource/ibm-plex-sans/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
