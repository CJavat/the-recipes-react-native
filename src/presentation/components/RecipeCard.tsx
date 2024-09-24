import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import {AxiosError} from 'axios';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useThemeStore} from '../store/theme/ThemeStore';
import {useRecipeStore} from '../store/dashboard/RecipeStore';

import {DashboardStackParams} from '../navigator/DashboardNavigator';
import {API_URL} from '../../config/api/recipesApi';
import {CardRecipe} from '../../infrastructure/interfaces';

export const RecipeCard = (recipe: CardRecipe) => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();
  const {addFavorite, removeFavorite} = useRecipeStore();

  const [imageRecipe, setImageRecipe] = useState('');
  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    setIsFavoriteRecipe(recipe.isFavorite);
    const backendUrl = API_URL.replace('/api', '');

    if (recipe.image.startsWith('http')) {
      setImageRecipe(recipe.image);
    } else {
      setImageRecipe(`${backendUrl}/${recipe.image}`);
    }
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
    <View style={tw`relative w-full my-5`}>
      <Pressable
        style={tw`flex flex-row gap-4`}
        onPress={() =>
          navigation.navigate('Recipe', {
            id: recipe.id,
            isFavorite: isFavoriteRecipe,
          })
        }>
        {imageRecipe ? (
          <Image
            style={tw`w-20 h-20 border rounded-md`}
            src={imageRecipe}
            alt={recipe.title}
          />
        ) : (
          <ActivityIndicator
            style={tw`w-20 h-20`}
            color={isDark ? '#F0F9FF' : '#082F49'}
          />
        )}

        <View style={tw`flex justify-evenly h-20 w-6/12`}>
          <Text style={tw`text-sm ${isDark ? 'text-white' : 'text-black'}`}>
            {recipe.title}
          </Text>

          <Text style={tw`text-xs ${isDark ? 'text-sky-300' : 'text-sky-900'}`}>
            {recipe.User.firstName}
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={tw`absolute top-0 right-0 justify-center items-center`}
        onPress={toggleSubmit}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}>
        <Animated.View style={[{transform: [{scale: scaleValue}]}]}>
          <Icon
            name={isFavoriteRecipe ? 'heart' : 'heart-outline'}
            size={40}
            style={tw`text-red-500`}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};
