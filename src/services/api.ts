import axios from 'axios';

const api = axios.create({
  baseURL: __DEV__ ? 'http://localhost:3333' : 'https://api.rotery.com.br',
});

export default api;
