import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import tw from 'twrnc';

import {DashboardLayout} from '../../layouts/DashboardLayout';
import {RecipeCard} from '../../components/RecipeCard';
import {AddRecipeButton} from '../../components/AddRecipeButton';
import {Footer} from '../../components/Footer';

import {useRecipeStore} from '../../store/dashboard/RecipeStore';
import {useThemeStore} from '../../store/theme/ThemeStore';

import {CardRecipe} from '../../../infrastructure/interfaces';

export const HomeScreen = () => {
  const {isDark} = useThemeStore();
  const {getRecipes, getFavorites} = useRecipeStore();

  const [data, setData] = useState<CardRecipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);

  useFocusEffect(
    useCallback(() => {
      fetchData(limit, offset);
    }, [offset]),
  );

  const fetchData = async (limit: number, offset: number) => {
    if (!hasMore && offset !== 0) return;
    setLoading(true);

    try {
      const favoritesResponse = await getFavorites();
      const newRecipes = await getRecipes(limit, offset);

      const formatRecipe = newRecipes.recipes.map(recipe => ({
        ...recipe,
        id: recipe.id,
        image: recipe.image,
        title: recipe.title,
        User: {
          firstName: recipe.User.firstName,
        },
        isFavorite:
          favoritesResponse?.some(fav => fav.recipeId === recipe.id) ?? true,
      }));

      setData(prevData => {
        const uniqueData = formatRecipe.filter(
          item => !prevData.some(existingItem => existingItem.id === item.id),
        );
        return [...prevData, ...uniqueData];
      });

      const currentPage = Math.floor(offset / limit) + 1;
      if (currentPage === newRecipes.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMoreData = () => {
    if (!loading && hasMore) {
      setOffset(prevOffset => prevOffset + limit);
    }
  };

  const renderFooter = () => {
    return (
      loading && (
        <View style={{padding: 10}}>
          <ActivityIndicator
            size="large"
            color={isDark ? '#F0F9FF' : '#082F49'}
          />
        </View>
      )
    );
  };

  const onRefresh = async () => {
    setisRefreshing(true);
    setOffset(0);
    setData([]);

    try {
      await fetchData(limit, 0);
    } catch (error) {
      console.log('Error al refrescar la data', error);
    } finally {
      setisRefreshing(false);
    }
  };

  return (
    <DashboardLayout>
      {loading ? (
        <View style={tw`flex-1 justify-center`}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <>
          <View style={tw`mt-2 flex-1 justify-between`}>
            <AddRecipeButton />

            <FlatList
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              showsVerticalScrollIndicator={false}
              data={data}
              extraData={data} // Forzar el render cuando cambia `data`
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => <RecipeCard key={item.id} {...item} />}
              onEndReached={handleLoadMoreData}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
            />
          </View>

          <Footer />
        </>
      )}
    </DashboardLayout>
  );
};
