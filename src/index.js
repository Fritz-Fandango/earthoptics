import "fontsource-roboto";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Initialize and validate environment configuration
import { initializeEnvironment } from "./config/environment";

try {
  initializeEnvironment();
} catch (error) {
  console.error("Failed to initialize application:", error.message);
  // Don't prevent app from starting in development
  if (process.env.NODE_ENV !== "development") {
    throw error;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example, reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
