import {Middleware} from 'redux';

export const loggerMiddleware: Middleware = (store) => {
  return (next) => {
    return (action) => {
      // console.tron.log('dispatching', action);
      const result = next(action);
      // console.tron.log('next state', store.getState());
      return result;
    };
  };
};
