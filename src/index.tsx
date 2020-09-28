import 'react-native-gesture-handler';
import React from 'react';
import {LogBox, StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import './config/ReactotronConfig';
import {store, persistor} from './store';
import Routes from './routes';

// LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <Routes />
      </PersistGate>
    </Provider>
  );
}
