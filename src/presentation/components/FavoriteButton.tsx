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
  const {myFavorites, getFavorites, addFavorite, removeFavorite} =
    useRecipeStore();

  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    setIsFavoriteRecipe(isFavorite);
  }, []);

  // useEffect(() => {
  //   console.log(JSON.stringify(myFavorites, null, 4));
  // }, [myFavorites]);

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
      await getFavorites();
    } catch (error) {
      console.log(error);
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
      await getFavorites();
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
