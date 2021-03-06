import { Label } from "./label";

export interface Movie {
  id?: number;
  name: string;
  pictureUrl: string;
  categories: Label[];
  director: Label;
  screenwriter: Label;
  castings: Label[];
  quantity: number;
  availableForRent: boolean;
  rented: boolean;
}