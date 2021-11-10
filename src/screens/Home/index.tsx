/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {Animated} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {loginRequest} from '../../store/modules/auth/actions';

import {
  Container,
  Logo,
  Header,
  LoginHover,
  LoginHeader,
  SwitchLoginButton,
  TipContent,
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
import HighlightCarousel from '../../components/HighlightCarousel';
import Page from '../../components/Page';
import DismissKeyboad from '../../components/DismissKeyboad';
import {RootStateProps} from '../../store/modules/rootReducer';
import SplashScreen from '../../components/SplashScreen';
import {homeImagesCarousel} from '../../utils/constants';
import Text from '../../components/Text';

const validationSchema = yup.object().shape({
  email: yup.string().email('e-mail inválido').required('campo obrigatório'),
  password: yup.string().required('campo obrigatório'),
});

const Home: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [loginVisible, setLoginVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const {loading} = useSelector((state: RootStateProps) => state.auth);

  const emailRef = useRef() as any;
  const passwordRef = useRef() as any;
  const panY = useRef(new Animated.ValueXY({x: 0, y: 400})).current;
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});

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

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  useEffect(() => {
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

  const handleLogin = (data: any) => {
    dispatch(loginRequest(data.email, data.password));
  };

  return (
    <Page showHeader={false}>
      <Container>
        <Header>
          <Logo source={horizontalLogo} resizeMode="contain" />
        </Header>
        <Text.Title alignment="center">Destaques {'&'} Informações</Text.Title>
        <HighlightCarousel data={homeImagesCarousel} />
        <TipContent>
          <Icon name="chevron-double-left" size={26} color="#4885fd" />
          <Text.Title textColor="blue"> Arraste para ver mais</Text.Title>
        </TipContent>
        <DismissKeyboad>
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
            <Shadow
              containerViewStyle={{
                flex: 1,
                margin: 2,
              }}
              contentViewStyle={{
                flex: 1,
                backgroundColor: '#FFF',
                borderRadius: 12,
              }}
              radius={12}
              startColor="#00000009"
              finalColor="transparent"
              offset={[0, 0, 0, 0]}
              distance={5}>
              <LoginHeader>
                <SwitchLoginButton
                  onPress={() => setLoginVisible(!loginVisible)}>
                  <Icon
                    name={loginVisible ? 'chevron-down' : 'chevron-up'}
                    size={35}
                    color="#3dc77b"
                  />
                </SwitchLoginButton>
              </LoginHeader>
              <LoginContent visible={loginVisible}>
                <Input
                  label="Email"
                  placeholder="digite seu e-mail"
                  icon="email-outline"
                  onChange={(value: string) => setValue('email', value)}
                  ref={emailRef}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus()}
                  error={errors.email?.message}
                />
                <Input
                  label="Senha"
                  placeholder="digite sua senha"
                  secureTextEntry={passwordVisible}
                  ref={passwordRef}
                  onChange={(value: string) => setValue('password', value)}
                  returnKeyType="done"
                  buttonIcon
                  onClickButtonIcon={() => setPasswordVisible(!passwordVisible)}
                  onSubmitEditing={handleSubmit(handleLogin)}
                  error={errors.password?.message}
                />
                <Actions>
                  <RowGroup>
                    <LoginButton onPress={handleSubmit(handleLogin)}>
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
            </Shadow>
          </LoginHover>
        </DismissKeyboad>
      </Container>
      <SplashScreen visible={loading} />
    </Page>
  );
};

export default Home;
