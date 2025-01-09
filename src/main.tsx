import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { EventDataProvider } from "./contexts/DataContext.tsx";
import { SimTimeProvider } from "./contexts/SimTimeContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <SimTimeProvider>
            <EventDataProvider>
                <App />
            </EventDataProvider>
        </SimTimeProvider>
    </StrictMode>
);
