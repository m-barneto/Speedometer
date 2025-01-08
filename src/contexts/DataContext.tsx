import React, { createContext, useEffect, useMemo, useState } from "react";
import { EventData } from "../data/EventData";

import dummyDataJson from "../data/dummy_data.json";

const dummyData: EventData[] = dummyDataJson.events as unknown as EventData[];

interface EventDataContextType {
    eventData: EventData[] | undefined;
    setEventData: React.Dispatch<React.SetStateAction<EventData[] | undefined>>;
}

export const EventDataContext = createContext<EventDataContextType | undefined>(
    undefined
);

export const EventDataProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [eventData, setEventData] = useState<EventData[] | undefined>(
        undefined
    );

    const contextValue = useMemo(() => {
        return {
            eventData,
            setEventData,
        };
    }, [eventData]);

    useEffect(() => {
        setEventData([]);
    }, []);

    return (
        <EventDataContext.Provider value={contextValue}>
            {children}
        </EventDataContext.Provider>
    );
};
