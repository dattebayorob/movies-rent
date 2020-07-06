import React, { createContext, PropsWithChildren } from 'react';

type AuthValue = {
  authenticated: boolean,
  user?: {
    id: number, username: string
  }
}

const defaultValue:AuthValue = {
  authenticated: false
}

export const AuthContext = createContext( defaultValue )

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const value = { ...defaultValue };
  
  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  )
}