import { Client } from "../config";
import { Label } from "../model";

export class PeopleService {
  constructor( private _client = Client ) {}

  getPeoplesByName = ( name: string ) => (
    this._client.get<Label[]>('/peoples', { params: { name }})
      .then(response => response.data)
  )
}