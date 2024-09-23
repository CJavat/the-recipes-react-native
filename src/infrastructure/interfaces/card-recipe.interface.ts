export interface CardRecipe {
  id: string;
  image: string;
  title: string;
  User: {
    firstName: string;
  };
  isFavorite: boolean;
}
