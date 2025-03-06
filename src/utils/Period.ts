import { EventData } from "../data/EventData";

export const getPastHour = (events: EventData[]) => {
    const periodicEvents: EventData[] = [];
    events.forEach((e) => {
        // / 60
        const timeDiff = (new Date().getTime() - e.startDate!.getTime()) / 1000 / 60;
        if (timeDiff <= 60 && timeDiff > 0) {
            periodicEvents.push(e);
        }
    });

    return periodicEvents;
}
