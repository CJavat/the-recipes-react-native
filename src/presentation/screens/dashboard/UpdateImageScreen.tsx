import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import tw from 'twrnc';
import {AxiosError} from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

import {DashboardLayout} from '../../layouts/DashboardLayout';
import {BackButton} from '../../components/BackButton';

import {useAuthStore} from '../../store/auth/AuthStore';
import {useThemeStore} from '../../store/theme/ThemeStore';
import {useUserStore} from '../../store/dashboard/UserStore';

import {API_URL} from '../../../config/api/recipesApi';
import {DashboardStackParams} from '../../navigator/DashboardNavigator';

export const UpdateImageScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();
  const {updatePhoto} = useUserStore();
  const {user, updateUser} = useAuthStore();
  const [userImage, setUserImage] = useState('');

  const [isPosting, setIsPosting] = useState(false);
  const [isPressedButton, setIsPressedButton] = useState(false);

  useEffect(() => {
    if (!user?.avatar) return navigation.replace('MyAccount');

    const backendUrl = API_URL.replace('/api', '');

    let imageUrl = '';
    if (user.avatar.startsWith('http')) {
      imageUrl = user.avatar;
    } else {
      imageUrl = `${backendUrl}/${user.avatar}`;
    }

    setUserImage(`${imageUrl}?${new Date().getTime()}`);
  }, []);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 700,
      height: 700,
      cropping: true, // Permite el recorte
      mediaType: 'photo',
    }).then((image: ImageOrVideo) => {
      const formData = new FormData();
      formData.append('file', {
        uri: image.path.startsWith('file://')
          ? image.path
          : `file://${image.path}`,
        type: image.mime || 'image/jpeg', // tipo de la imagen, usa image.mime si está disponible
        name: image.filename || 'image.jpg', // nombre del archivo, usa image.filename si está disponible
      });
      handleUpdatePhoto(formData);
    });
  };

  const handleUpdatePhoto = async (image: FormData) => {
    setIsPosting(true);

    try {
      const resp = await updatePhoto(image);
      updateUser(resp);

      Alert.alert(
        'Imagen Actualizada',
        'Tu foto de perfil se ha actualizado correctamente',
        [{text: 'Ok', onPress: () => navigation.replace('MyAccount')}],
      );
      return;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response);
        Alert.alert('Error', error?.response?.data.message, [
          {text: 'Ok', onPress: () => navigation.replace('MyAccount')},
        ]);
        return;
      }
      console.log(error);
      Alert.alert('Error Desconocido', 'No se pudo actualizar tu foto', [
        {text: 'Ok', onPress: () => navigation.replace('MyAccount')},
      ]);
      return;
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <DashboardLayout>
      <BackButton />

      <View style={tw`my-2`}>
        <View
          style={tw`border-b ${
            isDark ? 'border-b-sky-900' : 'border-b-sky-300'
          }`}>
          <Text
            style={tw`mb-2 text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
            Actualizar Foto
          </Text>
        </View>

        <View
          style={tw`mt-6 w-full mx-auto flex flex-col justify-center items-center gap-5`}>
          {userImage ? (
            <Image
              alt={`${user?.firstName} ${user?.lastName}`}
              source={{uri: userImage}}
              style={tw`w-full rounded-full h-36 w-36 border border-sky-500`}
            />
          ) : (
            <ActivityIndicator
              size={60}
              color={isDark ? '#F0F9FF' : '#082F49'}
            />
          )}

          <Pressable
            style={tw`w-full justify-center rounded-md px-3 py-1.5 flex-row justify-center items-center gap-3 ${
              isPressedButton ? 'bg-sky-500' : 'bg-sky-600'
            }`}
            onPressIn={() => setIsPressedButton(true)}
            onPressOut={() => setIsPressedButton(false)}
            onPress={pickImage}
            disabled={isPosting}>
            {!isPosting ? (
              <>
                <Icon name="camera-outline" size={20} color="#FFF" />
                <Text
                  style={tw`text-sm font-semibold text-center uppercase text-white`}>
                  Seleccionar Imagen
                </Text>
              </>
            ) : (
              <ActivityIndicator
                color={'#FFF'}
                size={20}
                animating={isPosting}
              />
            )}
          </Pressable>
        </View>
      </View>
    </DashboardLayout>
  );
};
