export interface FavoritesResponse {
  id: string;
  createdAt: Date;
  recipeId: string;
  userId: string;

  recipe: Recipe;
  user: User;
}

interface Recipe {
  id: string;
  title: string;
  image: string;
}

interface User {
  id: string;
  firstName: string;
}
