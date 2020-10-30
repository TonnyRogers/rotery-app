import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
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
    console.tron.log('On Opened', notification);
  };

  // quando usuario faz registro no serviço de notificaçao
  onIds = (id) => {};

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
