import {create} from 'zustand';

import {
  addFavorite,
  createRecipe,
  deleteRecipe,
  getAllCategories,
  getAllRecipes,
  getFavorites,
  getMyRecipes,
  getRecipesByCategory,
  getRecipesById,
  getRecipesByUser,
  removeFavorite,
  searchRecipes,
  updateRecipe,
} from '../../../actions/recipes/recipes.action';

import {
  CardRecipe,
  CategoriesResponse,
  FavoritesResponse,
  Recipe,
  RecipesResponse,
} from '../../../infrastructure/interfaces';

export interface RecipeState {
  categories?: CategoriesResponse[];
  myFavorites?: CardRecipe[];

  //? Favorites
  getFavorites: () => Promise<FavoritesResponse[]>;
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;

  //? Recipes
  getRecipes: (limit: number, offset: number) => Promise<RecipesResponse>;
  getRecipe: (id: string) => Promise<Recipe>;
  getRecipesByCategory: (
    id: string,
    limit: number,
    offset: number,
  ) => Promise<RecipesResponse>;
  getRecipesByUser: (
    id: string,
    limit: number,
    offset: number,
  ) => Promise<RecipesResponse>;
  getMyRecipes: (limit: number, offset: number) => Promise<RecipesResponse>;
  searchRecipes: (title: string) => Promise<Recipe[]>;
  createRecipe: (formData: FormData) => Promise<Recipe>;
  updateRecipe: (recipeId: string, formData: FormData) => Promise<Recipe>;
  deleteRecipe: (recipeId: string) => Promise<{message: string}>;

  //? Categories
  getCategories: () => Promise<CategoriesResponse[]>;
}

export const useRecipeStore = create<RecipeState>()((set, get) => ({
  categories: undefined,
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
      const resp = await getRecipesById(id);
      if (!resp) throw ['No se encontró la receta'];

      return resp;
    } catch (error) {
      throw error;
    }
  },

  getRecipesByCategory: async (id, limit, offset) => {
    try {
      const resp = await getRecipesByCategory(id, limit, offset);

      return resp;
    } catch (error) {
      throw error;
    }
  },

  getRecipesByUser: async (id, limit, offset) => {
    try {
      const resp = await getRecipesByUser(id, limit, offset);

      return resp;
    } catch (error) {
      throw error;
    }
  },

  getMyRecipes: async (limit, offset) => {
    try {
      const resp = await getMyRecipes(limit, offset);

      return resp;
    } catch (error) {
      throw error;
    }
  },

  searchRecipes: async title => {
    try {
      const resp = await searchRecipes(title);

      return resp;
    } catch (error) {
      throw error;
    }
  },

  createRecipe: async formData => {
    try {
      const resp = await createRecipe(formData);

      return resp;
    } catch (error) {
      throw error;
    }
  },

  updateRecipe: async (recipeId, formData) => {
    try {
      const resp = await updateRecipe(recipeId, formData);

      return resp;
    } catch (error) {
      throw error;
    }
  },

  deleteRecipe: async recipeId => {
    try {
      const resp = await deleteRecipe(recipeId);
      return resp;
    } catch (error) {
      throw error;
    }
  },

  //? Categories
  getCategories: async () => {
    try {
      const resp = await getAllCategories();
      if (!resp) throw ['No hay categorias por mostrar'];

      set({categories: resp});

      return resp;
    } catch (error) {
      throw error;
    }
  },
}));
