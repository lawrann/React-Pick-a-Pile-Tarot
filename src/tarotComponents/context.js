import React from "react";

const context = React.createContext({});
const ContextProvider = context.Provider;
const ContextConsumer = context.Consumer;

export { ContextProvider, ContextConsumer };
