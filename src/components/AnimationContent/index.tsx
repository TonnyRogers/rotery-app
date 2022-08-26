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
  loop?: boolean;
}

export function AnimationContent({
  align = 'flex-start',
  height,
  animationJson,
  duration,
  loop = true,
}: AnimationContentProps) {
  const {isAndroid} = useIsAndroid();

  return (
    <LottieView
      source={animationJson}
      loop={loop}
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
