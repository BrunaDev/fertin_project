import React, { createContext, useState } from 'react';

export const LockContext = createContext();

// TODO: fazer conexão com o hardware para saber o real estado da porta
export const LockProvider = ({ children }) => {
    const [isLocked, setIsLocked] = useState(false);

    const toggleLockState = () => {
        setIsLocked(!isLocked);
    };

    return (
        <LockContext.Provider value={{ isLocked, toggleLockState }}>
            {children}
        </LockContext.Provider>
    );
};