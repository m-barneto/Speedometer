import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { EventDataProvider } from "./contexts/DataContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <EventDataProvider>
            <App />
        </EventDataProvider>
    </StrictMode>
);
