import { createContext, type ReactNode, useContext, useState } from "react";
import type { UserSimpleDTO } from "@/types/userTypes";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserSimpleDTO | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, _setAuthenticated] = useState<boolean>(true);

  const user = null;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useContextAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useContextAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};
