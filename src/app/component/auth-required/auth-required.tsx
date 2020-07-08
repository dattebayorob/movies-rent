import React from 'react';
import { useAuth } from '../hooks';
import { RenderIf } from '../render-if';

type Props = {
  hasRole?: string
}

export const AuthRequired: React.FC<Props> = ({ children, hasRole }) => {
  const { authenticated, user } = useAuth();

  if ( !hasRole ) return <RenderIf isTrue={authenticated}>{ children }</RenderIf>

  return <RenderIf isTrue={user?.role === hasRole} >{ children }</RenderIf>
}