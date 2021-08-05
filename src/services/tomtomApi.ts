import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tomtom.com/search/2/search/',
});

export default api;
