import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-native-components';

import Toast from 'react-native-toast-message';

import CodePush from 'react-native-code-push';

import './services/window';

import './config/ReactotronConfig';
import {store, persistor} from './store';
import Routes from './routes';

// LogBox.ignoreAllLogs(true);

const App = () => {
  const theme = {
    rem: 10,
    colors: {
      accent: '#11C5D9',
      background: '#141417',
      text: '#D2D2D6',
    },
    elevation: (value: number) => ({
      shadowColor: 'black',
      shadowOffset: {width: 0, height: value},
      shadowRadius: value * 2.5,
      shadowOpacity: 0.3,
      elevation: value,
      zIndex: value,
    }),
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <ThemeProvider theme={theme}>
          <Routes />
          <Toast
            ref={(ref) => Toast.setRef(ref)}
            visibilityTime={3000}
            autoHide
          />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
