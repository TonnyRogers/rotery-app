import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {registerRequest} from '../../store/modules/auth/actions';

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
import Alert from '../../components/Alert';
const horizontalLogo = require('../../../assets/horizontal-logo.png');

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  function navigateBack() {
    navigation.goBack();
  }

  function openAlert(message: string) {
    setAlertVisible(true);
    setAlertMessage(message);
  }

  function closeAlert() {
    setAlertVisible(false);
  }

  async function handleSubmit() {
    if (!username || !email || !password) {
      return;
    }

    dispatch(registerRequest(username, email, password));
    // openAlert(error.response.data[0].message);
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
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <Input
          icon="email-outline"
          label="Email"
          placeholder="seu e-mail"
          ref={emailRef}
          value={email}
          onChange={setEmail}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
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
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Cadastrar-se</SubmitButtonText>
        </SubmitButton>
      </Actions>
      <Alert
        visible={alertVisible}
        message={alertMessage}
        title="Eita!"
        icon="clipboard-alert-outline"
        iconColor="#3dc77b"
        onCancel={closeAlert}
        onRequestClose={closeAlert}
      />
    </Container>
  );
};

export default SignUp;
