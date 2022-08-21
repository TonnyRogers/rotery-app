/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import LottieView from 'lottie-react-native';
import {useIsAndroid} from '../../hooks/useIsAndroid';

interface AnimationContentProps {
  height: number;
  align?:
    | 'center'
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'stretch'
    | 'baseline';
  animationJson: any;
  duration?: number;
}

export function AnimationContent({
  align = 'flex-start',
  height,
  animationJson,
  duration,
}: AnimationContentProps) {
  const {isAndroid} = useIsAndroid();

  return (
    <LottieView
      source={animationJson}
      loop={false}
      autoPlay
      resizeMode="contain"
      hardwareAccelerationAndroid={!!isAndroid}
      duration={duration}
      renderMode="AUTOMATIC"
      style={{
        height: height,
        width: height,
        alignSelf: align,
        position: 'relative',
      }}
    />
  );
}
