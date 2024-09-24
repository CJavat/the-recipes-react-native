import {useEffect, useState} from 'react';
import {Alert, Animated, Pressable} from 'react-native';
import {AxiosError} from 'axios';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {useRecipeStore} from '../store/dashboard/RecipeStore';

import {CardRecipe, Recipe} from '../../infrastructure/interfaces';

interface Props {
  recipe: Recipe | CardRecipe;
  isFavorite: boolean;
}

export const FavoriteButton = ({recipe, isFavorite}: Props) => {
  const {addFavorite, removeFavorite} = useRecipeStore();

  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    console.log(isFavorite);
    setIsFavoriteRecipe(isFavorite);
  }, []);

  const toggleSubmit = () => {
    if (!recipe) return;

    setIsFavoriteRecipe(prevStatus => !prevStatus);

    !isFavoriteRecipe
      ? handleAddFavorite(recipe.id)
      : handleRemoveFavorite(recipe.id);
  };

  const handleAddFavorite = async (id: string) => {
    if (!id) return;

    try {
      await addFavorite(id);
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Error', error?.response?.data.message[0], [{text: 'Ok'}]);
        return;
      }

      Alert.alert('Error', 'No se pudo agregar a tu lista de favoritos', [
        {text: 'Ok'},
      ]);

      return;
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    if (!id) return;

    try {
      await removeFavorite(id);
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Error', error?.response?.data.message[0], [{text: 'Ok'}]);
        return;
      }
      Alert.alert('Error', 'No se pudo eliminar de tu lista de favoritos', [
        {text: 'Ok'},
      ]);

      return;
    }
  };

  //? Animación del corazón
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8, // Tamaño pequeño
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Tamaño original
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      style={tw`absolute top-0 right-0 z-10`}
      onPress={toggleSubmit}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View style={[{transform: [{scale: scaleValue}]}]}>
        <Icon
          name={isFavoriteRecipe ? 'heart' : 'heart-outline'}
          size={50}
          style={tw`text-red-500`}
        />
      </Animated.View>
    </Pressable>
  );
};

//TODO: Ya se agregó el RecipeScreen y RecipeCard, falta hacer que se sincronicen porque cuando se agrega o elmina y cambio de pantalla no se actualiza. Agregarlo en el store y cad que se llame la acción, volver a llamar el getfavorites y después agregarlos a la variable global y ahí empezar a hacer todo
