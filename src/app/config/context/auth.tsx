import React, { createContext, PropsWithChildren, useState, useEffect, useCallback } from 'react';
import { User } from '../../model';
import { UserService } from '../../service';
import { setItemOnStorage, clearStorage, getItemOnStorage } from '../../helpers';

type AuthValue = {
  authenticated: boolean,
  isLoading?: boolean,
  user?: User,
}

type AuthActions = {
  login: (username: string) => Promise<void>,
  logout: () => void
}

const defaultValue:AuthValue & AuthActions = {
  authenticated: false,
  login: async (_username: string) => {},
  logout: () => {}
}

export const AuthContext = createContext( defaultValue );

const userService = new UserService();

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [ state, setState ] = useState<AuthValue>({ authenticated: false });

  const login = useCallback(async (username: string) => {
    setState( state => ({ ...state, isLoading: true }));
    try{
      const { data: user } = await userService.getUserinfo(username);
      setItemOnStorage('user', user);
      setState({ authenticated: true, user, isLoading: false });
    }catch(ex){
      throw ex;
    }
  }, [ setState ]);

  const logout = useCallback(async () => {
    clearStorage();
    setState({ authenticated: false, isLoading: false, user:undefined });
  }, [])

  useEffect(() => {
    const fetchUserinfo = async () => {
      const user = getItemOnStorage('user');
      if ( user ) {
        login( user ).catch(ex => logout());
      }
    }
    fetchUserinfo();

    return () => {
      setState({ authenticated: false });
      clearStorage();
    }
  }, [ login, logout ]);
  
  return (
    <AuthContext.Provider value={ { ...state, login, logout } }>
      { children }
    </AuthContext.Provider>
  )
}