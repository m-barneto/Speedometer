import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useContext, useEffect, useState } from "react";
import { EventDataContext } from "../contexts/DataContext";
import { HourlySummary } from "../data/HourlyData";

export default function DailySummary() {
    const [dailySummary, setDailySummary] = useState([] as HourlySummary[]);
    const { eventData } = useContext(EventDataContext)!;

    useEffect(() => {
        const summary: Record<string, HourlySummary> = {};
        // Go through each event
        eventData?.forEach((e) => {
            // get the event's hour
            const hours = String(e.startTimeDate.getHours() % 12);
            let mmmm = "AM";
            if (e.startTimeDate.getHours() - 12 > 0) {
                mmmm = "PM";
            }

            const bin = hours + " " + mmmm;
            if (summary[bin] == undefined) {
                summary[bin] = {
                    time: bin,
                    total_cars: 0,
                    total_duration: 0,
                    avg_duration: 0,
                };
            }

            summary[bin].total_cars += 1;
            summary[bin].total_duration += e.duration;
        });

        for (const bin in summary) {
            if (summary[bin].total_cars > 0) {
                summary[bin].avg_duration = Number(
                    (
                        summary[bin].total_duration /
                        summary[bin].total_cars /
                        60
                    ).toFixed(2)
                );
            } else {
                summary[bin].avg_duration = 0;
            }
        }

        setDailySummary(Object.values(summary));
    }, [eventData]);

    return (
        <DataTable
            scrollable
            scrollHeight="flex"
            size="normal"
            value={dailySummary}
            tableStyle={{ minWidth: "10rem", width: "auto" }}
            style={{ width: "100%" }}>
            <Column field="time" header="Time"></Column>
            <Column field="total_cars" header="Cars"></Column>
            <Column field="avg_duration" header="Avg Time (s)"></Column>
        </DataTable>
    );
}
