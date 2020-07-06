import { MovieService } from "../../../service"
import { useEffect, useState } from "react";
import { Movie } from "../../../model";

const movieService = new MovieService();

export const useList = () => {

  const [ movies, setMovies ] = useState<Movie[]>([]);
  const [ filters, setFilters ] = useState({ page: 0, size: 20, totalElements: 0, totalPages: 0 });

  useEffect(() => {

    const fetchMovies = async () => {
      try {
        const { data } = await movieService.getMovies();
        setMovies( data.content );
        setFilters( filters => ({ ...filters, totalElements: data.totalElements, totalPages: data.totalPages  }));
      }catch(ex) {
        setMovies([]);
      }
    };

    fetchMovies();

    return () => {
      setMovies([]);
      setFilters( filters => ({ ...filters, totalElements: 0, totalPages: 0  }));
    }
  }, [ setFilters, setMovies ])

  return {
    movies, 
    filters,
  }
}