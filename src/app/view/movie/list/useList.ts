import { MovieService } from "../../../service"
import { useEffect, useState, useCallback } from "react";
import { Movie } from "../../../model";
import { useHistory } from "react-router-dom";
import { useLoading, useApp, useAuth } from "../../../component";

const movieService = new MovieService();

export const useList = () => {

  const [ movies, setMovies ] = useState<Movie[]>([]);
  const [ filters, setFilters ] = useState({ page: 0, size: 20, totalElements: 0, totalPages: 0 });
  const { push } = useHistory();
  const { loading } = useLoading();
  const { setLoginModal } = useApp();
  const { authenticated } = useAuth();

  const fetchMovies = useCallback( async () => {
    try {
      const { data } = await loading(movieService.getMovies());
      setMovies( data.content );
      setFilters( filters => ({ ...filters, totalElements: data.totalElements, totalPages: data.totalPages  }));
    }catch(ex) {
      setMovies([]);
    }
  }, [ loading, setMovies ])

  useEffect(() => {

    fetchMovies();

    return () => {
      setMovies([]);
      setFilters( filters => ({ ...filters, totalElements: 0, totalPages: 0  }));
    }
  }, [ setFilters, setMovies, fetchMovies, authenticated ])

  const goToMovieInsertion = (_event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    push('/movies/add');
  }

  const rentMovie = async ({ id }: Movie) => {
    if (!authenticated) {
      setLoginModal(true);
      return;
    }

    loading(rentMovieAsync( id! ));
  }

  const rentMovieAsync = (movieId: number) => (
    movieService.rentMovie(movieId).then( () => {
      setMovies( movies => movies.map( movie => {
        if ( movie.id === movieId ) {
          movie.rented = true;
          movie.availableForRent = false;
        }
        return movie;
      }))
    })
    .catch(ex => console.log(ex))
  )

  return {
    movies, 
    filters,
    goToMovieInsertion,
    rentMovie,
  }
}