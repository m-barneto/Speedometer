import React, { createContext, useEffect, useMemo, useState } from "react";

interface SimTimeContextType {
    simTime: Date | undefined;
    setSimTime: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const SimTimeContext = createContext<SimTimeContextType | undefined>(
    undefined
);

export const SimTimeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [simTime, setSimTime] = useState<Date | undefined>(undefined);

    const contextValue = useMemo(() => {
        return {
            simTime,
            setSimTime,
        };
    }, [simTime]);

    useEffect(() => {
        setSimTime(new Date());
    }, []);

    return (
        <SimTimeContext.Provider value={contextValue}>
            {children}
        </SimTimeContext.Provider>
    );
};
