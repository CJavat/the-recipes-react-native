import {create} from 'zustand';

import {
  addFavorite,
  getAllRecipes,
  getFavorites,
  getRecipeById,
  removeFavorite,
} from '../../../actions/recipes/recipes.action';

import {
  CardRecipe,
  FavoritesResponse,
  Recipe,
  RecipesResponse,
} from '../../../infrastructure/interfaces';

export interface RecipeState {
  myFavorites?: CardRecipe[];

  //? Favorites
  getFavorites: () => Promise<FavoritesResponse[]>;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;

  //? Recipes
  getRecipes: (limit: number, offset: number) => Promise<RecipesResponse>;
  getRecipe: (id: string) => Promise<Recipe>;

  //? Categories
}

export const useRecipeStore = create<RecipeState>()((set, get) => ({
  myFavorites: undefined,

  //? Favorites
  getFavorites: async () => {
    try {
      const favorites = await getFavorites();

      if (favorites.length > 0) {
        set({
          myFavorites: favorites.map(favorite => {
            return {
              id: favorite.recipeId,
              image: favorite.recipe.image,
              title: favorite.recipe.title,
              User: {
                firstName: favorite.user.firstName,
              },
              isFavorite: true,
            };
          }),
        });
      } else {
        set({myFavorites: undefined});
      }

      return favorites;
    } catch (error) {
      set({myFavorites: undefined});
      throw error;
    }
  },

  addFavorite: async id => {
    try {
      await addFavorite(id);
    } catch (error) {
      set({myFavorites: undefined});
      throw error;
    }
  },

  removeFavorite: async id => {
    try {
      await removeFavorite(id);
    } catch (error) {
      set({myFavorites: undefined});
      throw error;
    }
  },

  //? Recipes
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

  getRecipe: async id => {
    try {
      const resp = await getRecipeById(id);
      if (!resp) throw ['No se encontró la receta'];

      return resp;
    } catch (error) {
      throw error;
    }
  },

  //? Categories
}));
