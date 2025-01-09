import { EventData } from "../data/EventData";

export const getPastHour = (simTime: Date, events: EventData[]) => {
    const periodicEvents: EventData[] = [];
    events.forEach((e) => {
        // / 60
        const timeDiff = (simTime.getTime() - e.startDate.getTime()) / 1000 / 60 / 60;
        if (timeDiff <= 1 && timeDiff > 0) {
            periodicEvents.push(e);
        }
    });

    return periodicEvents;
}