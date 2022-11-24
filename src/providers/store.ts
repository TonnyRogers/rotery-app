import {configureStore, combineReducers, Action} from '@reduxjs/toolkit';

import * as reducers from '../store2';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk, {ThunkAction} from 'redux-thunk';
import reactotron from '../config/ReactotronConfig';
import {crashMiddleware} from '../middlewares/crashMiddleware';
import {loggerMiddleware} from '../middlewares/loggerMiddleware';
import {chatMiddleware} from '../middlewares/chatMiddleware';

const persisConfig = {
  key: '9344f8941ea861b246189658d327c7f2',
  storage: AsyncStorage,
  whitelist: [
    'auth',
    'bankAccount',
    'chats',
    'checkout',
    'contents',
    'connections',
    'guides',
    'messages',
    'notifications',
    'options',
    'profile',
    'subscription',
  ],
};

const rootReducer = combineReducers(reducers);

const persistedReducer = persistReducer(persisConfig, rootReducer);

const tronEnhancer = reactotron.createEnhancer && reactotron.createEnhancer();

export const store = configureStore({
  devTools: __DEV__,
  reducer: persistedReducer,
  middleware: [thunk, crashMiddleware, loggerMiddleware, chatMiddleware],
  enhancers: [tronEnhancer as any],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
