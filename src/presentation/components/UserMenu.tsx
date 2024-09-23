import {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {useAuthStore} from '../store/auth/AuthStore';
import {useThemeStore} from '../store/theme/ThemeStore';
import {DashboardStackParams} from '../navigator/DashboardNavigator';
import {API_URL} from '../../config/api/recipesApi';

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
  const {user, logout} = useAuthStore();
  const {isDark} = useThemeStore();

  const [isExpandedProfile, setIsExpandedProfile] = useState(false);
  const [userImageProfile, setUserImageProfile] = useState('');

  useEffect(() => {
    const backendUrl = API_URL.replace('/api', '');

    if (user?.avatar?.startsWith('http')) {
      setUserImageProfile(user.avatar);
    } else {
      setUserImageProfile(`${backendUrl}/no-user-image.jpg`);
    }
  }, []);

  const profileMenuOptionSelected = (profile: ProfileOptions) => {
    setIsExpandedProfile(prevState => !prevState);
    navigation.navigate(profile.name as keyof DashboardStackParams);
  };

  const onLogout = () => {
    logout();
  };

  return (
    <View style={tw`relative flex items-center gap-3 pr-2`}>
      <Pressable
        onPress={() => setIsExpandedProfile(prevState => !prevState)}
        style={tw`h-10 w-10 relative flex rounded-full text-sm`}>
        {userImageProfile ? (
          <Image
            style={tw`h-10 w-10 rounded-full border border-sky-500`}
            src={userImageProfile}
            alt="User Image"
          />
        ) : (
          <ActivityIndicator style={tw`h-10 w-10`} />
        )}
      </Pressable>

      {isExpandedProfile && (
        <View
          id="user-menu"
          style={tw`absolute right-0 top-8 z-50 mt-2 w-48 rounded-md py-1 shadow-lg focus:outline-none
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
