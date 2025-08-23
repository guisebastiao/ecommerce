import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export const CommonRoutes = () => {
  return (
    <>
      <Header />
      <main className="max-w-6xl w-full min-h-screen mt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
