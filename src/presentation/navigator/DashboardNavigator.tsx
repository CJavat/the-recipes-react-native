import {createStackNavigator} from '@react-navigation/stack';

import {HomeScreen} from '../screens/dashboard/HomeScreen';
import {CategoriesScreen} from '../screens/dashboard/CategoriesScreen';
import {CategoryScreen} from '../screens/dashboard/CategoryScreen';
import {CreateRecipeScreen} from '../screens/dashboard/CreateRecipeScreen';
import {DeleteAccountScreen} from '../screens/dashboard/DeleteAccountScreen';
import {EditAccountScreen} from '../screens/dashboard/EditAccountScreen';
import {MyAccountScreen} from '../screens/dashboard/MyAccountScreen';
import {MyFavoritesScreen} from '../screens/dashboard/MyFavoritesScreen';
import {MyRecipesScreen} from '../screens/dashboard/MyRecipesScreen';
import {RecipesByUserScreen} from '../screens/dashboard/RecipesByUserScreen';
import {RecipeScreen} from '../screens/dashboard/RecipeScreen';
import {RecipesScreen} from '../screens/dashboard/RecipesScreen';
import {SearchScreen} from '../screens/dashboard/SearchScreen';
import {SettingsScreen} from '../screens/dashboard/SettingsScreen';
import {UpdateImageScreen} from '../screens/dashboard/UpdateImageScreen';
import {UpdatePasswordScreen} from '../screens/dashboard/UpdatePasswordScreen';
import {EditRecipeScreen} from '../screens/dashboard/EditRecipeScreen';

export type DashboardStackParams = {
  Home: undefined;

  Categories: undefined;
  Category: {id: string};

  MyAccount: undefined;
  EditAccount: undefined;
  DeleteAccount: undefined;

  MyFavorites: undefined;
  MyRecipes: undefined;

  Recipes: undefined;
  RecipesByUser: {id: string};
  SearchRecipes: {title: string};
  Recipe: {id: string};
  CreateRecipe: undefined;
  EditRecipe: {id: string};

  Settings: undefined;
  UpdateImage: undefined;
  UpdatePassword: undefined;
};

const Dashboard = createStackNavigator<DashboardStackParams>();

export const DashboardNavigator = () => {
  return (
    <Dashboard.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Dashboard.Screen name="Home" component={HomeScreen} />

      <Dashboard.Screen name="Categories" component={CategoriesScreen} />
      <Dashboard.Screen name="Category" component={CategoryScreen} />

      <Dashboard.Screen name="MyAccount" component={MyAccountScreen} />
      <Dashboard.Screen name="EditAccount" component={EditAccountScreen} />
      <Dashboard.Screen name="DeleteAccount" component={DeleteAccountScreen} />

      <Dashboard.Screen name="MyFavorites" component={MyFavoritesScreen} />
      <Dashboard.Screen name="MyRecipes" component={MyRecipesScreen} />

      <Dashboard.Screen name="Recipes" component={RecipesScreen} />
      <Dashboard.Screen name="RecipesByUser" component={RecipesByUserScreen} />
      <Dashboard.Screen name="SearchRecipes" component={SearchScreen} />
      <Dashboard.Screen name="Recipe" component={RecipeScreen} />
      <Dashboard.Screen name="CreateRecipe" component={CreateRecipeScreen} />
      <Dashboard.Screen name="EditRecipe" component={EditRecipeScreen} />

      <Dashboard.Screen name="Settings" component={SettingsScreen} />
      <Dashboard.Screen name="UpdateImage" component={UpdateImageScreen} />
      <Dashboard.Screen
        name="UpdatePassword"
        component={UpdatePasswordScreen}
      />
    </Dashboard.Navigator>
  );
};
