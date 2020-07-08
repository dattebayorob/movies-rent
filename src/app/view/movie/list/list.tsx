import React from 'react';
import { useList } from "./useList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { MovieCard } from '../../../component';

export default () => {

  const { movies } = useList();

  return (
    <Container>
      <Row className='display-1'>
        Filmes
      </Row> 
      <Row>
        { movies.map( movie => (
            <MovieCard movie={movie} />
        ))}
      </Row>
    </Container>
  );
}