import React from 'react';
import {Platform, View} from 'react-native';
import LottieView from 'lottie-react-native';

import {Container, KeyboardAvoidingView, Content, Title} from './styles';
const iconImage = require('../../../assets/animation_rotery.json');

interface SplashScreenProps {
  visible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({visible}) => {
  return (
    <Container visible={visible} animationType="fade" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Content>
          <LottieView source={iconImage} autoPlay />
          <Title>Carregando...</Title>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SplashScreen;
