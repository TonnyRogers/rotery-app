import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
// import reactotronSaga from 'reactotron-redux-saga';

declare global {
  interface Console {
    tron: any;
  }
}

interface PluginConfig {
  except?: string[];
}

const tron = Reactotron.configure()
  .useReactNative()
  .use(reactotronRedux())
  .connect();

if (__DEV__) {
  tron.clear!();

  console.tron = tron;
}

export default tron;
