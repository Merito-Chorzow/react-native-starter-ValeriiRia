import React, { createContext, useState } from 'react';

export const EntriesContext = createContext();

export const EntriesProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  const addEntry = (entry) => {
    entry.id = Math.random().toString();
    setEntries([...entries, entry]);
  };

  return (
    <EntriesContext.Provider value={{ entries, addEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};