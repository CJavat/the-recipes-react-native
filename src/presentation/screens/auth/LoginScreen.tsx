import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import tw from 'twrnc';

export const LoginScreen = () => {
  const theRecipesLogo = require('../../../assets/logos/android-chrome-512x512.png');

  return (
    <SafeAreaView>
      <View style={tw`flex flex-col justify-center px-6 py-12 lg:px-8`}>
        <View style={tw`sm:mx-auto sm:w-full sm:max-w-sm`}>
          <Image
            style={tw`mx-auto h-28 w-28 rounded-2xl`}
            source={theRecipesLogo}
            alt="The Recipes Logo"
          />
          <Text
            style={tw`mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-sky-500 dark:text-sky-50`}>
            Iniciar Sesión
          </Text>
        </View>

        <View style={tw`mt-10 sm:mx-auto sm:w-full sm:max-w-sm`}>
          <View style={tw`space-y-6`}>
            <View>
              <Text
                style={tw`block text-sm font-medium leading-6 text-sky-500 dark:text-sky-50`}>
                Email
              </Text>
              <View style={tw`mt-2`}>
                <TextInput
                  // name="email"
                  // type="email"
                  style={tw`block w-full rounded-md border-0 pl-3 py-1.5 text-sky-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 outline-none sm:text-sm sm:leading-6`}
                  // required
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

//TODO: Instalar Formik y Yup para la validación de los formularios
//TODO: También acomodar los colores de los textos cuando sea dark poner un color y cuando no poner el otro
//TODO: Terminar el componente
