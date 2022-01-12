import React from 'react';
import {StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef() as any;

export function navigate<T>(name: string, params?: T) {
  navigationRef.current?.navigate(name, params);
}

export function replace(name: string, params: any = {}) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

export function goBack() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack();
  }
}
