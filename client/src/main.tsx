import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "./components/ui/provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster.tsx";
import AppRouter from "./pages/AppRouter.tsx";
import LoginContext from "@/context/loginContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <LoginContext>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </LoginContext>
        <Toaster />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
