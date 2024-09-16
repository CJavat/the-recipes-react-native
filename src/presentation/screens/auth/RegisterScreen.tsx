import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParams} from '../../navigator/Navigator';
import {useThemeStore} from '../../store/theme/ThemeStore';
import {useAuthStore} from '../../store/auth/AuthStore';

interface FormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePasword: string;
}

interface Props extends StackScreenProps<RootStackParams, 'Register'> {}

type eyePassword = 'eye-outline' | 'eye-off-outline';
const theRecipesLogo = require('../../../assets/logos/android-chrome-512x512.png');

export const RegisterScreen = ({navigation}: Props) => {
  const {isDark} = useThemeStore();
  const {signUp} = useAuthStore();
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<FormInput>();

  const passwordValue = watch('password', '');

  const [isPressedButton, setIsPressedButton] = useState({
    registerAccountButton: false,
    loginButton: false,
  });

  const [passwordIcon, setPasswordIcon] =
    useState<eyePassword>('eye-off-outline');
  const [showPassword, setShowPassword] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const toggleShowPassword = async () => {
    setPasswordIcon(
      passwordIcon === 'eye-outline' ? 'eye-off-outline' : 'eye-outline',
    );

    setShowPassword(passwordIcon === 'eye-outline' ? false : true);
  };

  const onSubmit: SubmitHandler<FormInput> = async data => {
    const {firstName, lastName, email, password} = data;
    setIsPosting(true);

    try {
      const message = await signUp(firstName, lastName, email, password);
      Alert.alert('Cuenta Creada Correctamente', message[0], [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('Login');
          },
        },
      ]);

      return;
    } catch (error) {
      Alert.alert('Error Al Ingresar', error as string, [{text: 'OK'}]);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={tw`flex flex-col justify-center px-6 py-3 lg:px-8`}>
          <View style={tw`mx-auto w-full max-w-sm`}>
            <Image
              style={tw`mx-auto h-28 w-28 rounded-2xl`}
              source={theRecipesLogo}
              alt="The Recipes Logo"
            />
            <Text
              style={tw`mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-sky-500 ${
                isDark ? 'text-sky-50' : 'text-sky-950'
              }`}>
              Crear Cuenta
            </Text>
          </View>

          <View style={tw`mt-10 mx-auto w-full max-w-sm`}>
            <View style={tw`gap-6`}>
              {/* Nombre */}
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
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
                        style={tw`w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ${
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
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
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
                        style={tw`w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ${
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

              {/* Email */}
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
                  Email
                </Text>
                <View style={tw`mt-2`}>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'El correo es obligatorio',
                      },
                      pattern: {
                        value:
                          /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                        message: 'Escribe un correo válido',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <TextInput
                        style={tw`w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ${
                          isDark ? 'text-sky-50' : 'text-sky-950'
                        }`}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Escribe el correo"
                        keyboardType="email-address"
                      />
                    )}
                    name="email"
                    defaultValue=""
                  />
                  {errors.email && (
                    <Text style={tw`text-red-500`}>{errors.email.message}</Text>
                  )}
                </View>
              </View>

              {/* Password */}
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
                  Contraseña
                </Text>
                <View style={tw`mt-2`}>
                  <Controller
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: 'La contraseña es obligatoria',
                      },
                      minLength: {
                        value: 6,
                        message:
                          'La contraseña debe tener al menos 6 caracteres',
                      },
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <>
                        <TextInput
                          style={tw`w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ${
                            isDark ? 'text-sky-50' : 'text-sky-950'
                          }`}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          placeholder="Escribe la contraseña"
                          secureTextEntry={!showPassword}
                        />

                        <Pressable
                          onPress={toggleShowPassword}
                          style={tw`absolute top-1 right-3 z-10`}>
                          <Icon name={passwordIcon} size={30} />
                        </Pressable>
                      </>
                    )}
                    name="password"
                    defaultValue=""
                  />
                  {errors.password && (
                    <Text style={tw`text-red-500`}>
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              </View>

              {/* Confirmar Password */}
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 ${
                    isDark ? 'text-sky-50' : 'text-sky-950'
                  }`}>
                  Confirmar Contraseña
                </Text>
                <View style={tw`mt-2`}>
                  <Controller
                    control={control}
                    rules={{
                      validate: value =>
                        value === passwordValue ||
                        'Las contraseñas con coinciden',
                    }}
                    render={({field: {onChange, onBlur, value}}) => (
                      <>
                        <TextInput
                          style={tw`w-full rounded-md border-0 pl-3 py-1.5 shadow-sm ${
                            isDark ? 'text-sky-50' : 'text-sky-950'
                          }`}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          placeholder="Escribe otra vez la contraseña"
                          secureTextEntry={!showPassword}
                        />

                        <Pressable
                          onPress={toggleShowPassword}
                          style={tw`absolute top-1 right-3 z-10`}>
                          <Icon name={passwordIcon} size={30} />
                        </Pressable>
                      </>
                    )}
                    name="rePasword"
                    defaultValue=""
                  />
                  {errors.rePasword && (
                    <Text style={tw`text-red-500`}>
                      {errors.rePasword.message}
                    </Text>
                  )}
                </View>
              </View>

              <Pressable
                onPressIn={() =>
                  setIsPressedButton(prevState => ({
                    ...prevState,
                    registerAccountButton: true,
                  }))
                }
                onPressOut={() =>
                  setIsPressedButton(prevState => ({
                    ...prevState,
                    registerAccountButton: false,
                  }))
                }
                onPress={handleSubmit(onSubmit)}
                disabled={isPosting}
                style={tw`rounded-md px-3 py-1.5 ${
                  isPressedButton.registerAccountButton
                    ? 'bg-sky-500'
                    : 'bg-sky-700'
                }`}>
                {!isPosting ? (
                  <Text style={tw`text-center uppercase font-bold text-white`}>
                    Crear Cuenta
                  </Text>
                ) : (
                  <ActivityIndicator color={'#FFF'} animating={isPosting} />
                )}
              </Pressable>
            </View>

            <Text style={tw`mt-10 text-center text-gray-500`}>
              ¿Ya tienes cuenta?
            </Text>
            <Pressable
              onPressIn={() =>
                setIsPressedButton(prevStaet => ({
                  ...prevStaet,
                  loginButton: true,
                }))
              }
              onPressOut={() =>
                setIsPressedButton(prevStaet => ({
                  ...prevStaet,
                  loginButton: false,
                }))
              }
              onPress={() => navigation.replace('Login')}>
              <Text
                style={tw`font-semibold leading-6 text-center ${
                  isPressedButton.loginButton ? 'text-sky-500' : 'text-sky-700'
                }`}>
                Inicia sesión aquí.
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
