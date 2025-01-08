import { EventData } from "../data/EventData";

export const getPastHour = (events: EventData[]) => {
    const periodicEvents: EventData[] = [];
    const date = new Date();
    events.forEach((e) => {
        // / 60
        if ((date.getTime() - e.startTimeDate.getTime()) / 1000 / 60 <= 1) {
            periodicEvents.push(e);
        }
    });

    return periodicEvents;
}