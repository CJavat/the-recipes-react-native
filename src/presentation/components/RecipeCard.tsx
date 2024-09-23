import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';

import {useThemeStore} from '../store/theme/ThemeStore';

import {CardRecipe} from '../../infrastructure/interfaces';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardStackParams} from '../navigator/DashboardNavigator';
import {useEffect, useState} from 'react';
import {API_URL} from '../../config/api/recipesApi';
import {useRecipeStore} from '../store/dashboard/RecipeStore';

export const RecipeCard = (recipe: CardRecipe) => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();
  // const {addFavorite, removeFavorite} = useRecipeStore(); //TODO: Agregar el add y remove favorite

  const [imageRecipe, setImageRecipe] = useState('');

  useEffect(() => {
    const backendUrl = API_URL.replace('/api', '');

    if (recipe.image.startsWith('http')) {
      setImageRecipe(recipe.image);
    } else {
      setImageRecipe(`${backendUrl}/${recipe.image}`);
    }
  }, []);

  const toggleSubmit = () => {
    if (!recipe) return;

    let isFavorite = recipe.isFavorite;
    isFavorite = !isFavorite;

    isFavorite ? addFavorite(recipe.id) : removeFavorite(recipe.id);
  };

  const addFavorite = async (id: string) => {
    //TODO: TERMINAR ESTA FUNNCIÓN
    console.log('adding favorite');
  };

  const removeFavorite = async (id: string) => {
    //TODO: TERMINAR ESTA FUNNCIÓN
    console.log('removing favorite');
  };

  return (
    <View style={tw`relative w-full my-5`}>
      {/* 
        //TODO: Agregarle un param al navegar a la pantalla de recipe
      */}
      <Pressable
        style={tw`flex flex-row gap-4`}
        onPress={() => navigation.navigate('Recipe')}>
        {imageRecipe ? (
          <Image
            style={tw`w-20 h-20 border rounded-md object-cover`}
            src={imageRecipe}
            alt={recipe.title}
          />
        ) : (
          <ActivityIndicator style={tw`w-20 h-20`} />
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

      <Pressable style={tw`absolute top-0 right-0`} onPress={toggleSubmit}>
        <Icon
          name={recipe.isFavorite ? 'heart' : 'heart-outline'}
          size={40}
          style={tw`text-red-500`}
        />
      </Pressable>
    </View>
  );
};
