import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import api from '../../services/api';

import {
  Container,
  Header,
  RowGroup,
  Logo,
  Title,
  SubmitButton,
  SubmitButtonText,
  BackButton,
} from './styles';
const horizontalLogo = require('../../../assets/horizontal-logo.png');
import Input from '../../components/Input';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Keyboard} from 'react-native';

interface RecoverPasswordProps {
  navigation: {
    goBack(): void;
    navigate(route: string): void;
    canGoBack(): boolean;
  };
}

const RecoverPassword: React.FC<RecoverPasswordProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const emailRef = useRef();

  async function handleRecoverPassword() {
    if (!email) {
      return;
    }

    try {
      await api.post('/users/reset-password', {
        email,
      });
      Toast.show({
        text1: 'Instruções enviadas por e-mail.',
        position: 'bottom',
        type: 'success',
      });
      setEmail('');

      navigation.navigate('NewPassword');
    } catch (error) {
      Toast.show({
        text1: 'Erro ao solicitar recuperação.',
        position: 'bottom',
        type: 'error',
      });
    }
  }

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Container>
      <SafeAreaView style={{flex: 1}} onTouchStart={Keyboard.dismiss}>
        <Header>
          <RowGroup>
            <BackButton onPress={goBack}>
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </BackButton>
          </RowGroup>
          <Logo source={horizontalLogo} resizeMode="contain" />
          <Title>Recuperar acesso</Title>
        </Header>
        <Input
          onChange={setEmail}
          value={email}
          label="E-mail"
          placeholder="seu e-mail de acesso"
          autoCapitalize="none"
          ref={emailRef}
        />
        <SubmitButton onPress={handleRecoverPassword}>
          <SubmitButtonText>Recuperar</SubmitButtonText>
        </SubmitButton>
      </SafeAreaView>
    </Container>
  );
};

export default RecoverPassword;
