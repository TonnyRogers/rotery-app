import axios from 'axios';
import * as RNLocalize from 'react-native-localize';

export const apiBaseUrl = __DEV__
  ? '127.0.0.1:3333'
  : 'api.staging.rotery.com.br';

const httpType = __DEV__ ? 'http://' : 'https://';

const timezoneName = RNLocalize.getTimeZone();

const api = axios.create({
  baseURL: `${httpType}${apiBaseUrl}`,
  headers: {
    'User-TimezoneName': timezoneName,
  },
});

export default api;
