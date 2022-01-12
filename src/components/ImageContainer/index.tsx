import React from 'react';

import {CustomImage, HeroImage} from './styles';

interface ImageContainerProps {
  url: string;
  size?: 'small' | 'regular' | 'big';
}

const ImageContainer = ({url, size}: ImageContainerProps) => {
  let imageSize = 0;

  switch (size) {
    case 'small':
      imageSize = 4;
      break;

    case 'regular':
      imageSize = 7;
      break;

    case 'big':
      imageSize = 9;
      break;

    default:
      imageSize = 5;
      break;
  }

  return (
    <CustomImage
      size={imageSize}
      source={{
        uri: url || undefined,
      }}
      resizeMode="cover"
    />
  );
};

const Hero = ({url}: ImageContainerProps) => {
  return (
    <HeroImage
      source={{
        uri: url || undefined,
      }}
      resizeMode="cover"
    />
  );
};

ImageContainer.Hero = Hero;

export default ImageContainer;
