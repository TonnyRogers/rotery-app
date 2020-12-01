import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.rotery.com.br',
});

export default api;
