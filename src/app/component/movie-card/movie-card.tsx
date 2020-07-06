import React from 'react';
import { Movie } from '../../model';

interface Props {
  movie: Movie
}

export const MovieCard = ({ movie }: Props) => {
  return (
    <div>
      <div>
        <img src={movie.pictureUrl} alt={`${movie.name}-picture`} />
      </div>
      <div>
        { movie.name }
      </div>
    </div>
  )
}