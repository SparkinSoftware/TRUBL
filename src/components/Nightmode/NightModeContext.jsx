import React, { createContext, useContext, useState } from 'react';

const NightModeContext = createContext();

const NightModeProvider = ({ children }) => {
  const [isNightMode, setNightMode] = useState(false);

  const toggleNightMode = () => {
    setNightMode((prevNightMode) => !prevNightMode);
  };

  return (
    <NightModeContext.Provider value={{ isNightMode, toggleNightMode }}>
      {children}
    </NightModeContext.Provider>
  );
};

const useNightMode = () => {
  const context = useContext(NightModeContext);
  if (!context) {
    throw new Error('useNightMode must be used within a NightModeProvider');
  }
  return context;
};

export { NightModeProvider, useNightMode };
