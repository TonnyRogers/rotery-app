import React, {ReactNode} from 'react';

import {ContainerScrollView, ContainerView} from './styles';
import {Platform} from 'react-native';
import {ColorsType} from '../../utils/theme';

interface PageContainerProps {
  children: ReactNode;
  isScrollable: boolean;
  horizontal?: boolean;
  bgColor?: ColorsType;
}

export function PageContainer({
  children,
  horizontal = false,
  isScrollable,
  bgColor,
}: PageContainerProps) {
  if (!isScrollable) {
    return <ContainerView bgColor={bgColor}>{children}</ContainerView>;
  }

  return (
    <ContainerScrollView
      bgColor={bgColor}
      horizontal={horizontal}
      showsVerticalScrollIndicator={false}
      renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
      shouldRasterizeIOS={!!(Platform.OS === 'ios')}
      scrollEventThrottle={16}
      nestedScrollEnabled
      decelerationRate="normal">
      <>{children}</>
    </ContainerScrollView>
  );
}
