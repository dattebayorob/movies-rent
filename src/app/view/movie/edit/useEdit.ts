import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Movie, Label } from "../../../model";
import { MovieService, CategoryService, PeopleService } from "../../../service";
import { useLoading } from "../../../component";

const movieService = new MovieService();
const categoryService = new CategoryService();
const peopleService = new PeopleService();

const updateState = <T>(newState: Partial<T>) => (state: T) => (
  { ...state, ...newState }
)

export const useEdit = () => {

  const [ movie, setMovie ] = useState<Movie>({
    name: '',
    quantity: 0,
    availableForRent: false,
    rented: false,
    categories: [],
    castings: [],
    pictureUrl: '',
    director: { id: null, name: ''},
    screenwriter: { id: null, name: ''},
  });
  const [ categories, setCategories ] = useState<Label[]>([]);
  const [ peoples, setPeoples ] = useState<Label[]>([]);
  const { loading } = useLoading();

  const { movieId } = useParams();
  const { push } = useHistory();

  
  
  const fetchEntities = useCallback(
    () => {
      const fetchCategories = () => (
        categoryService.getCategories().then(setCategories).catch(() => setCategories([]))
      );
    
      const fetchPeoples = () => (
        peopleService.getPeoplesByName('').then(setPeoples).catch(() => setPeoples([]))
      );
    
      const fetchMovieById = () => {
        if ( !movieId ) return Promise.resolve();
        return movieService.getMovieById(Number(movieId)).then(setMovie);
      }
      return Promise.all([ fetchCategories(), fetchPeoples(), fetchMovieById()]);
    }, [setCategories, setPeoples, setMovie, movieId ])

  useEffect(() => {
    loading(fetchEntities());
  }, [ fetchEntities, loading ])

  const goToMoviesList = (_event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    push('/movies');
  }

  const patchMovie = (movie: Partial<Movie>) => {
    setMovie(updateState(movie));
  }

  const isEditMode = useMemo(() => !!movieId, [movieId]);

  const onChange = ({ name, value }: { name: string, value: any}) => {
    patchMovie({ [name]: value });
  }

  const saveOrUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ( movie.id ) {
      await movieService.update( movie );
    } else {
      await movieService.save( movie );
    }
    goToMoviesList();
  }

  return {
    goToMoviesList,
    isEditMode,
    movie, 
    categories,
    peoples,
    onChange,
    saveOrUpdate
    
  }
}