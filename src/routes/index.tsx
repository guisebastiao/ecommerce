import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "@/routes/privateRoutes";
import { PublicRoutes } from "@/routes/publicRoutes";
import { CommonRoutes } from "@/routes/commonRoutes";
import { Home } from "@/pages/Home";

export const router = createBrowserRouter([
  {
    element: <CommonRoutes />,
    children: [
      {
        element: <PublicRoutes />,
        children: [],
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
        path: "*",
        // element: <NotFound />,
      },
    ],
  },
]);
