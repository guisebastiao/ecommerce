import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/privateRoutes";
import { PublicRoutes } from "@/routes/publicRoutes";
import { CommonRoutes } from "@/routes/commonRoutes";

import { Product } from "@/pages/Product";
import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/NotFound";
import ActiveLogin from "@/pages/ActiveLogin";
import { Register } from "@/pages/Register";
import RegisterSuccessful from "@/pages/RegisterSuccessful";
import ActiveAccount from "@/pages/ActiveAccount";
import ForgotPassword from "@/pages/ForgotPassword";
import RecoverPassword from "@/pages/RecoverPassword";
import Favorite from "@/pages/Favorite";
import Cart from "@/pages/Cart";

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
          {
            path: "/active-login/:code",
            element: <ActiveLogin />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/register-successful",
            element: <RegisterSuccessful />,
          },
          {
            path: "/active-account/:verificationCode",
            element: <ActiveAccount />,
          },
          {
            path: "/forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "/recover-password/:code",
            element: <RecoverPassword />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: "/favorites",
            element: <Favorite />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
        ],
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
