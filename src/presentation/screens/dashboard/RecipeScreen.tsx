import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import tw from 'twrnc';
import {AxiosError} from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';

import {DashboardLayout} from '../../layouts/DashboardLayout';

import {useRecipeStore} from '../../store/dashboard/RecipeStore';
import {useThemeStore} from '../../store/theme/ThemeStore';
import {formattedDate} from '../../helpers';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';
import {API_URL} from '../../../config/api/recipesApi';
import {Recipe} from '../../../infrastructure/interfaces';
import {BackButton} from '../../components/BackButton';
import {useAuthStore} from '../../store/auth/AuthStore';
import {ScrollView} from 'react-native';
import {FavoriteButton} from '../../components/FavoriteButton';

export const RecipeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {id, isFavorite} =
    useRoute<RouteProp<DashboardStackParams, 'Recipe'>>().params;

  const {isDark} = useThemeStore();
  const {user} = useAuthStore();
  const {getRecipe} = useRecipeStore();

  const [recipe, setRecipe] = useState<Recipe>();
  const [imageRecipe, setImageRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteRecipe, setIsFavoriteRecipe] = useState(false);
  const [isMyRecipe, setIsMyRecipe] = useState(false);
  const [isPressedButton, setIsPressedButton] = useState({
    editRecipe: false,
    deleteRecipe: false,
  });

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

      setIsMyRecipe(resp?.User?.id === user?.id);

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

  const deleteMyRecipe = async () => {
    console.log('Deleting my recipe');
  };

  return !isLoading ? (
    <DashboardLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <View style={tw`gap-2`}>
          <View style={tw`flex flex-col justify-center items-center my-5`}>
            <View style={tw`relative`}>
              {recipe && (
                <FavoriteButton isFavorite={isFavoriteRecipe} recipe={recipe} />
              )}

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
                <Text style={tw`text-sky-500 text-3xl`}>
                  {recipe?.Category.name}
                </Text>
              </Pressable>

              <View style={tw`flex-row gap-1`}>
                <Text style={tw`text-lg`}>Autor:</Text>
                <Pressable
                  onPress={() =>
                    navigation.navigate('RecipesByUser', {id: recipe!.User.id})
                  }>
                  <Text style={tw`text-lg text-sky-500`}>
                    {recipe?.User.firstName} {recipe?.User.lastName}
                  </Text>
                </Pressable>
              </View>

              <Text style={tw`text-md`}>
                Creado el{' '}
                {recipe?.createdAt ? (
                  formattedDate(recipe!.createdAt)
                ) : (
                  <ActivityIndicator />
                )}
              </Text>

              {isMyRecipe && (
                <>
                  <Pressable
                    onPressIn={() =>
                      setIsPressedButton(prevState => ({
                        ...prevState,
                        editRecipe: true,
                      }))
                    }
                    onPressOut={() =>
                      setIsPressedButton(prevState => ({
                        ...prevState,
                        editRecipe: false,
                      }))
                    }
                    onPress={() =>
                      navigation.navigate('EditRecipe', {
                        id,
                        isFavorite: isFavoriteRecipe,
                      })
                    }
                    style={tw`${
                      isPressedButton.editRecipe
                        ? 'bg-sky-500'
                        : 'bg-transparent'
                    } mt-5 rounded-md border border-sky-500 px-3 py-1.5 flex-row justify-center items-center gap-5`}>
                    <Icon
                      name="trash-outline"
                      size={20}
                      style={tw`${
                        isPressedButton.editRecipe
                          ? 'text-white'
                          : 'text-sky-500'
                      }`}
                    />

                    <Text
                      style={tw`${
                        isPressedButton.editRecipe
                          ? 'text-white'
                          : 'text-sky-500'
                      } uppercase text-sm font-semibold`}>
                      Editar Receta
                    </Text>
                  </Pressable>

                  <Pressable
                    onPressIn={() =>
                      setIsPressedButton(prevState => ({
                        ...prevState,
                        deleteRecipe: true,
                      }))
                    }
                    onPressOut={() =>
                      setIsPressedButton(prevState => ({
                        ...prevState,
                        deleteRecipe: false,
                      }))
                    }
                    onPress={deleteMyRecipe}
                    style={tw`${
                      isPressedButton.deleteRecipe
                        ? 'bg-red-500'
                        : 'bg-transparent'
                    } mt-5 rounded-md border border-red-600 px-3 py-1.5 flex-row justify-center items-center gap-5`}>
                    <Icon
                      name="create-outline"
                      size={20}
                      style={tw`${
                        isPressedButton.deleteRecipe
                          ? 'text-white'
                          : 'text-red-500'
                      }`}
                    />
                    <Text
                      style={tw`${
                        isPressedButton.deleteRecipe
                          ? 'text-white'
                          : 'text-red-500'
                      } uppercase text-sm font-semibold`}>
                      Eliminar Receta
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>

          <View style={tw`w-full`}>
            <View style={tw`my-5`}>
              <Text
                style={tw`my-2 text-2xl ${
                  isDark ? 'text-sky-50' : 'text-sky-950'
                }`}>
                {recipe?.title}
              </Text>

              <Text style={tw`${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                {recipe?.description}
              </Text>
            </View>

            <View>
              <Text style={tw`text-xl text-sky-400`}>Ingredientes</Text>
              <FlatList
                scrollEnabled={false}
                data={recipe?.ingredients}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={tw`flex flex-row items-center gap-2 px-3`}>
                    <Icon
                      name="radio-button-on-outline"
                      color={isDark ? '#FFF' : '#000'}
                      size={10}
                    />
                    <Text style={tw`text-sky-500`}>{item}</Text>
                  </View>
                )}
              />
            </View>

            <View style={tw`my-3`}>
              <Text style={tw`text-xl text-sky-400`}>Pasos</Text>
              <FlatList
                scrollEnabled={false}
                data={recipe?.steps}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={tw`flex flex-row px-3`}>
                    <Text style={tw`${isDark ? 'text-white' : 'text-black'}`}>
                      {index + 1} -{' '}
                    </Text>
                    <Text style={tw`text-sky-500`}>{item}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </DashboardLayout>
  ) : (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size={50} color={isDark ? '#F0F9FF' : '#082F49'} />
    </View>
  );
};
