import { Page, Movie, Pagination } from "../model";
import { Client } from "../config";

export class MovieService {
  constructor( private _client = Client ) {}

  getMovies = ( params: Page = { page: 0, size: 20 }) => (
    this._client.get<Pagination<Movie>>('/movies', { params })
  )

  rentMovie = ( movieId: number ) => (
    this._client.patch(`/movies/${movieId}/rent`)
  )
}