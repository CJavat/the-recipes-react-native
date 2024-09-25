import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {DashboardLayout} from '../../layouts/DashboardLayout';
import tw from 'twrnc';
import {useThemeStore} from '../../store/theme/ThemeStore';
import {useState} from 'react';
import {useRecipeStore} from '../../store/dashboard/RecipeStore';
import {RecipeCard} from '../../components/RecipeCard';

export const MyFavoritesScreen = () => {
  const {isDark} = useThemeStore();
  const {myFavorites} = useRecipeStore();

  const [isLoading, setIsLoading] = useState(false);

  return !isLoading ? (
    <DashboardLayout>
      <Text style={tw`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
        Mis Recetas Favoritas
      </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={myFavorites}
        extraData={myFavorites} // Forzar el render cuando cambia `data`
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <RecipeCard key={item.id} {...item} />}
      />
    </DashboardLayout>
  ) : (
    <View style={tw`flex-1 justify-center items-center`}>
      <ActivityIndicator size={50} color={isDark ? '#F0F9FF' : '#082F49'} />
    </View>
  );
};
