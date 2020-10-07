import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import './services/window';

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
