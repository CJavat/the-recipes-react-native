import {create} from 'zustand';
import {
  FavoritesResponse,
  RecipesResponse,
} from '../../../infrastructure/interfaces';
import {
  getAllRecipes,
  getFavorites,
} from '../../../actions/recipes/recipes.action';

export interface RecipeState {
  getFavorites: () => Promise<FavoritesResponse[]>;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;

  getRecipes: (limit: number, offset: number) => Promise<RecipesResponse>;
}

export const useRecipeStore = create<RecipeState>()((set, get) => ({
  getFavorites: async () => {
    try {
      const favorites = await getFavorites();

      return favorites;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },

  addFavorite: async id => {
    //TODO: TERMIANR FUNCIÓN
    return;
  },

  removeFavorite: async id => {
    //TODO: TERMIANR FUNCIÓN
    return;
  },

  getRecipes: async (limit, offset) => {
    try {
      const recipes = await getAllRecipes(limit, offset);
      if (!recipes) throw ['No hay recetas'];

      return recipes;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  },
}));
