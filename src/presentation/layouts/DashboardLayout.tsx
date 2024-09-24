import {ReactNode} from 'react';
import {SafeAreaView, View} from 'react-native';
import tw from 'twrnc';

import {Navbar} from '../components/Navbar';

interface Props {
  children: ReactNode;
}

export const DashboardLayout = ({children}: Props) => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Navbar />

      <View style={tw`flex-1 px-5 w-full pb-5`}>{children}</View>
    </SafeAreaView>
  );
};
