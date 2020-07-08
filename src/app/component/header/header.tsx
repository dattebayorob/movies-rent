import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { AuthRequired } from '../auth-required';
import { useAuth, useApp } from '../hooks';
import { RenderIf } from '../render-if';

type Props = {
  title: string,
}

export const Header: React.FC<Props> = ({ children, title }) => {

  const { logout, authenticated } = useAuth();
  const { setLoginModal } = useApp();

  const onLogout = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    logout();
  }

  return (
    <Row className='display-1 justify-content-between'>
        <Col>{ title }</Col>
        <Col className='text-right'>
          { children }
          <AuthRequired>
            <Button onClick={onLogout} variant='warning' className='ml-2'>Encerrar Sessão</Button>
          </AuthRequired>
          <RenderIf isTrue={!authenticated}>
            <Button onClick={ () => setLoginModal(true) } variant='primary'>Realizar Login</Button>
          </RenderIf>
      </Col>
    </Row>
  )
}