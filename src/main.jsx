import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import AppRouter from "./App.jsx";
import { worker } from "./mocks/browser.js";

if (import.meta.env.DEV) {
  console.log(123456789);
  worker.start();
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>
);
