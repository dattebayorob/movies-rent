import React, { useState, ChangeEvent } from 'react';
import { useAuth, useApp, useLoading } from '../../component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export default () => {
  const { login } = useAuth();
  const { loading } = useLoading();
  const { isLoginModalDisplayed, setLoginModal } = useApp();
  const [ username, setUsername ] = useState('');
  const [ error, setError ] = useState<string | undefined>(undefined);

  const onClose = () => {
    setLoginModal(false);
  }
  
  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loading(onLoginAsync());
  }

  const onLoginAsync = async () => {
    try {
      await login( username );
      onClose();
    } catch (ex) {
      setError('Usuário ou senha inválidos');
    }
  }

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setUsername(value);
  }
  
  return (
    <Modal show={isLoginModalDisplayed} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Realizar Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate onSubmit={onLogin} id='form-login'>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="username">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={onChange}
                isInvalid={!!error}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" type='submit' form='form-login'>Login</Button>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  )
}