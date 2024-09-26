import {recipesApi} from '../../config/api/recipesApi';
import {
  CategoriesResponse,
  CreateDeleteFavoriteResponse,
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
    await recipesApi.get<CreateDeleteFavoriteResponse>(
      `/favorites/${recipeId}`,
    );
  } catch (error) {
    throw error;
  }
};

export const removeFavorite = async (recipeId: string): Promise<void> => {
  try {
    await recipesApi.delete<CreateDeleteFavoriteResponse>(
      `/favorites/${recipeId}`,
    );
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

export const getRecipesById = async (recipeId: string): Promise<Recipe> => {
  try {
    const {data} = await recipesApi.get<Recipe>(`/recipes/${recipeId}`);

    return data;
  } catch (error) {
    throw error;
  }
};

export const getRecipesByCategory = async (
  id: string,
  limit: number,
  offset: number | null,
): Promise<RecipesResponse> => {
  try {
    if (offset! <= 0) offset = null;

    const {data} = await recipesApi.get<RecipesResponse>(
      `/recipes/by-category/${id}`,
      {
        params: {limit, offset},
      },
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getRecipesByUser = async (
  id: string,
  limit: number,
  offset: number | null,
): Promise<RecipesResponse> => {
  try {
    if (offset! <= 0) offset = null;

    const {data} = await recipesApi.get<RecipesResponse>(
      `/recipes/by-user/${id}`,
      {params: {limit, offset}},
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMyRecipes = async (
  limit: number,
  offset: number | null,
): Promise<RecipesResponse> => {
  try {
    if (offset! <= 0) offset = null;

    const {data} = await recipesApi.get<RecipesResponse>(
      '/recipes/own-recipes',
      {params: {limit, offset}},
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const searchRecipes = async (title: string): Promise<Recipe[]> => {
  try {
    const {data} = await recipesApi.get<Recipe[]>('/recipes/search', {
      params: {title},
    });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createRecipe = async (formData: FormData): Promise<Recipe> => {
  try {
    const {data} = await recipesApi.post<Recipe>('/recipes', formData);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateRecipe = async (
  recipeId: string,
  formData: FormData,
): Promise<Recipe> => {
  try {
    const {data} = await recipesApi.patch<Recipe>(
      `/recipes/${recipeId}`,
      formData,
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRecipe = async (
  recipeId: string,
): Promise<{message: string}> => {
  try {
    const {data} = await recipesApi.delete(`/recipes/${recipeId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

//? Categories
export const getAllCategories = async (): Promise<CategoriesResponse[]> => {
  try {
    const {data} = await recipesApi.get('/categories');

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
