import AsyncStorage from '@react-native-community/async-storage';
import {persistReducer} from 'redux-persist';

export default (reducers: any) => {
  const persistedReducer = persistReducer(
    {
      key: '9344f8941ea861b246189658d327c7f2',
      storage: AsyncStorage,
      whitelist: ['auth', 'profile', 'itineraries', 'options'],
    },
    reducers,
  );

  return persistedReducer;
};
