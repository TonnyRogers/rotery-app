import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-native-components';
import './services/window';

import './config/ReactotronConfig';
import {store, persistor} from './store';
import Routes from './routes';
import CodePush from 'react-native-code-push';

// LogBox.ignoreAllLogs(true);

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {}

  // disparada quando app esta aberto
  onReceived = (data) => {};

  // disparada quando clicar numa notificação
  onOpened = (notification: any) => {
    // console.tron.log('On Opened', notification);
  };

  // quando usuario faz registro no serviço de notificaçao
  onIds = (id) => {};

  render() {
    const theme = {
      rem: 10,
      colors: {
        accent: '#11C5D9',
        background: '#141417',
        text: '#D2D2D6',
      },
      elevation: (value) => ({
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
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
