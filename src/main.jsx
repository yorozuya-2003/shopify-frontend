import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ShopifyLogin from "./ShopifyLogin";
import ShopifyCallback from "./ShopifyCallback";
import Dashboard from "./Dashboard";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <ShopifyLogin /> },
  { path: "/shopify-callback", element: <ShopifyCallback /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
