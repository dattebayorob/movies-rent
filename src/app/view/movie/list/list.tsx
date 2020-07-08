import React from 'react';
import { useList } from "./useList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { MovieCard, AuthRequired, Header } from '../../../component';

export default () => {

  const { movies, filters, goToMovieInsertion, rentMovie, previewPage, nextPage } = useList();

  return (
    <Container>
      <Header title='Filmes'>
        <AuthRequired hasRole='ADMIN'>
          <Button variant='primary' className='ml-2' onClick={goToMovieInsertion} >Adicionar Filme</Button>
        </AuthRequired>
      </Header>
      <Row className='justify-content-start'>
        { movies.map( movie => (
            <MovieCard movie={movie} key={movie.id} onRentMovie={rentMovie}/>
        ))}
      </Row>
      <Row className='justify-content-between mb-5'>
        <Button disabled={filters.first} onClick={previewPage}>Página Anterior</Button>
        <Button disabled={filters.last} onClick={nextPage} >Próxima Página</Button>
      </Row>
    </Container>
  );
}