import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';

import {
  Container,
  Logo,
  Header,
  HighlightList,
  Title,
  LoginHover,
  LoginHeader,
  SwitchLoginButton,
  TipContent,
  TipText,
  HighlightContent,
  ItineraryName,
  RowGroup,
  ItineraryLocation,
  ItineraryDate,
  LoginContent,
  Actions,
  LoginButton,
  LoginButtonText,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
  RegisterContent,
  RegisterText,
  RegisterButton,
  RegisterButtonText,
} from './styles';
const horizontalLogo = require('../../../assets/horizontal-logo.png');
import Highlight from '../../components/Highlight';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import {Text} from 'react-native';

const Home: React.FC = () => {
  const navigation = useNavigation();
  const [loginVisible, setLoginVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();

  function signUpNavigate() {
    setLoginVisible(false);
    navigation.navigate('SignUp');
  }

  function openAlert(message: string) {
    setAlertVisible(true);
    setAlertMessage(message);
  }

  function closeAlert() {
    setAlertVisible(false);
    setAlertMessage('');
  }

  function handleSubmit() {
    async function logUser() {
      try {
        const response = await api.post('/sessions', {
          email,
          password,
        });

        const {token} = response.data;

        if (token) {
          setEmail('');
          setPassword('');
          setLoginVisible(false);
          navigation.navigate('Dashboard');
        }
      } catch (error) {
        openAlert('Email ou senha incorreto.');
      }
    }

    if (!email || !password) {
      return;
    }
    logUser();
  }

  return (
    <Container>
      <Header>
        <Logo source={horizontalLogo} resizeMode="contain" />
      </Header>
      <Title>Destaques {'&'} Informações</Title>
      <HighlightList>
        <Highlight background="https://nerdymates.com/static/img/regular/shutterstock_1044339595.jpg">
          <HighlightContent>
            <ItineraryName>Trilha da pedra Furada</ItineraryName>
            <RowGroup>
              <ItineraryLocation>São Paulo - SP</ItineraryLocation>
              <ItineraryDate>16 Maio 2020 16:00</ItineraryDate>
            </RowGroup>
          </HighlightContent>
        </Highlight>
        <Highlight background="https://youmatter.world/app/uploads/sites/2/2019/11/travel-world.jpg" />
        <Highlight background="https://cdn.businesstraveller.com/wp-content/uploads/fly-images/985033/Column-Travel-916x516.jpg" />
      </HighlightList>
      <TipContent>
        <Icon name="chevron-double-left" size={24} color="#4885fd" />
        <TipText> Arraste para ver mais</TipText>
      </TipContent>
      <LoginHover visible={loginVisible}>
        <LoginHeader>
          <SwitchLoginButton onPress={() => setLoginVisible(!loginVisible)}>
            <Icon
              name={loginVisible ? 'chevron-down' : 'chevron-up'}
              size={30}
              color="#3dc77b"
            />
          </SwitchLoginButton>
        </LoginHeader>
        <LoginContent visible={loginVisible}>
          <Input
            value={email}
            label="Email"
            placeholder="digite seu e-mail"
            icon="email-outline"
            onChange={setEmail}
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            value={password}
            label="Senha"
            placeholder="digite sua senha"
            icon="lock-outline"
            onChange={setPassword}
            secureTextEntry
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={() => handleSubmit()}
          />
          <Actions>
            <RowGroup>
              <LoginButton onPress={() => handleSubmit()}>
                <LoginButtonText>Logar</LoginButtonText>
              </LoginButton>
              <ForgotPasswordButton>
                <ForgotPasswordButtonText>
                  Esqueceu a senha?
                </ForgotPasswordButtonText>
              </ForgotPasswordButton>
            </RowGroup>
            <RegisterContent>
              <RegisterText>Não tem uma conta?</RegisterText>
              <RegisterButton onPress={signUpNavigate}>
                <RegisterButtonText>Cadastre-se</RegisterButtonText>
              </RegisterButton>
            </RegisterContent>
          </Actions>
        </LoginContent>
      </LoginHover>
      <Alert
        icon="clipboard-alert-outline"
        iconColor="#3dc77b"
        visible={alertVisible}
        title="Eita!"
        message={alertMessage}
        onCancel={closeAlert}
        onRequestClose={() => closeAlert}>
        <Text>{alertMessage}</Text>
      </Alert>
    </Container>
  );
};

export default Home;
