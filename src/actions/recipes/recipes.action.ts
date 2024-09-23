import {recipesApi} from '../../config/api/recipesApi';
import {
  FavoritesResponse,
  RecipesResponse,
} from '../../infrastructure/interfaces';

export const getFavorites = async (): Promise<FavoritesResponse[]> => {
  try {
    const {data} = await recipesApi.get<FavoritesResponse[]>('/favorites');

    //TODO: Crear en el recipesStore una variable llamada currentFavorites para tenerla a la mano
    // const formatRecipes = data.map((fav) => {
    //   return {
    //     id: fav.recipe.id,
    //     image: fav.recipe.image,
    //     title: fav.recipe.title,
    //     User: {
    //       firstName: fav.user.firstName,
    //     },
    //     isFavorite: true,
    //   };
    // })

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addFavorite = async (recipeId: string): Promise<void> => {
  try {
    //TODO: TERMIANR FUNCIÓN
  } catch (error) {
    throw error;
  }
};

export const removeFavorite = async (recipeId: string): Promise<void> => {
  try {
    //TODO: TERMIANR FUNCIÓN
  } catch (error) {
    throw error;
  }
};

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
