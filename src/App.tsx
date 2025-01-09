import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./style.css";
import ReactSpeedometer from "react-d3-speedometer";
import { Splitter, SplitterPanel } from "primereact/splitter";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { useContext } from "react";
import { EventDataContext } from "./contexts/DataContext";
import EventHistory from "./components/EventHistory";
import Speedometer from "./components/Speedometer";
import { Divider } from "primereact/divider";
import DailySummary from "./components/DailySummary";

function App() {
    const { eventData } = useContext(EventDataContext)!;

    return (
        <main>
            <Splitter>
                <SplitterPanel className="flex flex-row" size={15}>
                    <EventHistory />
                </SplitterPanel>
                <SplitterPanel minSize={60}>
                    <div>
                        <Speedometer />
                        <DailySummary />
                    </div>
                </SplitterPanel>
            </Splitter>
        </main>
    );
}

export default App;
