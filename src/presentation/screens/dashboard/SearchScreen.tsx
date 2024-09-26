import {useCallback, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import {AxiosError} from 'axios';

import {DashboardLayout} from '../../layouts/DashboardLayout';

import {useRecipeStore} from '../../store/dashboard/RecipeStore';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';
import {CardRecipe, Recipe} from '../../../infrastructure/interfaces';
import tw from 'twrnc';
import {useThemeStore} from '../../store/theme/ThemeStore';
import {RecipeCard} from '../../components/RecipeCard';
import {Footer} from '../../components/Footer';

export const SearchScreen = () => {
  const {title} =
    useRoute<RouteProp<DashboardStackParams, 'SearchRecipes'>>().params;

  const {isDark} = useThemeStore();
  const {myFavorites, searchRecipes} = useRecipeStore();

  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState<CardRecipe[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchSearchRecipes(title);
    }, [title]),
  );

  const fetchSearchRecipes = async (title: string) => {
    setIsLoading(true);
    try {
      const recipes = await searchRecipes(title);

      const formatRecipe = recipes.map(recipe => ({
        ...recipe,
        id: recipe.id,
        image: recipe.image,
        title: recipe.title,
        User: {
          firstName: recipe.User.firstName,
        },
        isFavorite: myFavorites?.some(fav => fav.id === recipe.id) ?? false,
      }));

      setRecipes(formatRecipe);
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Error', error?.response?.data.message[0], [{text: 'Ok'}]);
        return;
      }

      console.log(error);
      Alert.alert('Error', 'No se pudo obtener la receta', [{text: 'Ok'}]);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {isLoading ? (
        <View style={tw`flex-1 justify-center`}>
          <ActivityIndicator size={50} />
        </View>
      ) : recipes.length === 0 ? (
        <View style={tw`flex-1 items-center justify-center`}>
          <Text
            style={tw`p-2 uppercase border border-red-500 text-red-500 rounded-md`}>
            No se encontraron recetas
          </Text>
        </View>
      ) : (
        <View style={tw`my-2`}>
          <Text style={tw`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
            Buscaste: {title}
          </Text>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={recipes}
            extraData={recipes} // Forzar el render cuando cambia `data`
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <RecipeCard key={item.id} {...item} />}
            ListFooterComponent={<Footer />}
          />
        </View>
      )}
    </DashboardLayout>
  );
};
