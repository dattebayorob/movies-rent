import { User } from "../model";
import { Client } from "../config";

export class UserService {
  constructor( private _client = Client ) {}

  getUserinfo = (username: string) => (
    this._client.get<User>('/users/me', { headers: { 'x-username': username }})
  )
}