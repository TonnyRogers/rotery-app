import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-native-components';
import SplashScreen from 'react-native-splash-screen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import Toast from 'react-native-toast-message';

import CodePush from 'react-native-code-push';

import './config/ReactotronConfig';
import {store, persistor} from './providers/store';
import Routes from './routes';
import {GlobalContext} from './context';
import {Loading} from './components/Loading';
import {GAUTH_IOS, GAUTH_WEB} from '@env';
import {injectStore} from './providers/api';
injectStore(store);

if (__DEV__) {
  LogBox.ignoreLogs(['new NativeEventEmitter', 'Require cycle:']);
}

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

  GoogleSignin.configure({
    iosClientId: GAUTH_IOS,
    webClientId: GAUTH_WEB,
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <ThemeProvider theme={theme}>
          <GlobalContext>
            <Routes />
            <Toast
              ref={(ref) => Toast.setRef(ref)}
              visibilityTime={3000}
              autoHide
            />
            <Loading />
          </GlobalContext>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
