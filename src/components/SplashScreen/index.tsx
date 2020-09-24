import React from 'react';
import {Platform} from 'react-native';

import {Container, KeyboardAvoidingView, Content, Logo, Title} from './styles';
const iconImage = require('../../../assets/rotery-icon.png');

interface SplashScreenProps {
  visible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({visible}) => {
  return (
    <Container visible={visible} animationType="fade" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Content>
          <Logo source={iconImage} />
          <Title>Carregando...</Title>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SplashScreen;
