import React from 'react';

export const RenderIf: React.FC<{ isTrue: boolean }> = ({ isTrue, children }) => (
  isTrue ? <>{ children }</> : null
);