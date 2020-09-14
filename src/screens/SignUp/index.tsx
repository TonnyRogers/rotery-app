import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Alert} from 'react-native';

import {
  Container,
  Fields,
  Actions,
  BackButton,
  BackButtonText,
  SubmitButton,
  SubmitButtonText,
  Header,
  Logo,
  Title,
} from './styles';
import Input from '../../components/Input';
const horizontalLogo = require('../../../assets/horizontal-logo.png');

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  function navigateBack() {
    navigation.goBack();
  }

  function handleSubmit() {
    Alert.alert('Submit!');
  }

  return (
    <Container>
      <Header>
        <Logo source={horizontalLogo} resizeMode="contain" />
        <Title>Faça parte da Rotery.</Title>
      </Header>
      <Fields>
        <Input
          icon="account-box-outline"
          label="Usuário"
          placeholder="nome de usuário"
          ref={usernameRef}
          value={username}
          onChange={setUsername}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current.focus()}
        />
        <Input
          icon="email-outline"
          label="Email"
          placeholder="seu e-mail"
          ref={emailRef}
          value={email}
          onChange={setEmail}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Input
          icon="lock-outline"
          label="Senha"
          placeholder="sua senha"
          ref={passwordRef}
          value={password}
          onChange={setPassword}
          secureTextEntry
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
      </Fields>
      <Actions>
        <BackButton onPress={navigateBack}>
          <BackButtonText>Ja sou cadastrado</BackButtonText>
        </BackButton>
        <SubmitButton>
          <SubmitButtonText>Cadastrar-se</SubmitButtonText>
        </SubmitButton>
      </Actions>
    </Container>
  );
};

export default SignUp;
