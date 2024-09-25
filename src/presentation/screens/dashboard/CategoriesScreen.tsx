import {ActivityIndicator, Alert, Text, View, Pressable} from 'react-native';
import {DashboardLayout} from '../../layouts/DashboardLayout';
import tw from 'twrnc';
import {useThemeStore} from '../../store/theme/ThemeStore';
import {useRecipeStore} from '../../store/dashboard/RecipeStore';
import {useEffect, useState} from 'react';
import {CategoriesResponse} from '../../../infrastructure/interfaces';
import {AxiosError} from 'axios';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardStackParams} from '../../navigator/DashboardNavigator';

export const CategoriesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();

  const {isDark} = useThemeStore();
  const {getCategories} = useRecipeStore();

  const [categories, setCategories] = useState<CategoriesResponse[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isPressedButton, setIsPressedButton] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const resp = await getCategories();
      setCategories(resp);
    } catch (error) {
      console.log(error);
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

  return !isLoading ? (
    <DashboardLayout>
      <Text style={tw`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
        Categorias
      </Text>

      <View
        style={tw`text-xs gap-3 flex-row flex-wrap justify-between items-center`}>
        {categories?.map(category => (
          <Pressable
            key={category.id}
            style={tw`${
              isPressedButton === category.id ? 'bg-sky-300' : 'bg-sky-200'
            } px-5 py-2 rounded-full w-[48%]`}
            onPressIn={() => setIsPressedButton(category.id)}
            onPressOut={() => setIsPressedButton(null)}
            onPress={() => navigation.navigate('Category', {id: category.id})}>
            <Text style={tw`text-center text-black`}>{category.name}</Text>
          </Pressable>
        ))}
      </View>
    </DashboardLayout>
  ) : (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size={50} color={isDark ? '#F0F9FF' : '#082F49'} />
    </View>
  );
};
