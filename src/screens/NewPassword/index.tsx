import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import {TextInput} from 'react-native';

import api from '../../services/api';
import * as RootNavigation from '../../RootNavigation';

import {
  Container,
  Header,
  Fields,
  NumberInput,
  RowGroup,
  BackButton,
  Logo,
  InputField,
  ChangePasswordForm,
  SubmitButton,
  SubmitButtonText,
} from './styles';
const horizontalLogo = require('../../../assets/horizontal-logo.png');
import Input from '../../components/Input';
import Page from '../../components/Page';
import Text from '../../components/Text';
import DismissKeyboad from '../../components/DismissKeyboad';
import SplashScreen from '../../components/SplashScreen';

interface NewPasswordProps {
  navigation: {
    navigate(route: string): void;
    canGoBack(): boolean;
    goBack(): void;
  };
}

const NewPassword: React.FC<NewPasswordProps> = ({navigation}) => {
  const [isValid, setIsValid] = useState(false);
  const [numberOne, setNumberOne] = useState('');
  const [numberTwo, setNumberTwo] = useState('');
  const [numberThree, setNumberThree] = useState('');
  const [numberFour, setNumberFour] = useState('');
  const [numberFive, setNumberFive] = useState('');
  const [numberSix, setNumberSix] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isOnLoading, setIsOnLoading] = useState(false);

  const numberOneRef = useRef<TextInput>();
  const numberTwoRef = useRef<TextInput>();
  const numberThreeRef = useRef<TextInput>();
  const numberFourRef = useRef<TextInput>();
  const numberFiveRef = useRef<TextInput>();
  const numberSixRef = useRef<TextInput>();
  const passwordRef = useRef<TextInput>();
  const confirmPasswordRef = useRef<TextInput>();

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  async function handleNewPassword() {
    const code =
      '' +
      numberOne +
      numberTwo +
      numberThree +
      numberFour +
      numberFive +
      numberSix;

    if (!password || !confirmPassword) {
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        text1: 'As senhas não são iguais.',
        position: 'bottom',
        type: 'error',
      });
      return;
    }

    try {
      setIsOnLoading(true);
      await api.put(`/users/reset-password/${code}`, {
        password,
        passwordConfirmation: confirmPassword,
      });
      Toast.show({
        text1: 'Senha alterada.',
        position: 'bottom',
        type: 'success',
      });
      setIsOnLoading(false);
      RootNavigation.replace('Home');
    } catch (error) {
      setIsOnLoading(false);
      Toast.show({
        text1: 'Erro ao alterar senha, revise.',
        position: 'bottom',
        type: 'error',
      });
    }
  }

  async function checkCode() {
    const code =
      '' +
      numberOne +
      numberTwo +
      numberThree +
      numberFour +
      numberFive +
      numberSix;

    try {
      setIsOnLoading(true);
      await api.get(`/users/reset-password/${code}`);
      setIsOnLoading(false);
      setIsValid(true);
    } catch (error) {
      setIsOnLoading(false);
      Toast.show({
        text1: 'Código inválido ou expirado.',
        text2: 'Solicite outro.',
        position: 'bottom',
        type: 'error',
      });
      setNumberOne('');
      setNumberTwo('');
      setNumberThree('');
      setNumberFour('');
      setNumberFive('');
      setNumberSix('');
    }
  }

  return (
    <Page showHeader={false}>
      <DismissKeyboad>
        <Container>
          <Header>
            <RowGroup>
              <BackButton onPress={goBack}>
                <Icon name="close" size={24} color="#3dc77b" />
              </BackButton>
            </RowGroup>
            <Logo source={horizontalLogo} resizeMode="contain" />
            <Text.Title alignment="center">Nova Senha</Text.Title>
          </Header>
          {!isValid && (
            <>
              <Fields>
                <InputField>
                  <NumberInput
                    value={numberOne}
                    keyboardType="number-pad"
                    maxLength={1}
                    ref={numberOneRef}
                    onChangeText={(value) => {
                      setNumberOne(value);
                      if (value) {
                        numberTwoRef.current?.focus();
                      }
                    }}
                    autoFocus
                  />
                </InputField>
                <InputField>
                  <NumberInput
                    value={numberTwo}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(value) => {
                      setNumberTwo(value);
                      if (value) {
                        numberThreeRef.current?.focus();
                      }
                    }}
                    onKeyPress={(e) => {
                      e.nativeEvent.key === 'Backspace' &&
                        !numberTwo &&
                        numberOneRef.current?.focus();
                    }}
                    ref={numberTwoRef}
                  />
                </InputField>
                <InputField>
                  <NumberInput
                    value={numberThree}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(value) => {
                      setNumberThree(value);
                      if (value) {
                        numberFourRef.current?.focus();
                      }
                    }}
                    onKeyPress={(e) => {
                      e.nativeEvent.key === 'Backspace' &&
                        !numberThree &&
                        numberTwoRef.current?.focus();
                    }}
                    ref={numberThreeRef}
                  />
                </InputField>
                <InputField>
                  <NumberInput
                    value={numberFour}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(value) => {
                      setNumberFour(value);
                      if (value) {
                        numberFiveRef.current?.focus();
                      }
                    }}
                    onKeyPress={(e) => {
                      e.nativeEvent.key === 'Backspace' &&
                        !numberFour &&
                        numberThreeRef.current?.focus();
                    }}
                    ref={numberFourRef}
                  />
                </InputField>
                <InputField>
                  <NumberInput
                    value={numberFive}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(value) => {
                      setNumberFive(value);
                      if (value) {
                        numberSixRef.current?.focus();
                      }
                    }}
                    onKeyPress={(e) => {
                      e.nativeEvent.key === 'Backspace' &&
                        !numberFive &&
                        numberFourRef.current?.focus();
                    }}
                    ref={numberFiveRef}
                  />
                </InputField>
                <InputField>
                  <NumberInput
                    value={numberSix}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(value) => setNumberSix(value)}
                    onKeyPress={(e) => {
                      e.nativeEvent.key === 'Backspace' &&
                        !numberSix &&
                        numberFiveRef.current?.focus();
                    }}
                    ref={numberSixRef}
                  />
                </InputField>
              </Fields>
              <Text textWeight="light">
                digite o código enviado por e-mail para alterar a senha
              </Text>
              <SubmitButton onPress={checkCode}>
                <SubmitButtonText>Enviar</SubmitButtonText>
              </SubmitButton>
            </>
          )}
          {isValid && (
            <ChangePasswordForm>
              <Input
                onChange={setPassword}
                value={password}
                label="Nova senha"
                placeholder="sua nova senha"
                buttonIcon
                onClickButtonIcon={() => setPasswordVisible(!passwordVisible)}
                secureTextEntry={passwordVisible}
                ref={passwordRef}
              />
              <Input
                onChange={setConfirmPassword}
                value={confirmPassword}
                label="Confirmar senha"
                placeholder="repita a senha"
                secureTextEntry={passwordVisible}
                ref={confirmPasswordRef}
              />
              <SubmitButton onPress={handleNewPassword}>
                <SubmitButtonText>Salvar</SubmitButtonText>
              </SubmitButton>
            </ChangePasswordForm>
          )}
        </Container>
      </DismissKeyboad>
      <SplashScreen visible={isOnLoading} />
    </Page>
  );
};

export default NewPassword;
