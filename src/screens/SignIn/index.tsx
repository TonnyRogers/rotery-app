/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useCallback, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Animated, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {loginRequest} from '../../store/modules/auth/actions';

import {
  Container,
  Logo,
  Header,
  TipContent,
  RowGroup,
  LoginContent,
  Actions,
  LoginButton,
  LoginButtonText,
  ForgotPasswordButton,
  ForgotPasswordButtonText,
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
import Button from '../../components/Button';
import RowGroupComponent from '../../components/RowGroup';
import BottomSheet from '../../components/BottomSheet';
import {YupValidationMessages} from '../../utils/enums';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('e-mail inválido')
    .required(YupValidationMessages.REQUIRED),
  password: yup.string().required(YupValidationMessages.REQUIRED),
});

const SignIn: React.FC = () => {
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
          <Text textColor="green" textWeight="bold">
            Arraste para ver mais
          </Text>
        </TipContent>
        <RowGroupComponent justify="center" isFlex={false}>
          <Button
            onPress={() => setLoginVisible(true)}
            bgColor="blue"
            textColor="white"
            sizeMargin="0 1rem 0 1rem"
            isEnabled>
            Fazer Login
          </Button>
          <Button
            onPress={signUpNavigate}
            bgColor="transparent"
            textColor="green"
            sizeMargin="0 1rem 1.6rem 0rem"
            isEnabled
            hasShadow={false}>
            <Text.Paragraph textColor="blue">Criar nova conta</Text.Paragraph>
          </Button>
        </RowGroupComponent>
      </Container>
      <BottomSheet
        topMargin={8}
        visible={loginVisible}
        onRequestClose={() => setLoginVisible(false)}
        title="Login 🚀">
        <LoginContent>
          <DismissKeyboad>
            <View style={{height: 200}}>
              <Input
                label="Email"
                placeholder="digite seu e-mail"
                icon="email-outline"
                onChange={(value: string) =>
                  setValue('email', value.trim().toLocaleLowerCase())
                }
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
            </View>
          </DismissKeyboad>
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
          </Actions>
        </LoginContent>
      </BottomSheet>
      <SplashScreen visible={loading} />
    </Page>
  );
};

export default SignIn;
