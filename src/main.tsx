import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./global.css";

import { AuthProvider } from "./context/authContext";
import { QueryProvider } from "./context/queryContext";
import { router } from "@/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>
);
