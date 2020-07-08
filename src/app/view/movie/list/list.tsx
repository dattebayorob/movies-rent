import React from 'react';
import { useList } from "./useList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { MovieCard, AuthRequired } from '../../../component';
import { Header } from '../../../component/header';

export default () => {

  const { movies, goToMovieInsertion } = useList();

  return (
    <Container>
      <Header title='Filmes'>
        <AuthRequired hasRole='ADMIN'>
          <Button variant='primary' className='ml-2' onClick={goToMovieInsertion} >Adicionar Filme</Button>
        </AuthRequired>
      </Header>
      <Row className='justify-content-start'>
        { movies.map( movie => (
            <MovieCard movie={movie} key={movie.id} />
        ))}
      </Row>
    </Container>
  );
}