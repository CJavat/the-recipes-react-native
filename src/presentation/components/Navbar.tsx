import {Image, Pressable, Text, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {Search} from './Search';
import {AuthStackParams} from '../navigator/AuthNavigator';
import {useThemeStore} from '../store/theme/ThemeStore';
import {UserMenu} from './UserMenu';
import {DashboardStackParams} from '../navigator/DashboardNavigator';

export const Navbar = () => {
  const theRecipesLogo = require('../../assets/logos/android-chrome-512x512.png');
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();

  const {isDark} = useThemeStore();

  return (
    <View
      style={tw`px-1 flex-row justify-evenly items-center w-full border-b z-50 gap-5 py-2 ${
        isDark ? 'bg-sky-950 border-b-sky-900' : 'bg-sky-50 border-b-sky-200'
      }`}>
      <View style={tw`ml-2`}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={tw`relative items-center justify-center rounded-md`}>
          <Icon
            name="menu-outline"
            size={30}
            style={tw`${isDark ? 'text-white' : 'text-black'}`}
          />
        </Pressable>
      </View>

      <View>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Image
            style={tw`h-8 w-8 rounded-md`}
            source={theRecipesLogo}
            alt="The Recipes Logo"
          />
        </Pressable>
      </View>

      <View style={tw`flex-1`}>
        <Search />
      </View>

      <UserMenu />
    </View>
  );
};
