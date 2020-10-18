import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
import {Alert} from 'react-native';

interface RecoverPasswordProps {
  navigation: {
    goBack(): void;
    navigate(route: string): void;
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

      Alert.alert('Instruções de recuperação enviadas por e-mail');
      setEmail('');

      navigation.navigate('NewPassword');
    } catch (error) {
      Alert.alert('Erro ao solicitar recuperação');
    }
  }

  return (
    <Container>
      <Header>
        <RowGroup>
          <BackButton onPress={() => navigation.goBack()}>
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
        ref={emailRef}
      />
      <SubmitButton onPress={handleRecoverPassword}>
        <SubmitButtonText>Recuperar</SubmitButtonText>
      </SubmitButton>
    </Container>
  );
};

export default RecoverPassword;
