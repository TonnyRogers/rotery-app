import React, {ReactElement, ReactNode} from 'react';

import {List} from './styles';
import {Platform} from 'react-native';

interface SimpleList {
  children: ReactElement[] | ReactNode;
  isHorizontal?: boolean;
}

export function SimpleList({children, isHorizontal = false}: SimpleList) {
  return (
    <List
      renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
      shouldRasterizeIOS={!!(Platform.OS === 'ios')}
      scrollEventThrottle={16}
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={isHorizontal}
      decelerationRate="normal">
      {children}
    </List>
  );
}
