import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {DashboardLayout} from '../../layouts/DashboardLayout';
import {Footer} from '../../components/Footer';

import {useThemeStore} from '../../store/theme/ThemeStore';
import {useAuthStore} from '../../store/auth/AuthStore';
import {useUserStore} from '../../store/dashboard/UserStore';

import {DashboardStackParams} from '../../navigator/DashboardNavigator';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {AxiosError} from 'axios';

interface FormInput {
  firstName: string;
  lastName: string;
}

export const EditAccountScreen = () => {
  const {id} =
    useRoute<RouteProp<DashboardStackParams, 'EditAccount'>>().params;
  const navigation = useNavigation<StackNavigationProp<DashboardStackParams>>();
  const {isDark} = useThemeStore();
  const {user, updateUser} = useAuthStore();
  const {updateProfile} = useUserStore();
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormInput>({
    defaultValues: {
      firstName: user?.firstName ?? 'No Name',
      lastName: user?.lastName ?? 'No Name',
    },
  });

  const [isPosting, setIsPosting] = useState(false);
  const [isPressedButton, setIsPressedButton] = useState(false);

  const handleUpdateProfile: SubmitHandler<FormInput> = async data => {
    setIsPosting(true);

    if (!id) return;

    try {
      const resp = await updateProfile(id, data);
      console.log(JSON.stringify(resp, null, 3));

      updateUser(resp);
      Alert.alert(
        'Datos Actualizados',
        'Se actualizaron tus datos correctamente',
        [{text: 'Ok', onPress: () => navigation.replace('Home')}],
      );
      return;
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
      <View style={tw`my-2 flex-1 justify-between`}>
        <View>
          <View>
            <Text style={tw`text-2xl ${isDark ? 'text-white' : 'text-black'}`}>
              Mi Cuenta
            </Text>

            <View style={tw`mt-6`}>
              {/* Nombre */}
              <View
                style={tw`px-4 py-6 border-t ${
                  isDark ? 'border-t-sky-900' : 'border-t-sky-300'
                }`}>
                <Text
                  style={tw`text-lg font-medium ${
                    isDark ? 'text-white' : 'text-black'
                  }  `}>
                  Nombre
                </Text>
                <View style={tw`mt-2`}>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'El nombre es obligatorio',
                      },
                      pattern: {
                        value: /([a-zA-Z]+)/,
                        message: 'Escribe un nombre válido',
                      },
                      minLength: {
                        value: 3,
                        message: 'Escribe al menos 3 caracteres',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={tw`w-full rounded-md pl-3 py-1.5 border border-sky-500 ${
                          isDark ? 'text-sky-50' : 'text-sky-950'
                        }`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Escribe tu nombre"
                      />
                    )}
                    name="firstName"
                    defaultValue=""
                  />
                  {errors.firstName && (
                    <Text style={tw`text-red-500`}>
                      {errors.firstName.message}
                    </Text>
                  )}
                </View>
              </View>

              {/* Apellido */}
              <View
                style={tw`px-4 py-6 border-t ${
                  isDark ? 'border-t-sky-900' : 'border-t-sky-300'
                }`}>
                <Text
                  style={tw`text-lg font-medium ${
                    isDark ? 'text-white' : 'text-black'
                  }  `}>
                  Apellido
                </Text>
                <View style={tw`mt-2`}>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'El apellido es obligatorio',
                      },
                      pattern: {
                        value: /([a-zA-Z]+)/,
                        message: 'Escribe un apellido válido',
                      },
                      minLength: {
                        value: 3,
                        message: 'Escribe al menos 5 caracteres',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={tw`w-full rounded-md pl-3 py-1.5 border border-sky-500  ${
                          isDark ? 'text-sky-50' : 'text-sky-950'
                        }`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Escribe tu apellido"
                      />
                    )}
                    name="lastName"
                    defaultValue=""
                  />
                  {errors.lastName && (
                    <Text style={tw`text-red-500`}>
                      {errors.lastName.message}
                    </Text>
                  )}
                </View>
              </View>

              {/* Button */}
              <View style={tw`px-4 py-6`}>
                <Pressable
                  style={tw`w-full justify-center rounded-md px-3 py-1.5 flex-row justify-center items-center gap-3 ${
                    isPressedButton ? 'bg-sky-500' : 'bg-sky-600'
                  }`}
                  onPressIn={() => setIsPressedButton(true)}
                  onPressOut={() => setIsPressedButton(false)}
                  onPress={handleSubmit(handleUpdateProfile)}
                  disabled={isPosting}>
                  {!isPosting ? (
                    <>
                      <Icon
                        name="reload-circle-outline"
                        size={20}
                        color="#FFF"
                      />
                      <Text
                        style={tw`text-sm font-semibold text-center uppercase text-white`}>
                        Actualizar Cuenta
                      </Text>
                    </>
                  ) : (
                    <ActivityIndicator color={'#FFF'} animating={isPosting} />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <Footer />
      </View>
    </DashboardLayout>
  );
};
