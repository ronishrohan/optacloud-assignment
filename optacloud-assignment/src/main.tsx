import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/home.page.tsx";
import { LocationProvider } from "./store/location.store.tsx";
import { LocationSelectorProvider } from "./store/locationSelector.store.tsx";
import Root from "./Root.tsx";
import { AuthProvider } from "./store/auth.store.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <LocationProvider>
        <LocationSelectorProvider>
          <Root />
        </LocationSelectorProvider>
      </LocationProvider>
    </AuthProvider>
  </StrictMode>
);
