import {ReactNode} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import tw from 'twrnc';

import {Footer} from '../components/Footer';
import {Navbar} from '../components/Navbar';

interface Props {
  children: ReactNode;
}

export const DashboardLayout = ({children}: Props) => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`flex-grow`}>
        <Navbar />

        <View style={tw`flex-1 px-5 w-full pb-5`}>{children}</View>

        <View style={tw`border-t border-sky-500`}>
          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
