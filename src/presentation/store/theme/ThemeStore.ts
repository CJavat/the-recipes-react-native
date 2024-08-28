import {create} from 'zustand';

import type {Theme} from '@react-navigation/native';

export interface ThemeState {
  isDark: boolean;
  theme: Theme;

  toggleTheme: (isDarkTheme: boolean) => void;
}

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#075985',
    background: '#082F49',
    card: '#075985',
    text: '#FFFFFF',
    border: '#0EA5E9',
    notification: '#082F49',
  },
};

const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#075985',
    background: '#F0F9FF',
    card: '#FFFFFF',
    text: '#000000',
    border: '#0EA5E9',
    notification: '#082F49',
  },
};

export const useThemeStore = create<ThemeState>()((set, get) => ({
  isDark: false,
  theme: LightTheme,

  toggleTheme: isDarkTheme => {
    set({isDark: isDarkTheme, theme: isDarkTheme ? DarkTheme : LightTheme});
  },
}));
