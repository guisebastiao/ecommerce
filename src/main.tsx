import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./global.css";

import { AuthProvider } from "@/context/authContext";
import { QueryProvider } from "@/context/queryContext";
import { router } from "@/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryProvider>
        <RouterProvider router={router} />
        <Toaster />
      </QueryProvider>
    </AuthProvider>
  </StrictMode>
);
