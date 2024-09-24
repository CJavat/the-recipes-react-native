import {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Pressable, Text, View} from 'react-native';
import tw from 'twrnc';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useThemeStore} from '../store/theme/ThemeStore';

import {DashboardStackParams} from '../navigator/DashboardNavigator';
import {API_URL} from '../../config/api/recipesApi';
import {CardRecipe} from '../../infrastructure/interfaces';
import {FavoriteButton} from './FavoriteButton';

export const RecipeCard = (recipe: CardRecipe) => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();

  const [imageRecipe, setImageRecipe] = useState('');

  useEffect(() => {
    const backendUrl = API_URL.replace('/api', '');

    if (recipe.image.startsWith('http')) {
      setImageRecipe(recipe.image);
    } else {
      setImageRecipe(`${backendUrl}/${recipe.image}`);
    }
  }, []);

  return (
    <View style={tw`relative w-full my-5`}>
      <Pressable
        style={tw`flex flex-row gap-4`}
        onPress={() =>
          navigation.navigate('Recipe', {
            id: recipe.id,
            isFavorite: recipe.isFavorite,
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

      {recipe && (
        <FavoriteButton isFavorite={recipe.isFavorite} recipe={recipe} />
      )}
    </View>
  );
};
