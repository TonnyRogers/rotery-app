import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {Text, Animated, PanResponder} from 'react-native';

import {localNotification} from '../../services/notifications';

import {loginRequest} from '../../store/modules/auth/actions';
import {setLoadingFalse} from '../../store/modules/auth/actions';
import {wsSubscribeUserToNotifications} from '../../store/modules/websocket/actions';

import {
  SafeView,
  Container,
  Logo,
  Header,
  Title,
  LoginHover,
  LoginHeader,
  SwitchLoginButton,
  TipContent,
  TipText,
  RowGroup,
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
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import HighlightCarousel from '../../components/HighlightCarousel';
import GuideCarousel from '../../components/GuideCarousel';
import Ads from '../../components/Ads';

const images = [
  {
    id: 1,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/rotery-defender.jpg',
    withInfo: true,
    title: 'Versão BETA Lançada:',
    message:
      'Chegou a hora de você voar com a gente! Cadastre-se ja e nos ajude a criar um app incrivel.',
  },
  {
    id: 2,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/rotery-montanha.jpg',
    withInfo: true,
    title: 'Sobre a Rotery:',
    message:
      'Nossa missão é criar uma comunidade de aventureiros e facilitar o acesso a atividades radicais e o cuidado com a natureza.',
  },
  {
    id: 3,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/rotery-banner.jpg',
    withInfo: true,
    title: 'Nos Apoie:',
    message:
      'Queremos criar a melhor plataforma para viajantes, de forma independênte, nos apoie no APOIA-SE.',
  },
];

const guideImages = [
  {
    id: 1,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/Rotery-H.png',
    withInfo: true,
    title: 'Versão BETA Lançada:',
    message:
      'Chegou a hora de você voar com a gente! Cadastre-se ja e nos ajude a criar um app incrivel.',
  },
  {
    id: 2,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/Rotery-H.png',
    withInfo: true,
    title: 'Versão BETA Lançada:',
    message:
      'Chegou a hora de você voar com a gente! Cadastre-se ja e nos ajude a criar um app incrivel.',
  },
  {
    id: 3,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/Rotery-H.png',
    withInfo: true,
    title: 'Versão BETA Lançada:',
    message:
      'Chegou a hora de você voar com a gente! Cadastre-se ja e nos ajude a criar um app incrivel.',
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
  const emailRef = useRef() as any;
  const passwordRef = useRef() as any;
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
    dispatch(setLoadingFalse());

    if (loginVisible === true) {
      handleOpen();
    } else {
      handleDismiss();
    }
  }, [handleDismiss, handleOpen, loginVisible, dispatch]);

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
  }

  return (
    <SafeView>
      <Container>
        <Header>
          <Logo source={horizontalLogo} resizeMode="contain" />
        </Header>
        <Title>Destaques {'&'} Informações</Title>
        <HighlightCarousel data={images} />
        <TipContent>
          <Icon name="chevron-double-left" size={20} color="#4885fd" />
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
          }}>
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
              autoCapitalize="none"
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
        <Ads visible={false} onRequestClose={() => {}}>
          <GuideCarousel data={guideImages} />
        </Ads>
      </Container>
    </SafeView>
  );
};

export default Home;
