import React from 'react';
import { Movie } from '../../model';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

interface Props {
  movie: Movie
}

export const MovieCard = ({ movie }: Props) => {
  return (
    <Card style={{ width: '14rem' }} className='m-4'>
      <Card.Img variant="top" src={ movie.pictureUrl } style={{ maxHeight: '300px'}}/>
      <Card.Body>
        <Card.Title>{ movie.name }</Card.Title>
        <Card.Text>

        </Card.Text>
        <Button variant="primary" disabled={!movie.availableForRent}>Alugar filme</Button>
      </Card.Body>
    </Card>
  )
}