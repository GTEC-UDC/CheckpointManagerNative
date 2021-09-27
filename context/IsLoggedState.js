import React, { useState, useContext } from 'react';

const IsLoggedContext = React.createContext(false);

export const IsLoggedProvider = ({ children }) => {
  return (
    <IsLoggedContext.Provider value={useState(false)}>
      {children}
    </IsLoggedContext.Provider>
  );
}

export const useIsLogged = () => useContext(IsLoggedContext);
