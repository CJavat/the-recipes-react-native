import {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import {useThemeStore} from '../../store/theme/ThemeStore';
import {AuthStackParams} from '../../navigator/AuthNavigator';
import {useAuthStore} from '../../store/auth/AuthStore';

const theRecipesLogo = require('../../../assets/logos/android-chrome-512x512.png');

interface FormInput {
  email: string;
}
interface Props
  extends StackScreenProps<AuthStackParams, 'ReactivateAccount'> {}

export const ReactivateAccount = ({navigation, route}: Props) => {
  const {reactivateAccount} = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [isPressedButton, setIsPressedButton] = useState({
    backButton: false,
    reactivateButton: false,
  });

  const {isDark} = useThemeStore();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async data => {
    const {email} = data;

    setIsPosting(true);
    try {
      const {message} = await reactivateAccount(email);

      Alert.alert('Cuenta Reactivada', message, [
        {text: 'OK', onPress: () => navigation.replace('Login')},
      ]);

      return;
    } catch (error) {
      console.log(error);
      Alert.alert('Error Al Reactivar Cuenta', error as string, [{text: 'OK'}]);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Pressable
          onPressIn={() =>
            setIsPressedButton(prevState => ({...prevState, backButton: true}))
          }
          onPressOut={() =>
            setIsPressedButton(prevState => ({...prevState, backButton: false}))
          }
          onPress={() => navigation.goBack()}
          style={tw`absolute top-5 left-1 flex flex-row items-center px-3 rounded `}>
          <Icon
            name="arrow-back-outline"
            size={40}
            style={tw`${
              isPressedButton.backButton ? 'text-sky-500' : 'text-sky-700'
            }`}
          />
        </Pressable>

        <View style={tw`flex flex-col justify-center px-6 py-12 lg:px-8`}>
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
              Activar Cuenta
            </Text>
          </View>

          <View style={tw`mt-10 sm:mx-auto sm:w-full sm:max-w-sm`}>
            <View style={tw`space-y-6`}>
              <View>
                <Text
                  style={tw`text-sm font-medium leading-6 text-sky-950 dark:text-sky-50`}>
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

              <View>
                <Pressable
                  onPressIn={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      reactivateButton: true,
                    }))
                  }
                  onPressOut={() =>
                    setIsPressedButton(prevState => ({
                      ...prevState,
                      reactivateButton: false,
                    }))
                  }
                  onPress={handleSubmit(onSubmit)}
                  disabled={isPosting}
                  style={tw`mt-5 rounded-md px-3 py-1.5 ${
                    isPressedButton.reactivateButton
                      ? 'bg-sky-500'
                      : 'bg-sky-700'
                  }`}>
                  {!isPosting ? (
                    <Text
                      style={tw`text-center uppercase font-bold text-white`}>
                      Reactivar Cuenta
                    </Text>
                  ) : (
                    <ActivityIndicator color={'#FFF'} animating={isPosting} />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
