import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router/dom";
import { router } from "./routes/index.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { store } from "./redux/store/store.ts";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
      <Toaster position="top-center" richColors />
    </Provider>
  </StrictMode>
);
