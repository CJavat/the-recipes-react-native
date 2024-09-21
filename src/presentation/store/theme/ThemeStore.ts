import {create} from 'zustand';

import type {Theme} from '@react-navigation/native';

export interface ThemeState {
  isDark: boolean;
  theme: Theme;

  setTheme: (theme: string) => void;
  toggleTheme: (isDarkTheme: boolean) => void;
}

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#075985', // border-sky-800
    background: '#082F49', // border-sky-950
    card: '#075985', // border-sky-800
    text: '#F0F9FF', // border-sky-50
    border: '#0EA5E9', // border-sky-500
    notification: '#082F49', // border-sky-950
  },
};

const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#BAE6FD', // border-sky-200
    background: '#F0F9FF', // border-sky-50
    card: '#BAE6FD', // border-sky-200
    text: '#082F49', // border-sky-950
    border: '#0EA5E9', // border-sky-500
    notification: '#F0F9FF', // border-sky-50
  },
};

export const useThemeStore = create<ThemeState>()((set, get) => ({
  isDark: false,
  theme: LightTheme,

  setTheme: (theme: string) => {
    set({
      isDark: theme === 'dark' ? true : false,
      theme: theme === 'dark' ? DarkTheme : LightTheme,
    });
  },

  toggleTheme: isDarkTheme => {
    set({isDark: isDarkTheme, theme: isDarkTheme ? DarkTheme : LightTheme});
  },
}));
