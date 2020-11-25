import React from 'react';

import {Container, Background, Info, LottieViewCustom} from './styles';

interface GuideItemProps {
  background: string;
  animation: boolean;
}

const GuideItem: React.FC<GuideItemProps> = ({
  background,
  animation,
  children,
}) => {
  return (
    <Container>
      {animation ? (
        <LottieViewCustom source={background} autoPlay resizeMode="contain" />
      ) : (
        <Background
          source={{
            uri: background,
          }}
          resizeMode="contain"
        />
      )}
      <Info>{children}</Info>
    </Container>
  );
};

export default GuideItem;
