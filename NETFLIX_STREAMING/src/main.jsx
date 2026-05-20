import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import NetflixClone from "../NetflixClone.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NetflixClone />
  </StrictMode>
);
