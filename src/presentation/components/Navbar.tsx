import {Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons';

import {RootStackParams} from '../navigator/Navigator';

export const Navbar = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  return (
    <View
      style={tw`sticky w-full top-0 right-0 bg-sky-50 dark:bg-sky-950 border-b border-b-sky-200 dark:border-b-sky-900 z-50`}>
      <View style={tw`mx-auto max-w-7xl px-2`}>
        <View style={tw`relative flex h-16 items-center justify-between`}>
          <View style={tw`relative inset-y-0 left-0 flex items-center`}>
            <Pressable
              style={tw`relative inline-flex items-center justify-center rounded-md p-2 text-black dark:text-white focus:outline-none focus:text-blue-950 dark:focus:text-sky-50 ring-1 focus:ring-sky-950 dark:focus:ring-sky-50`}
              id="recipe-menu"
              // (click)="toggleNavMenu($event)"
            >
              <Icon name="arrow-back-outline" size={40} />
            </Pressable>
          </View>

          <View style={tw`flex items-center justify-center`}>
            <Pressable
              // routerLink="/dashboard"
              style={tw`flex flex-shrink-0 items-center mx-5 md:mx-0`}>
              {/* <img
                style={tw`h-8 w-auto rounded-md`}
                src="/android-chrome-512x512.png"
                alt="The Recipes Logo"
              /> */}
            </Pressable>
          </View>

          <View style={tw`relative flex items-center gap-3 pr-2`}>
            {/* <!-- Search Component --> */}
            {/* <dashboard-search-component /> */}

            {/* <!-- Sun/Moon Theme  --> */}
            {/* <shared-theme class="hidden sm:block" /> */}

            {/* <!-- Profile dropdown --> */}
            <View style={tw`relative`}>
              <Pressable
                style={tw`h-8 w-8 relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                id="user-menu-button"
                // (click)="toggleNavMenu($event, 'user-menu-button')"
              >
                {/* <span style={tw`absolute -inset-1.5`}></span> */}
                {/* <span style={tw`sr-only`}>Open user menu</span> */}
                {/* <img
                  style={tw`h-8 w-8 rounded-full`}
                  // [src]="imageUser?.src"
                  // [alt]="imageUser?.alt"
                /> */}
              </Pressable>

              <View
                style={tw`bg-sky-50 dark:bg-sky-950 text-black dark:text-white absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-500 ease-in-out`}
                role="menu"
                id="user-menu"
                // [ngClass]="{
                //   'opacity-0 max-h-0 overflow-hidden': !isExpandedProfile,
                //   'opacity-100 max-h-screen': isExpandedProfile,
                // }"
              >
                {/* @for (route of accountRoutes; track $index) { */}
                <Pressable
                  // (click)="toggleNavMenu($event, 'user-menu-button')"
                  // [routerLink]="route.routerLink"
                  // routerLinkActive="bg-sky-500 text-white"
                  style={tw`block px-4 py-2 text-sm hover:bg-sky-200 dark:hover:bg-sky-900`}
                  role="menuitem"
                  id="user-menu-item-0">
                  {/* {{ route.label }} */}
                </Pressable>
                {/*}*/}

                <Pressable
                  style={tw`block px-4 py-2 text-sm font-bold text-red-500 hover:bg-sky-200 dark:hover:bg-sky-900 w-full text-left`}
                  role="menuitem"
                  // tabindex="-1"
                  id="user-menu-item-2"
                  // (click)="OnLogout()"
                >
                  <Text>Cerrar Sesión</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {/* <View 
        // style={tw`transition-all duration-500 ease-in-out`}
        // [ngClass]="{
        //   'opacity-0 max-h-0 overflow-hidden': !isExpanded,
        //   'opacity-100 max-h-screen': isExpanded,
        // }"
        // id="mobile-menu">
        {/* <View style={tw`space-y-1 px-2 pb-3 pt-2`}> */}
      {/* @for (route of recipesRoutes; track $index) { */}
      {/* <Pressable
            // [routerLink]="route.routerLink"
            // [routerLinkActiveOptions]="{ exact: true }"
            // (click)="toggleNavMenu($event)"
            // routerLinkActive="bg-sky-500 text-white"
            style={tw`rounded-md px-3 py-2 text-sm font-medium text-black dark:text-white hover:bg-sky-700 hover:text-white`}>
            {/* {{ route.label }}
          </Pressable> */}
      {/* } */}
      {/* </View> */}
      {/* <!-- Sun/Moon Theme  --> */}
      {/* <shared-theme class="block mt-7 px-3" />
      // </View> */}
    </View>
  );
};
