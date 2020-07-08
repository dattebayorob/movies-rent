import React from 'react';
import { AuthProvider, ApplicationProvider } from './config/context';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './config/routes';
import Container from 'react-bootstrap/Container';
import { Login } from './view';
import { Loading } from './component/loading';

export default () => (
  <AuthProvider>
    <ApplicationProvider>
      <BrowserRouter>
        <Container>
          <Login />
          <Loading />
          <Routes />
        </Container>
      </BrowserRouter>
    </ApplicationProvider>
  </AuthProvider>
)