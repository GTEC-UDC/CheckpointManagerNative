import React, { useState, useContext } from 'react';

const UserEmailContext = React.createContext();

export const UserEmailProvider = ({ children }) => {
  return (
    <UserEmailContext.Provider value={useState("")}>
      {children}
    </UserEmailContext.Provider>
  );
}

export const useUserEmail = () => useContext(UserEmailContext);
