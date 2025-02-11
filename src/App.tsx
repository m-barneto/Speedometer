import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./style.css";
import { Splitter, SplitterPanel } from "primereact/splitter";

import { useContext } from "react";
import { EventDataContext } from "./contexts/DataContext";
import EventHistory from "./components/EventHistory";
import Speedometer from "./components/Speedometer";
import DailySummary from "./components/DailySummary";
import Header from "./components/Header";
import { TabPanel, TabView } from "primereact/tabview";

function App() {
    const { eventData } = useContext(EventDataContext)!;

    return (
        <main>
            <Header />
            <TabView>
                <TabPanel header="Summary">
                    <Splitter>
                        <SplitterPanel className="flex flex-row" size={10}>
                            <EventHistory />
                        </SplitterPanel>
                        <SplitterPanel minSize={60} size={75}>
                            <div
                                style={{
                                    width: "100%",
                                }}>
                                {/* <SimTimeController /> */}
                                <Speedometer />
                                <DailySummary />
                            </div>
                        </SplitterPanel>
                    </Splitter>
                </TabPanel>
                <TabPanel header="Data Breakdown (Pro)" disabled></TabPanel>
            </TabView>
        </main>
    );
}

export default App;
