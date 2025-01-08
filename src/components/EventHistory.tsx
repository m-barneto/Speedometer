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

            const hours = String(date.getHours() % 12).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const seconds = String(date.getSeconds()).padStart(2, "0");
            let mmmm = "AM";
            if (date.getHours() - 12 > 0) {
                mmmm = "PM";
            }

            const timestamp =
                hours + ":" + minutes + ":" + seconds + " " + mmmm;

            const min = 2 * 60;
            const max = 5 * 60;
            const duration = Math.round(Math.random() * (max - min) + min);
            const event: EventData = {
                event_id: (
                    <i className="pi pi-car" style={{ fontSize: "2rem" }} />
                ),
                startTime: timestamp,
                startTimeDate: date,
                duration: duration,
            };
            setEventData((eventData) => [event, ...eventData!]);
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
            <Column field="event_id" header=""></Column>
            <Column field="startTime" header="Start"></Column>
            <Column field="duration" header="Time (s)"></Column>
        </DataTable>
    );
}
