import { Elements } from "@stripe/react-stripe-js";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { loadStripe } from "@stripe/stripe-js";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./global.css";

import { AuthProvider } from "@/context/authContext";
import { QueryProvider } from "@/context/queryContext";
import { router } from "@/routes";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <Elements stripe={stripePromise}>
          <RouterProvider router={router} />
          <Toaster />
        </Elements>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
);
