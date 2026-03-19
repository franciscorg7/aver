import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { PaginationProvider } from "./context/Pagination.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // consider fresh data for 5 minutes
      retry: 1, // retry after one query error
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <PaginationProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PaginationProvider>
    </QueryClientProvider>
  </StrictMode>,
);
