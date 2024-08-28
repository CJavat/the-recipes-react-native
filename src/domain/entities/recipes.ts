import {User} from './user';

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image: string;
  User: User;
}
