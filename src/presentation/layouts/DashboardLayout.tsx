import {ReactNode} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import tw from 'twrnc';

import {Footer} from '../components/Footer';

interface Props {
  children: ReactNode;
}

export const DashboardLayout = ({children}: Props) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{flex: 1}}>
          {/* <dashboard-navbar [imageUser]="avatar" /> */}

          <View style={[tw`bg-sky-50 dark:bg-sky-950 px-5 w-full pb-5`]}>
            {children}
          </View>

          <Footer />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
