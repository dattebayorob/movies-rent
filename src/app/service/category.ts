import { Label } from "../model";
import { Client } from "../config";

export class CategoryService {
  constructor( private _client = Client ) {}

  getCategories = () => (
    this._client.get<Label[]>("/categories")
      .then(response => response.data)
  )
}