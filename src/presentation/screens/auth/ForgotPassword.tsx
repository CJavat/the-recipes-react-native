import {Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {RootStackParams} from '../../navigator/Navigator';

interface Props extends StackScreenProps<RootStackParams, 'ForgotPassword'> {}

//TODO: Terminar Componente
export const ForgotPassword = ({navigation}: Props) => {
  return <Text>ForgotPassword</Text>;
};
