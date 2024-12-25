import React, { createContext, useContext } from "react";

const PlaygroundContext = createContext();

export const usePlayground = () => useContext(PlaygroundContext);

export const PlaygroundProvider = ({ children, handleNodeCreation }) => (
  <PlaygroundContext.Provider value={{ handleNodeCreation }}>
    {children}
  </PlaygroundContext.Provider>
);
