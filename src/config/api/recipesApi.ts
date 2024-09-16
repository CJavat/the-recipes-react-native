import {Platform} from 'react-native';
import axios from 'axios';

import {API_URL_ANDROID, API_URL_IOS, PROD_URL, STAGE} from '@env';
import {StorageAdapter} from '../adapter/storage.adapter';

export const API_URL =
  STAGE === 'production'
    ? PROD_URL
    : Platform.OS === 'android'
    ? API_URL_ANDROID
    : API_URL_IOS;

const recipesApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//! Interceptors
recipesApi.interceptors.request.use(async config => {
  const token = await StorageAdapter.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export {recipesApi};
