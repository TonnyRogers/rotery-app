/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Platform, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';

import {Container, Content} from './styles';
import Text from '../Text';
const iconImage = require('../../../assets/animation_rotery.json');

interface SplashScreenProps {
  visible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({visible}) => {
  if (!visible) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0.4)" />
      <Container>
        <Content>
          <LottieView
            source={iconImage}
            autoPlay
            resizeMode="contain"
            autoSize
            hardwareAccelerationAndroid={!!(Platform.OS === 'android')}
            style={{alignSelf: 'center'}}
          />
          <Text.Title alignment="center">Carregando...</Text.Title>
        </Content>
      </Container>
    </>
  );
};

export default SplashScreen;
