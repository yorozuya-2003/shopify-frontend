import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ShopifyLogin from "./ShopifyLogin";
import ShopifyCallback from "./ShopifyCallback";
import Dashboard from "./Dashboard";
import "./index.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<ShopifyLogin />}>
      <Route path="/shopify-callback" element={<ShopifyCallback />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
