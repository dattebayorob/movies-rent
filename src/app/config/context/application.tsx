import React, { createContext, PropsWithChildren } from 'react';

export const ApplicationContext = createContext({})

export const ApplicationProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = {};
  return (
    <ApplicationContext.Provider value={ value }>
      { children }
    </ApplicationContext.Provider>
  )
}