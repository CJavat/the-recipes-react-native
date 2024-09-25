import {recipesApi} from '../../config/api/recipesApi';
import {
  CategoriesResponse,
  FavoritesResponse,
  Recipe,
  RecipesResponse,
} from '../../infrastructure/interfaces';

//? Favorites
export const getFavorites = async (): Promise<FavoritesResponse[]> => {
  try {
    const {data} = await recipesApi.get<FavoritesResponse[]>('/favorites');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addFavorite = async (recipeId: string): Promise<void> => {
  try {
    await recipesApi.get(`/favorites/${recipeId}`);
  } catch (error) {
    throw error;
  }
};

export const removeFavorite = async (recipeId: string): Promise<void> => {
  try {
    await recipesApi.delete(`/favorites/${recipeId}`);
  } catch (error) {
    throw error;
  }
};

//? Recipes
export const getAllRecipes = async (
  limit: number,
  offset: number | null,
): Promise<RecipesResponse> => {
  try {
    if (offset! <= 0) offset = null;

    const {data} = await recipesApi.get('/recipes', {
      params: {limit, offset},
    });
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRecipeById = async (recipeId: string): Promise<Recipe> => {
  try {
    const {data} = await recipesApi.get(`/recipes/${recipeId}`);

    return data;
  } catch (error) {
    throw error;
  }
};

//? Categories

export const getAllCategories = async (): Promise<CategoriesResponse[]> => {
  try {
    const {data} = await recipesApi.get('categories');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
