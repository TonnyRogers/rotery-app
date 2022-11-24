/* eslint-disable @typescript-eslint/no-unused-vars */
import {Middleware} from 'redux';

export const crashMiddleware: Middleware = (store) => (next) => (action) => {
  // console.tron.log('crashMiddleware');
  try {
    return next(action);
  } catch (error) {
    // console.tron.error('Caught an exception!', error);
    throw error;
  }
};
