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
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import tw from 'twrnc';
import {AxiosError} from 'axios';

import {DashboardLayout} from '../../layouts/DashboardLayout';

import {useRecipeStore} from '../../store/dashboard/RecipeStore';
import {useThemeStore} from '../../store/theme/ThemeStore';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';
import {Recipe} from '../../../infrastructure/interfaces';
import Icon from 'react-native-vector-icons/Ionicons';
import {API_URL} from '../../../config/api/recipesApi';
import {StackNavigationProp} from '@react-navigation/stack';
import {formattedDate} from '../../helpers';

export const RecipeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {id, isFavorite} =
    useRoute<RouteProp<DashboardStackParams, 'Recipe'>>().params;

  const {isDark} = useThemeStore();
  const {getRecipe, addFavorite, removeFavorite} = useRecipeStore();

  const [recipe, setRecipe] = useState<Recipe>();
  const [imageRecipe, setImageRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const backendUrl = API_URL.replace('/api', '');
    setIsLoading(true);
    try {
      const resp = await getRecipe(id);

      if (resp.image.startsWith('http')) {
        setImageRecipe(resp.image);
      } else {
        setImageRecipe(`${backendUrl}/${resp.image}`);
      }

      setIsFavoriteRecipe(isFavorite);
      setRecipe(resp);
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Error', error?.response?.data.message[0], [{text: 'Ok'}]);
        return;
      }
      Alert.alert('Error', 'No se pudo obtener la receta', [{text: 'Ok'}]);
      return;
    } finally {
      setIsLoading(false);
    }
  };

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

  return !isLoading ? (
    <DashboardLayout>
      <View style={tw`gap-2 text-sky-950 dark:text-sky-50`}>
        <View style={tw`flex flex-col justify-center items-center my-5`}>
          <View style={tw`relative`}>
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

            {imageRecipe ? (
              <Image
                src={imageRecipe}
                alt={recipe?.title}
                style={tw`w-52 h-52 mb-5 rounded-lg border-4 ${
                  isDark ? 'border-sky-900' : 'border-sky-200'
                }  `}
              />
            ) : (
              <ActivityIndicator
                style={tw`w-52 h-52 border`}
                color={isDark ? '#F0F9FF' : '#082F49'}
              />
            )}
          </View>

          <View style={tw`w-full text-start`}>
            <Pressable
              onPress={() =>
                navigation.navigate('Category', {id: recipe!.Category.id})
              }>
              <Text style={tw`text-sky-500 text-md`}>
                {recipe?.Category.name}
              </Text>
            </Pressable>
            <Text>
              Creado el{' '}
              {recipe?.createdAt ? (
                formattedDate(recipe!.createdAt)
              ) : (
                <ActivityIndicator />
              )}
            </Text>

            <View style={tw`flex-row gap-1`}>
              <Text>Autor:</Text>
              <Pressable
                onPress={() =>
                  navigation.navigate('RecipesByUser', {id: recipe!.User.id})
                }>
                <Text style={tw`text-sky-500`}>
                  {recipe?.User.firstName} {recipe?.User.lastName}
                </Text>
              </Pressable>
            </View>

            {/* 
              //TODO: Falta agregar el botón de EDITAR RECETA
              //TODO: Falta agregar el botón de ELIMINAR RECETA
            */}
          </View>

          <View>
            {/* 
              //TODO: Falta agregar el título, descripción, ingredientes y pasos
            */}
          </View>
        </View>
      </View>
    </DashboardLayout>
  ) : (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size={50} color={isDark ? '#F0F9FF' : '#082F49'} />
    </View>
  );
};
