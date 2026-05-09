import { focusManager, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { AppState } from "react-native";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      placeholderData: (prev?:any) => prev,
      retry: 2,
      refetchOnWindowFocus: false,
      retryDelay: (attempt) => attempt * 1000,
      refetchIntervalInBackground:false,
    },
  },
});

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status) => {
      focusManager.setFocused(status === 'active');
    });

    return () => subscription.remove(); // cleanup
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
