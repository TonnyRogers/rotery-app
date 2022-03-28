import axios from 'axios';
import * as RNLocalize from 'react-native-localize';

const base = __DEV__
  ? 'http://127.0.0.1:3333'
  : 'https://api.staging.rotery.com.br';
const timezoneName = RNLocalize.getTimeZone();

const api = axios.create({
  baseURL: base,
  headers: {
    'User-TimezoneName': timezoneName,
  },
});

export default api;
