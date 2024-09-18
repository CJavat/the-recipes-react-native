import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../screens/dashboard/HomeScreen';
import {RecipesScreen} from '../screens/dashboard/RecipesScreen';
import {CategoriesScreen} from '../screens/dashboard/CategoriesScreen';
import {MyFavoritesScreen} from '../screens/dashboard/MyFavoritesScreen';
import {DashboardNavigator} from './DashboardNavigator';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        swipeEnabled: true,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="MyFavorites"
        component={MyFavoritesScreen}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
