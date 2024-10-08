import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, View, ActivityIndicator} from 'react-native';
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

  const [isLoading, setIsLoading] = useState(false);
  const [isExpandedProfile, setIsExpandedProfile] = useState(false);
  const [userImageProfile, setUserImageProfile] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const backendUrl = API_URL.replace('/api', '');

    let imageUrl = '';
    if (user?.avatar?.startsWith('http')) {
      imageUrl = `${user.avatar}?invalidate=true`;
    } else {
      imageUrl = `${backendUrl}/${user?.avatar}`;
    }

    setUserImageProfile(`${imageUrl}?t=${new Date().getTime()}`);

    setIsLoading(false);
  }, [user]);

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
        style={tw`h-10 w-10 relative flex rounded-full text-sm ${
          isLoading ? 'border border-sky-500' : ''
        }`}>
        {!isLoading && userImageProfile ? (
          <Image
            key={userImageProfile}
            style={tw`h-10 w-10 rounded-full border border-sky-500`}
            source={{uri: userImageProfile}}
            alt="User Image"
            onLoad={() => setIsLoading(false)}
            onError={() => console.log('Error al cargar la imagen.')}
          />
        ) : (
          <ActivityIndicator
            style={tw`h-10 w-10`}
            color={isDark ? '#F0F9FF' : '#082F49'}
          />
        )}
      </Pressable>

      {isExpandedProfile && (
        <View
          id="user-menu"
          style={tw`absolute right-0 top-8 z-50 mt-2 w-48 rounded-md py-1 shadow-lg
          ${isDark ? 'bg-sky-950' : 'bg-sky-50'}
        `}>
          {profileRoutes.map(profile => (
            <Pressable
              onPress={() => profileMenuOptionSelected(profile)}
              key={profile.id}
              style={tw`flex-row items-center gap-5 px-4 py-2 text-sm ${
                isDark ? 'hover:bg-sky-900' : 'hover:bg-sky-200'
              }
          ${route.name === profile.name ? 'bg-sky-500' : ''}
          `}
              id="user-menu-item-0">
              <Icon
                name={profile.icon}
                size={20}
                style={tw`${
                  route.name === profile.name
                    ? 'text-white'
                    : isDark
                    ? 'text-white'
                    : 'text-black'
                }`}
              />
              <Text
                style={tw`${
                  route.name === profile.name
                    ? 'text-white'
                    : isDark
                    ? 'text-white'
                    : 'text-black'
                }`}>
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
