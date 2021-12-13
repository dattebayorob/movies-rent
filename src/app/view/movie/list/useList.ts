import { MovieService } from "../../../service"
import { useEffect, useState, useCallback } from "react";
import { Movie, Page } from "../../../model";
import { useHistory } from "react-router-dom";
import { useLoading, useApp, useAuth } from "../../../component";

const movieService = new MovieService();

export const useList = () => {

  const [ movies, setMovies ] = useState<Movie[]>([]);
  const [ filters, setFilters ] = useState({ page: 0, size: 5, totalElements: 0, totalPages: 0, last: false, first: true });
  const { push } = useHistory();
  const { loading } = useLoading();
  const { setLoginModal } = useApp();
  const { authenticated } = useAuth();

  const fetchMovies = useCallback( async (page: Page = { page: 0, size: 5}) => {
    try {
      const { data } = await loading(movieService.getMovies(page));
      setMovies( data.content );
      setFilters( filters => ({ ...filters, totalElements: data.totalElements, totalPages: data.totalPages, last: data.last, first: data.first  }));
    }catch(ex) {
      setMovies([]);
    }
  }, [ loading, setMovies ]);

  const previewPage = () => {
    fetchMovies({ page: filters.page-1, size: filters.size });
  }

  const nextPage = () => {
    fetchMovies({ page: filters.page+1, size: filters.size });
  }

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

  const giveBackMovie = ({ id }: Movie) => {
    return loading(giveBackMovieAsync(id!));
  }

  const giveBackMovieAsync = (movieId: number) => {
    return movieService.giveBackMovie(movieId).then( () => {
      setMovies( movies => movies.map( movie => {
        if ( movie.id === movieId ) {
          movie.rented = false;
          movie.availableForRent = true;
        }
        return movie;
      }))
    })
  }

  return {
    movies, 
    filters,
    goToMovieInsertion,
    rentMovie,
    returnMovie: giveBackMovie,
    previewPage,
    nextPage,
  }
}