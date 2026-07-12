import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CasePage } from "../app/CasePage";
import "../app/globals.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CasePage />
  </StrictMode>,
);
