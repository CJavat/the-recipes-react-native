import {useState} from 'react';
import {ActivityIndicator, Alert, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import {AxiosError} from 'axios';

import {DashboardLayout} from '../../layouts/DashboardLayout';
import {BackButton} from '../../components/BackButton';
import {Footer} from '../../components/Footer';

import {useThemeStore} from '../../store/theme/ThemeStore';
import {useUserStore} from '../../store/dashboard/UserStore';
import {useAuthStore} from '../../store/auth/AuthStore';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';

export const DeleteAccountScreen = () => {
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();
  const {cancelAccount, deleteAccount} = useUserStore();
  const {logout} = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);
  const [isPressedButton, setIsPressedButton] = useState({
    cancelAccount: false,
    deleteAccount: false,
  });

  const handleCancelAccount = async () => {
    setIsPosting(true);
    try {
      const {ok, message} = await cancelAccount();

      if (!ok) {
        Alert.alert('Error', message, [
          {text: 'Ok', onPress: () => navigation.replace('Settings')},
        ]);
        return;
      }

      Alert.alert('Cuenta Cancelada', message, [
        {text: 'Ok', onPress: async () => await logout()},
      ]);
      return;
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Error', error?.response?.data.message[0], [
          {text: 'Ok', onPress: () => navigation.replace('Settings')},
        ]);
        return;
      }
      console.log(error);
      Alert.alert('Error', 'No se pudo desactivar tu cuenta', [
        {text: 'Ok', onPress: () => navigation.replace('Settings')},
      ]);
      return;
    } finally {
      setIsPosting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsPosting(true);
    try {
      const {ok, message} = await deleteAccount();

      if (!ok) {
        Alert.alert('Error', message, [
          {text: 'Ok', onPress: () => navigation.replace('Settings')},
        ]);
        return;
      }

      Alert.alert('Cuenta Eliminada', message, [
        {text: 'Ok', onPress: async () => await logout()},
      ]);
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Error', error?.response?.data.message[0], [
          {text: 'Ok', onPress: () => navigation.replace('Settings')},
        ]);
        return;
      }
      console.log(error);
      Alert.alert('Error', 'No se pudo eliminar tu cuenta', [
        {text: 'Ok', onPress: () => navigation.replace('Settings')},
      ]);
      return;
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <DashboardLayout>
      <View style={tw`mb-5 flex-1 justify-between`}>
        <View>
          <BackButton />

          <Text style={tw`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
            Eliminar Cuenta
          </Text>

          <View style={tw`mt-5`}>
            <Text style={tw`text-red-500 my-5`}>
              Estas a punto de eliminar tu cuenta o cancelar tu cuenta
              temporalmente, ten en cuenta que todos tus datos, recetas y
              favoritos seran eliminados permanentemente.
            </Text>

            <Text style={tw`${isDark ? 'text-sky-50' : 'text-sky-950'}`}>
              Selecciona una opción
            </Text>

            <Pressable
              style={tw`${
                isPressedButton.cancelAccount ? 'bg-sky-500' : 'bg-transparent'
              } mt-5 flex w-full flex-row items-center justify-center gap-5 rounded-md border border-sky-600 px-3 py-1.5`}
              onPressIn={() =>
                setIsPressedButton(prevState => ({
                  ...prevState,
                  cancelAccount: true,
                }))
              }
              onPressOut={() =>
                setIsPressedButton(prevState => ({
                  ...prevState,
                  cancelAccount: false,
                }))
              }
              onPress={handleCancelAccount}
              disabled={isPosting}>
              {!isPosting ? (
                <>
                  <Icon
                    name="trash-outline"
                    size={20}
                    style={tw`${
                      isPressedButton.cancelAccount
                        ? 'text-sky-50'
                        : 'text-sky-500'
                    }`}
                  />
                  <Text
                    style={tw`uppercase text-sm font-semibold ${
                      isPressedButton.cancelAccount
                        ? 'text-sky-50'
                        : 'text-sky-500'
                    }`}>
                    Desactivar Cuenta
                  </Text>
                </>
              ) : (
                <ActivityIndicator color="#0EA5E9" animating={isPosting} />
              )}
            </Pressable>

            <Pressable
              style={tw`${
                isPressedButton.deleteAccount ? 'bg-red-500' : 'bg-transparent'
              } mt-5 flex w-full flex-row items-center justify-center gap-5 rounded-md border border-red-600 px-3 py-1.5`}
              onPressIn={() =>
                setIsPressedButton(prevState => ({
                  ...prevState,
                  deleteAccount: true,
                }))
              }
              onPressOut={() =>
                setIsPressedButton(prevState => ({
                  ...prevState,
                  deleteAccount: false,
                }))
              }
              onPress={handleDeleteAccount}
              disabled={isPosting}>
              {!isPosting ? (
                <>
                  <Icon
                    name="close-circle-outline"
                    size={20}
                    style={tw`${
                      isPressedButton.deleteAccount
                        ? 'text-sky-50'
                        : 'text-red-500'
                    }`}
                  />
                  <Text
                    style={tw`uppercase text-sm font-semibold ${
                      isPressedButton.deleteAccount
                        ? 'text-sky-50'
                        : 'text-red-500'
                    }`}>
                    Borrar Cuenta
                  </Text>
                </>
              ) : (
                <ActivityIndicator color="#EF4444" animating={isPosting} />
              )}
            </Pressable>
          </View>
        </View>

        <Footer />
      </View>
    </DashboardLayout>
  );
};
