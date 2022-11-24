/* eslint-disable react-native/no-inline-styles */
import React, {ReactElement} from 'react';

import {
  CustomImage,
  HeroImage,
  OverlayedContainer,
  OverlayedTouchableContainer,
  BackgroundOverlay,
  OverlayedImage,
  OverlayedTextContainer,
} from './styles';
import {View} from 'react-native';

interface ImageContainerProps {
  url: string;
  size?: 'small' | 'regular' | 'big';
  fit?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  sizeStyle?: 'rect' | 'square';
}

interface OverlayedProps extends Pick<ImageContainerProps, 'url'> {
  children: ReactElement;
  height?: number;
  width?: number;
  isTouchable?: boolean;
  blurLevel?: number;
}

const ImageContainer = ({url, size, fit = 'cover'}: ImageContainerProps) => {
  let imageSize = 0;

  const sizes = {
    small: 4,
    regular: 7,
    big: 9,
    default: 5,
  };

  if (!size) {
    imageSize = sizes.default;
  } else {
    imageSize = sizes[size];
  }

  return (
    <CustomImage
      size={imageSize}
      source={{
        uri: url || undefined,
      }}
      resizeMode={fit}
    />
  );
};

const Hero = ({
  url,
  fit = 'cover',
  sizeStyle = 'rect',
}: ImageContainerProps) => {
  return (
    <HeroImage
      source={{
        uri: url || undefined,
      }}
      sizeStyle={sizeStyle}
      resizeMode={fit}
    />
  );
};

const Overlayed = ({
  children,
  url,
  height,
  width,
  isTouchable,
  blurLevel,
}: OverlayedProps) => {
  if (!isTouchable) {
    return (
      <View style={{height, width, marginVertical: 8}}>
        <OverlayedContainer>
          <OverlayedImage source={{uri: url}} blurRadius={blurLevel} />
          <BackgroundOverlay />
          <OverlayedTextContainer>{children}</OverlayedTextContainer>
        </OverlayedContainer>
      </View>
    );
  }

  return (
    <View style={{height, width, marginVertical: 8}}>
      <OverlayedTouchableContainer>
        <OverlayedImage source={{uri: url}} blurRadius={blurLevel} />
        <BackgroundOverlay />
        <OverlayedTextContainer>{children}</OverlayedTextContainer>
      </OverlayedTouchableContainer>
    </View>
  );
};

ImageContainer.Hero = Hero;
ImageContainer.Overlayed = Overlayed;

export default ImageContainer;
