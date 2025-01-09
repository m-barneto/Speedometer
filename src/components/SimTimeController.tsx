import { Calendar } from "primereact/calendar";
import React, { useContext, useEffect } from "react";
import { SimTimeContext } from "../contexts/SimTimeContext";

import dummyDataJson from "../data/food_truck_slow.json";
import { EventData } from "../data/EventData";
import { EventDataContext } from "../contexts/DataContext";

const dummyData: EventData[] = dummyDataJson as unknown as EventData[];

export default function SimTimeController() {
    const { simTime, setSimTime } = useContext(SimTimeContext)!;
    const { eventData, setEventData } = useContext(EventDataContext)!;

    useEffect(() => {
        // Update data from our dummy data to only have the events before the current time
        if (!simTime) return;
        const events: EventData[] = [];
        for (const i in dummyData) {
            const dum = dummyData[i];
            const event = new EventData(
                dum.event_id,
                dum["start_time"],
                dum.duration
            );

            if (event.startDate > simTime) {
                continue;
            }

            events.push(event);
        }
        setEventData(events);
    }, [simTime]);

    return (
        <Calendar
            value={simTime}
            onChange={(e) => setSimTime(e.value!)}
            timeOnly
        />
    );
}
