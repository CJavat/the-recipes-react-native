import {Image, Pressable, Text, View} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {Search} from './Search';
import {AuthStackParams} from '../navigator/AuthNavigator';
import {useThemeStore} from '../store/theme/ThemeStore';
import {UserMenu} from './UserMenu';

export const Navbar = () => {
  const theRecipesLogo = require('../../assets/logos/android-chrome-512x512.png');
  const navigation = useNavigation<StackNavigationProp<AuthStackParams>>();

  const {isDark} = useThemeStore();

  return (
    <View
      style={tw`px-1 flex-row justify-evenly items-center w-full border-b z-50 gap-5 py-2 ${
        isDark ? 'bg-sky-950 border-b-sky-900' : 'bg-sky-50 border-b-sky-200'
      }`}>
      <View>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          style={tw`relative inline-flex items-center justify-center rounded-md  ${
            isDark ? 'text-white' : 'text-black'
          }`}>
          <Icon name="menu-outline" size={30} />
        </Pressable>
      </View>

      <View>
        <Image
          style={tw`h-8 w-8 rounded-md`}
          source={theRecipesLogo}
          alt="The Recipes Logo"
        />
      </View>

      <View style={tw`flex-1`}>
        <Search />
      </View>

      <UserMenu />
    </View>
  );
};
