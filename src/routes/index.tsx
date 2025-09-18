import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/privateRoutes";
import { PublicRoutes } from "@/routes/publicRoutes";
import { CommonRoutes } from "@/routes/commonRoutes";
import { AdminRoutes } from "./adminRoutes";

import { RegisterSuccessful } from "@/pages/RegisterSuccessful";
import { RecoverPassword } from "@/pages/RecoverPassword";
import { ForgotPassword } from "@/pages/ForgotPassword";
import { CreateAddress } from "@/pages/CreateAddress";
import { ActiveAccount } from "@/pages/ActiveAccount";
import { ActiveLogin } from "@/pages/ActiveLogin";
import { NotFound } from "@/pages/NotFound";
import { Register } from "@/pages/Register";
import { Favorite } from "@/pages/Favorite";
import { Product } from "@/pages/Product";
import { Payment } from "@/pages/Payment";
import { Setting } from "@/pages/Setting";
import { Login } from "@/pages/Login";
import { Order } from "@/pages/Order";
import { Admin } from "@/pages/Admin";
import { Home } from "@/pages/Home";
import { Cart } from "@/pages/Cart";

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
          {
            path: "/payment",
            element: <Payment />,
          },
          {
            path: "/create-address",
            element: <CreateAddress />,
          },
          {
            path: "/orders",
            element: <Order />,
          },
          {
            path: "/settings",
            element: <Setting />,
          },
        ],
      },
      {
        element: <AdminRoutes />,
        children: [
          {
            path: "/admin",
            element: <Admin />,
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
