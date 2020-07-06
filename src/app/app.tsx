import React from 'react';
import { AuthProvider, ApplicationProvider } from './config/context';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './config/routes';

export default () => (
  <AuthProvider>
    <ApplicationProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ApplicationProvider>
  </AuthProvider>
)