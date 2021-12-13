import React from 'react';
import { Movie } from '../../model';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { RenderIf } from '..';

interface Props {
  movie: Movie,
  onRentMovie: (movie:Movie) => Promise<void>
  onReturnMovie: (movie: Movie) => Promise<void>
}

export const MovieCard = ({ movie, onRentMovie, onReturnMovie }: Props) => {
  return (
    <Card style={{ width: '14rem' }} className='m-4'>
      <Card.Img variant="top" src={ movie.pictureUrl } style={{ maxHeight: '300px'}}/>
      <Card.Body>
        <Card.Title>{ movie.name }</Card.Title>
        <RenderIf isTrue={!movie.rented}>
          <Button variant="primary" 
            disabled={!movie.availableForRent}
            onClick={() => onRentMovie(movie)} >
              Alugar filme
          </Button>
        </RenderIf>
        <RenderIf isTrue={movie.rented && !movie.availableForRent}>
          <Button variant="danger" 
            onClick={() => onReturnMovie(movie)} >
              Devolver Filme
          </Button>
        </RenderIf>
      </Card.Body>
    </Card>
  )
}