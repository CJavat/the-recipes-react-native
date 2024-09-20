import {useState} from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {useAuthStore} from '../store/auth/AuthStore';
import {useThemeStore} from '../store/theme/ThemeStore';
import {DashboardStackParams} from '../navigator/DashboardNavigator';

export interface ProfileOptions {
  id: string;
  name: string;
  label: string;
  icon: string;
}

const profileRoutes = [
  {
    id: 'MyAccount',
    name: 'MyAccount',
    label: 'Mi Cuenta',
    icon: 'person-circle-outline',
  },
  {
    id: 'MyRecipes',
    name: 'MyRecipes',
    label: 'Mis Recetas',
    icon: 'fast-food-outline',
  },
  {
    id: 'Settings',
    name: 'Settings',
    label: 'Configuraciones',
    icon: 'settings-outline',
  },
];

export const UserMenu = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();

  const route = useRoute();
  const {logout} = useAuthStore();
  const {isDark} = useThemeStore();
  const [isExpandedProfile, setIsExpandedProfile] = useState(false);

  const profileMenuOptionSelected = (profile: ProfileOptions) => {
    setIsExpandedProfile(prevState => !prevState);
    navigation.navigate(profile.name as keyof DashboardStackParams);
  };

  const onLogout = () => {
    logout();
  };

  const handleOutsidePress = () => {
    if (isExpandedProfile) {
      setIsExpandedProfile(false); // Cierra el menú si está abierto
    }
  };

  return (
    <View style={tw`relative flex items-center gap-3 pr-2`}>
      <Pressable
        onPress={() => setIsExpandedProfile(prevState => !prevState)}
        style={tw`h-8 w-8 relative flex rounded-full text-sm`}>
        <Image
          style={tw`h-8 w-8 rounded-full`}
          //? source={theRecipesLogo}
          src="http://res.cloudinary.com/dsq0czzcy/image/upload/v1726097032/the-recipes/users/ohcjte7cgfivlasd7uhd.jpg"
          alt="The Recipes Logo"
        />
      </Pressable>

      {isExpandedProfile && (
        <View
          id="user-menu"
          style={tw`absolute right-0 top-8 z-50 mt-2 w-48 origin-bottom-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none
          ${isDark ? 'bg-sky-950' : 'bg-sky-50'}
        `}>
          {profileRoutes.map(profile => (
            <Pressable
              onPress={() => profileMenuOptionSelected(profile)}
              key={profile.id}
              style={tw`flex-row items-center gap-5 px-4 py-2 text-sm ${
                isDark ? 'hover:bg-sky-900' : 'hover:bg-sky-200'
              }
          ${route.name === profile.name ? 'bg-sky-500 text-white' : ''}
          `}
              id="user-menu-item-0">
              <Icon
                name={profile.icon}
                size={20}
                style={tw`${isDark ? 'text-white' : 'text-black'}`}
              />
              <Text style={tw`${isDark ? 'text-white' : 'text-black'}`}>
                {profile.label}
              </Text>
            </Pressable>
          ))}

          <Pressable style={tw`px-4 py-2 w-full text-left`} onPress={onLogout}>
            <Text style={tw`text-sm font-bold text-red-500`}>
              Cerrar Sesión
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
