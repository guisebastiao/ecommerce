import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Outlet } from "react-router-dom";

export const CommonRoutes = () => {
  return (
    <>
      <Header />
      <main className="max-w-7xl w-full min-h-[calc(100dvh-80px-190px)] mt-20">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
