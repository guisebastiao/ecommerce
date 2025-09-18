import { Navigate, Outlet } from "react-router-dom";
import { useContextAuth } from "@/context/authContext";
import { Role } from "@/types/clientTypes";

export const AdminRoutes = () => {
  const { isAuthenticated, client } = useContextAuth();

  if (isAuthenticated === null) return null;

  if (!client) {
    return <Navigate to="/" />;
  }

  return isAuthenticated && client.role === Role.ADMIN ? <Outlet /> : <Navigate to="/" />;
};
