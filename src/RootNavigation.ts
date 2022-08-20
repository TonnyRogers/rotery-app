import React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef() as any;

export function navigate<T>(name: string, params?: T) {
  navigationRef.current?.navigate(name, params);
}

export function replace<T>(name: string, params?: T) {
  navigationRef.current?.dispatch(StackActions.replace(name, params as {}));
}

export function goBack() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack();
  }
}
