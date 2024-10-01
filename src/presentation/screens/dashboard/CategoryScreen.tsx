import {useCallback, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, Text, View} from 'react-native';
import {RouteProp, useFocusEffect, useRoute} from '@react-navigation/native';
import tw from 'twrnc';
import {AxiosError} from 'axios';

import {DashboardLayout} from '../../layouts/DashboardLayout';
import {RecipeCard} from '../../components/RecipeCard';
import {Footer} from '../../components/Footer';
import {useRecipeStore} from '../../store/dashboard/RecipeStore';
import {useThemeStore} from '../../store/theme/ThemeStore';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';
import {CardRecipe} from '../../../infrastructure/interfaces';

export const CategoryScreen = () => {
  const {id} = useRoute<RouteProp<DashboardStackParams, 'Category'>>().params;
  const {isDark} = useThemeStore();
  const {myFavorites, getRecipesByCategory} = useRecipeStore();

  const [data, setData] = useState<CardRecipe[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);

  useFocusEffect(
    useCallback(() => {
      setData([]);
      fetchRecipeByCategory(id, limit, offset);
    }, [id, offset]),
  );

  const fetchRecipeByCategory = async (
    id: string,
    limit: number,
    offset: number,
  ) => {
    setIsLoading(true);
    try {
      const resp = await getRecipesByCategory(id, limit, offset);

      const formatRecipe = resp.recipes.map(recipe => ({
        ...recipe,
        id: recipe.id,
        image: recipe.image,
        title: recipe.title,
        User: {
          firstName: recipe.User.firstName,
        },
        isFavorite: myFavorites?.some(fav => fav.id === recipe.id) ?? true,
      }));

      setCategoryName(resp.recipes.at(0)?.Category.name ?? 'No Category Name');

      setData(prevData => {
        const uniqueData = formatRecipe.filter(
          item => !prevData.some(existingItem => existingItem.id === item.id),
        );
        return [...prevData, ...uniqueData];
      });

      const currentPage = Math.floor(offset / limit) + 1;
      if (currentPage === resp.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // Alert.alert('Error', error?.response?.data.message[0], [{text: 'Ok'}]);
        return;
      }

      console.log(error);
      Alert.alert('Error', 'No se pudo obtener la receta', [{text: 'Ok'}]);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMoreData = () => {
    if (!isLoading && hasMore) {
      setOffset(prevOffset => prevOffset + limit);
    }
  };

  const renderFooter = () => {
    return (
      isLoading && (
        <View style={{padding: 10}}>
          <ActivityIndicator
            size="large"
            color={isDark ? '#F0F9FF' : '#082F49'}
          />
        </View>
      )
    );
  };

  return (
    <DashboardLayout>
      {isLoading ? (
        <View style={tw`flex-1 justify-center`}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <View style={tw`mt-2 flex-1 justify-between`}>
          <View>
            <Text style={tw`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
              {categoryName}
            </Text>

            {data.length === 0 ? (
              <View style={tw`mx-auto my-10`}>
                <Text
                  style={tw`p-2 uppercase border border-red-500 text-red-500 rounded-md`}>
                  No se encontraron recetas
                </Text>
              </View>
            ) : (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                extraData={data} // Forzar el render cuando cambia `data`
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <RecipeCard key={item.id} {...item} />}
                onEndReached={handleLoadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
              />
            )}
          </View>

          <Footer />
        </View>
      )}
    </DashboardLayout>
  );
};
