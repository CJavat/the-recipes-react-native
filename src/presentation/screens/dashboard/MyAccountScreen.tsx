import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {DashboardLayout} from '../../layouts/DashboardLayout';

import {useThemeStore} from '../../store/theme/ThemeStore';
import {useAuthStore} from '../../store/auth/AuthStore';

import {API_URL} from '../../../config/api/recipesApi';
import {DashboardStackParams} from '../../navigator/DashboardNavigator';

export const MyAccountScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();
  const {user} = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [userImageProfile, setUserImageProfile] = useState('');
  const [isPressedButton, setIsPressedButton] = useState({
    changeImage: false,
    editAccount: false,
  });

  useEffect(() => {
    setIsLoading(true);
    const backendUrl = API_URL.replace('/api', '');

    let imageUrl = '';
    if (user?.avatar?.startsWith('http')) {
      imageUrl = user.avatar;
    } else {
      imageUrl = `${backendUrl}/${user?.avatar}`;
    }
    setUserImageProfile(`${imageUrl}?${new Date().getTime()}`);
    setIsLoading(false);
  }, []);

  const handleEditAccount = () => {
    if (!user?.id) return;

    navigation.navigate('EditAccount', {id: user.id});
  };

  return (
    <DashboardLayout>
      {isLoading ? (
        <View style={tw`flex-1 justify-center`}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={tw`my-2`}>
            <Text style={tw`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
              Mi Cuenta
            </Text>

            <View
              style={tw`mt-6 border-t ${
                isDark ? 'border-t-sky-900' : 'border-t-sky-300'
              }`}>
              <View style={tw`px-4 py-6 gap-2 items-center`}>
                <View>
                  <Text
                    style={tw`text-lg font-medium ${
                      isDark ? 'text-white' : 'text-black'
                    }`}>
                    Avatar
                  </Text>
                </View>

                <View
                  style={tw`h-28 w-28 mt-1 rounded-full border border-sky-500 items-center justify-center`}>
                  {userImageProfile ? (
                    <Image
                      style={tw`h-28 w-28 rounded-full border border-sky-500`}
                      source={{uri: userImageProfile}}
                      alt={`${user?.firstName} ${user?.lastName}`}
                    />
                  ) : (
                    <ActivityIndicator
                      size={60}
                      color={isDark ? '#F0F9FF' : '#082F49'}
                    />
                  )}
                </View>

                <Pressable
                  style={tw`mt-5 w-full rounded-md border flex-row justify-center items-center gap-3 ${
                    isPressedButton.changeImage
                      ? 'border-sky-500'
                      : 'border-sky-600'
                  }  px-3 py-1.5`}
                  onPressIn={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      changeImage: true,
                    }))
                  }
                  onPressOut={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      changeImage: false,
                    }))
                  }
                  onPress={() => navigation.navigate('UpdateImage')}>
                  <Icon
                    name="camera-reverse-outline"
                    size={20}
                    style={tw`${isDark ? 'text-sky-50' : 'text-sky-950'}`}
                  />
                  <Text
                    style={tw`${
                      isDark ? 'text-sky-50' : 'text-sky-950'
                    } text-sm font-semibold text-center uppercase`}>
                    Cambiar Imagen
                  </Text>
                </Pressable>
              </View>

              <View
                style={tw`px-4 py-2 border-t ${
                  isDark ? 'border-t-sky-900' : 'border-t-sky-300'
                }`}>
                <Text
                  style={tw`text-lg font-medium ${
                    isDark ? 'text-white' : 'text-black'
                  }  `}>
                  Nombre
                </Text>
                <Text style={tw`my-1 text-sm text-sky-500`}>
                  {user?.firstName ?? 'Sin Nombre'}
                </Text>
              </View>

              <View
                style={tw`px-4 py-2 border-t ${
                  isDark ? 'border-t-sky-900' : 'border-t-sky-300'
                }`}>
                <Text
                  style={tw`text-lg font-medium ${
                    isDark ? 'text-white' : 'text-black'
                  }  `}>
                  Apellido
                </Text>
                <Text style={tw`my-1 text-sm text-sky-500`}>
                  {user?.lastName ?? 'Sin Apellido'}
                </Text>
              </View>

              <View
                style={tw`px-4 py-2 border-t ${
                  isDark ? 'border-t-sky-900' : 'border-t-sky-300'
                }`}>
                <Text
                  style={tw`text-lg font-medium ${
                    isDark ? 'text-white' : 'text-black'
                  }  `}>
                  Email
                </Text>
                <Text style={tw`my-1 text-sm text-sky-500`}>
                  {user?.email ?? 'Sin Email'}
                </Text>
              </View>

              <View style={tw`px-4 py-6`}>
                <Pressable
                  style={tw`w-full justify-center rounded-md px-3 py-1.5 flex-row justify-center items-center gap-3 ${
                    isPressedButton.editAccount ? 'bg-sky-500' : 'bg-sky-600'
                  }`}
                  onPressIn={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      editAccount: true,
                    }))
                  }
                  onPressOut={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      editAccount: false,
                    }))
                  }
                  onPress={handleEditAccount}>
                  <Icon name="create-outline" size={20} color="#FFF" />
                  <Text
                    style={tw`text-sm font-semibold text-center uppercase text-white`}>
                    Editar Perfil
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </DashboardLayout>
  );
};
