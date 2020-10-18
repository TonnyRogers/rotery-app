import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {Text, Animated, PanResponder} from 'react-native';

import {loginRequest} from '../../store/modules/auth/actions';

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

const images = [
  {
    id: 1,
    url:
      'https://nerdymates.com/static/img/regular/shutterstock_1044339595.jpg',
  },
  {
    id: 2,
    url: 'https://youmatter.world/app/uploads/sites/2/2019/11/travel-world.jpg',
  },
  {
    id: 3,
    url:
      'https://cdn.businesstraveller.com/wp-content/uploads/fly-images/985033/Column-Travel-916x516.jpg',
  },
];

const Home: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loginVisible, setLoginVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const panY = useRef(new Animated.ValueXY({x: 0, y: 400})).current;

  const handleOpen = useCallback(() => {
    Animated.timing(panY.y, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [panY.y]);

  const handleDismiss = useCallback(() => {
    Animated.timing(panY.y, {
      toValue: 400,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setLoginVisible(false);
  }, [panY.y]);

  const panRespoders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (e, gs) => {
        if (gs.dy > 0) {
          panY.setValue({x: 0, y: gs.dy});
        }
      },
      onPanResponderRelease: (e, gs) => {
        if (gs.dy > 0 && gs.vy > 1) {
          return handleDismiss();
        }
        Animated.spring(panY.y, {
          toValue: 400,
          bounciness: 3,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  useEffect(() => {
    if (loginVisible === true) {
      handleOpen();
    } else {
      handleDismiss();
    }
  }, [handleDismiss, handleOpen, loginVisible]);

  function signUpNavigate() {
    setLoginVisible(false);
    navigation.navigate('SignUp');
  }

  function passwordRecover() {
    setLoginVisible(false);
    navigation.navigate('RecoverPassword');
  }

  function openAlert(message: string) {
    setAlertVisible(true);
    setAlertMessage(message);
  }

  function closeAlert() {
    setAlertVisible(false);
    setAlertMessage('');
  }

  async function handleLogin() {
    if (!email || !password) {
      return;
    }
    dispatch(loginRequest(email, password));
    // openAlert('Email ou senha incorreto.');
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
      <LoginHover
        visible={loginVisible}
        style={{
          transform: [
            {
              translateY: panY.y.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, 0, 1],
              }),
            },
          ],
        }}
        {...panRespoders.panHandlers}>
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
            onSubmitEditing={() => passwordRef.current?.focus()}
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
            onSubmitEditing={() => handleLogin()}
          />
          <Actions>
            <RowGroup>
              <LoginButton onPress={() => handleLogin()}>
                <LoginButtonText>Logar</LoginButtonText>
              </LoginButton>
              <ForgotPasswordButton onPress={() => passwordRecover()}>
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
