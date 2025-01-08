import React, { useContext, useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import { EventDataContext } from "../contexts/DataContext";
import { getPastHour } from "../utils/Period";

export default function Speedometer() {
    const { eventData } = useContext(EventDataContext)!;

    const [carsPerHour, setCarsPerHour] = useState(0);
    const [avgEventDuration, setAvgEventDuration] = useState(0);

    useEffect(() => {
        if (!eventData) return;
        // Go through every event (in past hour?) and calculate avg time and cars per hour
        const lastHour = getPastHour(eventData!);

        // Calculate avg event duration in the past hour
        let sum = 0;
        lastHour.forEach((e) => {
            sum += e.duration;
        });
        setAvgEventDuration(Number((sum / lastHour.length / 60).toFixed(2)));

        // Calculate how many cars we had in the past hour
        setCarsPerHour(lastHour.length);
    }, [eventData]);

    return (
        <div>
            <ReactSpeedometer
                currentValueText="${value} Cars/Hour"
                segments={3}
                value={carsPerHour}
                maxValue={90}
            />
            <ReactSpeedometer
                currentValueText="${value} Avg Event Duration"
                segments={4}
                value={avgEventDuration}
                maxValue={10}
            />
        </div>
    );
}
