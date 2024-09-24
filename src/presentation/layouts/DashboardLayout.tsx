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
      {/* 
      //TODO: Agregar una flecha de retroceso en la esquina superior izquierda. Y también agregarle un padding-top para que quede bien la flecha.
      */}
      <Navbar />

      <View style={tw`flex-1 px-5 w-full pb-5`}>{children}</View>
    </SafeAreaView>
  );
};
