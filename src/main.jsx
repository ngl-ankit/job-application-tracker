import React from "react";
import { createRoot } from "react-dom/client";
import "./components/styles/index.css";
import App from "./App";
import { AuthProvider } from "./components/Auth/AuthContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
