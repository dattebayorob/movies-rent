import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import { AuthRequired, Header, CheckList } from '../../../component';
import Button from 'react-bootstrap/esm/Button';
import { useEdit } from './useEdit';
import { Label } from '../../../model';
import Form from 'react-bootstrap/Form';
import { PeopleSelect } from '../../../component/people-select';

export default () => {

  const { goToMoviesList, onChange, saveOrUpdate, movie, categories, isEditMode, peoples } = useEdit();

  return (
    <Container>
      <Header title={isEditMode ? 'Editar':'Adicionar'}>
        <AuthRequired hasRole='ADMIN'>
          <Button variant='primary' className='ml-2' onClick={goToMoviesList} >Retornar a Lista de Filmes</Button>
        </AuthRequired>
      </Header>
      <Container>
        <Form onSubmit={saveOrUpdate}>
          <Form.Group controlId='basicInfo'>
            <Form.Label>Nome</Form.Label>
            <Form.Control 
              type='text' 
              placeholder='Nome do filme'
              value={movie.name}
              onChange={({ target }) => onChange({ name: 'name', value: target.value })}
               />
            <Form.Label>Url da Capa</Form.Label>
            <Form.Control 
              type='text' 
              placeholder='Url da Capa' 
              value={movie.pictureUrl}
              onChange={({ target }) => onChange({ name: 'pictureUrl', value: target.value })} />
          </Form.Group>
          <Form.Group controlId='cast'>
            <Form.Label>
              Diretor
            </Form.Label>
            <PeopleSelect 
              items={peoples} 
              value={movie.director} 
              onChange={value => onChange({ name: 'director', value })} />
            <Form.Label>
              Roteirista
            </Form.Label>
            <PeopleSelect 
              items={peoples} 
              value={movie.screenwriter} 
              onChange={value => onChange({ name: 'screenwriter', value })} />
          </Form.Group>
          <Form.Group controlId='categories'>
            <Form.Label>Categorias</Form.Label>
            <CheckList<Label>
              items={categories} 
              selectedItems={movie.categories}
              itemKey='id'
              itemLabel='name'
              name='categories'
              onChange={(selectedCategories) => onChange({ name: 'categories', value: selectedCategories })} />
          </Form.Group>
          <Form.Group controlId='rent'>
            <Form.Label>
              Quantidade de copias { movie.quantity }
            </Form.Label>
            <Form.Control 
              type="range" 
              value={movie.quantity}
              min={1}
              max={20}
              onChange={({ target }) => onChange({ name: 'quantity', value: target.value })}
              />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type='submit'>
              { isEditMode ? 'Atualizar filme' : 'Adicionar filme' }
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </Container>
  );
}