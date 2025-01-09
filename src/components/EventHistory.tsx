import React, { useContext, useEffect } from "react";
import { EventDataContext } from "../contexts/DataContext";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { EventData } from "../data/EventData";

export default function EventHistory() {
    const { eventData, setEventData } = useContext(EventDataContext)!;

    useEffect(() => {
        const id = setInterval(() => {
            // Create event
            const date = new Date();
            const min = 5;
            const max = 15;
            const duration = Number(
                (Math.random() * (max - min) + min).toFixed(1)
            );
            const event: EventData = new EventData(
                "1",
                date.toISOString(),
                duration
            );
            //setEventData((eventData) => [event, ...eventData!]);
        }, 2500);

        return () => clearInterval(id);
    }, []);

    return (
        <DataTable
            scrollable
            scrollHeight="flex"
            size="normal"
            value={eventData}
            tableStyle={{ minWidth: "10rem", width: "auto" }}
            style={{ width: "100%" }}>
            <Column field="event_icon" header="Type"></Column>
            <Column field="displayedStartTime" header="Event Start"></Column>
            <Column field="duration" header="Duration (m)"></Column>
        </DataTable>
    );
}
