import React, { useState, useContext } from 'react';

const HTTPClientContext = React.createContext({});

export const HttpClientProvider = ({ children }) => {
  return (
    <HTTPClientContext.Provider value={useState({})}>
      {children}
    </HTTPClientContext.Provider>
  );
}

export const useHttpClient = () => useContext(HTTPClientContext);
