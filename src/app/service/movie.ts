import { Page, Movie, Pagination } from "../model";
import { Client } from "../config";

export class MovieService {
  constructor( private _client = Client ) {}

  getMovies = ( params: Page ) => (
    this._client.get<Pagination<Movie>>('/movies', { params })
  )

  getMovieById = ( movieId: number ) => (
    this._client.get<Movie>(`/movies/${movieId}`)
      .then(response => response.data)
  )

  rentMovie = ( movieId: number ) => (
    this._client.patch(`/movies/${movieId}/rent`)
  )

  save = ( movie: Movie ) => (
    this._client.post('/movies', movie).then(response => response.data)
  )

  update = ( movie: Movie ) => (
    this._client.put(`/movies/${movie.id}`, movie).then(response => response.data)
  )
}