import { matchPath, Outlet, useLocation } from "react-router-dom";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const PATCHS = ["/login", "/active-login/:code", "/register", "/register-successful", "/active-account/:verificationCode", "/forgot-password", "/recover-password/:code"];

export const CommonRoutes = () => {
  const location = useLocation();

  const shouldActive = PATCHS.some((path) => matchPath({ path, end: true }, location.pathname));

  return (
    <>
      {!shouldActive && <Header />}
      <main className="max-w-7xl w-full min-h-[calc(100dvh-80px)] flex mt-20">
        <Outlet />
      </main>
      {!shouldActive && <Footer />}
    </>
  );
};
