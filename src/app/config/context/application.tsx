import React, { createContext, PropsWithChildren, useState, useCallback } from 'react';

export const ApplicationContext = createContext({
  isLoginModalDisplayed: false,
  isLoading: false,
  setLoginModal: ( _show: boolean ) => {},
  setLoading: ( isLoading: boolean ) => {}
})

export const ApplicationProvider = ({ children }: PropsWithChildren<{}>) => {
  const [ state, setState ] = useState({ isLoginModalDisplayed: false, isLoading: false });

  const setLoginModal = useCallback((show: boolean) => {
    setState(state => ({ ...state, isLoginModalDisplayed: show }));
  },[setState]);

  const setLoading = useCallback((isLoading:boolean) => {
    setState(state => ({ ...state, isLoading }));
  },[setState]);

  return (
    <ApplicationContext.Provider value={ { ...state, setLoginModal, setLoading } }>
      { children }
    </ApplicationContext.Provider>
  )
}