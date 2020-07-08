import React from 'react';
import { AuthProvider, ApplicationProvider } from './config/context';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './config/routes';
import Container from 'react-bootstrap/Container';

export default () => (
  <AuthProvider>
    <ApplicationProvider>
      <BrowserRouter>
        <Container>
          <Routes />
        </Container>
      </BrowserRouter>
    </ApplicationProvider>
  </AuthProvider>
)