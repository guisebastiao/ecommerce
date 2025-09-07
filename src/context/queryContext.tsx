import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

interface QueryProviderProps {
  children: ReactNode;
}

const SCALE_TIME = 1000 * 60 * 5;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: SCALE_TIME,
    },
  },
});

export const QueryProvider = ({ children }: QueryProviderProps) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
