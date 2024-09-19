import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {DashboardNavigator} from './DashboardNavigator';
import {RecipesScreen} from '../screens/dashboard/RecipesScreen';
import {CategoriesScreen} from '../screens/dashboard/CategoriesScreen';
import {MyFavoritesScreen} from '../screens/dashboard/MyFavoritesScreen';

import {useThemeStore} from '../store/theme/ThemeStore';
import {Image, View} from 'react-native';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const theRecipesLogo = require('../../assets/logos/android-chrome-512x512.png');
  const {isDark} = useThemeStore();

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => (
        <View style={{flex: 1}}>
          {/* Logo en la parte superior */}
          <View
            style={[
              tw`flex items-center py-10`,
              {backgroundColor: isDark ? '#075985' : '#F0F9FF'},
            ]}>
            <Image
              style={tw`mx-auto h-28 w-28 rounded-2xl`}
              source={theRecipesLogo}
              alt="The Recipes Logo"
            />
          </View>
          {/* Renderización automática de las opciones del Drawer */}
          <DrawerItemList {...props} />
        </View>
      )}
      screenOptions={{
        swipeEnabled: true,
        drawerType: 'front',
        drawerActiveBackgroundColor: `${isDark ? '#0EA5E9' : '#0EA5E9'}`,
        drawerInactiveBackgroundColor: `${isDark ? '#0C4A6E' : '#E0F2FE'}`,
        drawerActiveTintColor: `${isDark ? '#F0F9FF' : '#F0F9FF'}`,
        drawerInactiveTintColor: `${isDark ? '#F0F9FF' : '#082F49'}`,
      }}>
      <Drawer.Screen
        name="Home"
        component={DashboardNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Icon name="home-outline" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Icon name="cafe-outline" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Icon name="apps-outline" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="MyFavorites"
        component={MyFavoritesScreen}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Icon name="heart-circle-outline" size={25} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
