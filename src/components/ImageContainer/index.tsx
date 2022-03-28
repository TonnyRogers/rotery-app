import React from 'react';

import {CustomImage, HeroImage} from './styles';

interface ImageContainerProps {
  url: string;
  size?: 'small' | 'regular' | 'big';
  fit?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  sizeStyle?: 'rect' | 'square';
}

const ImageContainer = ({url, size, fit = 'cover'}: ImageContainerProps) => {
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

ImageContainer.Hero = Hero;

export default ImageContainer;
