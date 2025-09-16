import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import type { ClientSimpleDTO } from "@/types/clientTypes";
import type { ActiveLoginDTO } from "@/types/authTypes";
import { logout } from "@/hooks/useAuth";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setClient: (client: ClientSimpleDTO | null) => void;
  client: ClientSimpleDTO | null;
  handleLogout: () => boolean;
  logoutIsLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [client, setClient] = useState<ClientSimpleDTO | null>(null);

  const { mutate, isPending: logoutIsLoading } = logout();

  const handleLogout = () => {
    mutate();

    setAuthenticated(false);
    setClient(null);
    localStorage.removeItem("auth");

    return logoutIsLoading;
  };

  useEffect(() => {
    const storage = localStorage.getItem("auth");

    if (!storage) {
      setAuthenticated(false);
      setClient(null);
      return;
    }

    try {
      const auth = JSON.parse(storage) as ActiveLoginDTO;
      setAuthenticated(true);
      setClient(auth.client);
    } catch (error) {
      setAuthenticated(false);
      setClient(null);
    }

    const logout = () => handleLogout();

    window.addEventListener("logout", logout);

    return () => {
      window.removeEventListener("logout", logout);
    };
  }, []);

  return <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, setClient, client, handleLogout, logoutIsLoading }}>{children}</AuthContext.Provider>;
};

export const useContextAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useContextAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
