import axios from 'axios';
import {TOMTOM_URL} from '@env';

const tomtomApi = axios.create({
  baseURL: TOMTOM_URL,
});

export default tomtomApi;
