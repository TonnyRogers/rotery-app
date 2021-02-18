import axios from 'axios';

const base = __DEV__ ? 'http://127.0.0.1:3333' : 'https://api.rotery.com.br';

const api = axios.create({
  baseURL: 'https://api.rotery.com.br',
});

export default api;
