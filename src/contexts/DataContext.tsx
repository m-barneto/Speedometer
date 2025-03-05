import React, { createContext, useEffect, useMemo, useState } from "react";
import { EventData } from "../data/EventData";

// Remove the dummy data import since you're fetching from an API
// import dummyDataJson from "../data/dummy_data.json";
// const dummyData: EventData[] = dummyDataJson.events as unknown as EventData[];

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
    const [eventData, setEventData] = useState<EventData[] | undefined>(undefined);

    const contextValue = useMemo(() => {
        return {
            eventData,
            setEventData,
        };
    }, [eventData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8000/data");
                const data = await response.json();

                console.log(data["data"]);

                const events = data["data"].map((i: any) => {
                    // Assuming EventData constructor takes these arguments
                    return new EventData(
                        "", // Adjust this to your correct parameter if needed
                        i["body"]["startTime"],
                        i["body"]["durationInSeconds"]
                    );
                });

                setEventData(events);
                console.log(events); // This will log the events that are now set in the state
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the function immediately to fetch data

        // Optionally, you can keep the interval if you want to fetch periodically
        // For example, fetch every 2.5 seconds:
        const id = setInterval(fetchData, 2500);

        // Cleanup the interval on unmount
        return () => clearInterval(id);
    }, []);

    return (
        <EventDataContext.Provider value={contextValue}>
            {children}
        </EventDataContext.Provider>
    );
};
