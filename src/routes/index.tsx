import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/privateRoutes";
import { PublicRoutes } from "@/routes/publicRoutes";
import { CommonRoutes } from "@/routes/commonRoutes";

import { Product } from "@/pages/Product";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    element: <CommonRoutes />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [],
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:productId",
        element: <Product />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
