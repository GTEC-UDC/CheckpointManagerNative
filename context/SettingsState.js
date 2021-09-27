import React, { useState, useContext } from 'react';

const SettingsContext = React.createContext();

export const SettingsProvider = ({ value, children }) => {
  return (
    <SettingsContext.Provider value={{endpoint:useState(value.endpoint), uuid:useState(value.uuid)}}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings= () => useContext(SettingsContext);