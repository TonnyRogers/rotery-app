import React, {useState, useRef, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

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

  const numberOneRef = useRef<any>();
  const numberTwoRef = useRef<any>();
  const numberThreeRef = useRef<any>();
  const numberFourRef = useRef<any>();
  const numberFiveRef = useRef<any>();
  const numberSixRef = useRef<any>();
  const passwordRef = useRef<any>();
  const confirmPasswordRef = useRef<any>();

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  function changeCode(value: string, fieldNumber: number) {
    switch (fieldNumber) {
      case 1: {
        setNumberOne(value);
        if (value) {
          numberTwoRef.current?.focus();
        }
        break;
      }
      case 2: {
        setNumberTwo(value);
        if (!value) {
          numberOneRef.current?.focus();
        } else {
          numberThreeRef.current?.focus();
        }
        break;
      }
      case 3: {
        setNumberThree(value);
        if (!value) {
          numberTwoRef.current?.focus();
        } else {
          numberFourRef.current?.focus();
        }
        break;
      }
      case 4: {
        setNumberFour(value);
        if (!value) {
          numberThreeRef.current?.focus();
        } else {
          numberFiveRef.current?.focus();
        }
        break;
      }
      case 5: {
        setNumberFive(value);
        if (!value) {
          numberFourRef.current?.focus();
        } else {
          numberSixRef.current?.focus();
        }
        break;
      }
      case 6: {
        setNumberSix(value);
        if (!value) {
          numberFiveRef.current?.focus();
        }
        break;
      }
      default:
        break;
    }
  }

  const renderNewPasswordForm = useCallback(() => {
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

      setIsOnLoading(true);
      await api.put(`/users/reset-password/${code}`, {
        password,
        passwordConfirmation: confirmPassword,
      });

      setIsOnLoading(false);
      try {
        Toast.show({
          text1: 'Senha alterada.',
          position: 'bottom',
          type: 'success',
        });
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

    if (!isValid) {
      return null;
    }

    return (
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
    );
  }, [
    confirmPassword,
    isValid,
    numberFive,
    numberFour,
    numberOne,
    numberSix,
    numberThree,
    numberTwo,
    password,
    passwordVisible,
  ]);

  const renderCodeForm = useCallback(() => {
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

    if (isValid) {
      return null;
    }

    return (
      <>
        <Fields>
          <InputField>
            <NumberInput
              value={numberOne}
              keyboardType="number-pad"
              maxLength={1}
              ref={numberOneRef}
              onChangeText={(value) => changeCode(value, 1)}
              autoFocus
            />
          </InputField>
          <InputField>
            <NumberInput
              value={numberTwo}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(value) => changeCode(value, 2)}
              ref={numberTwoRef}
            />
          </InputField>
          <InputField>
            <NumberInput
              value={numberThree}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(value) => changeCode(value, 3)}
              ref={numberThreeRef}
            />
          </InputField>
          <InputField>
            <NumberInput
              value={numberFour}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(value) => changeCode(value, 4)}
              ref={numberFourRef}
            />
          </InputField>
          <InputField>
            <NumberInput
              value={numberFive}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(value) => changeCode(value, 5)}
              ref={numberFiveRef}
            />
          </InputField>
          <InputField>
            <NumberInput
              value={numberSix}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(value) => changeCode(value, 6)}
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
    );
  }, [
    isValid,
    numberFive,
    numberFour,
    numberOne,
    numberSix,
    numberThree,
    numberTwo,
  ]);

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
          {renderCodeForm()}
          {renderNewPasswordForm()}
        </Container>
      </DismissKeyboad>
      <SplashScreen visible={isOnLoading} />
    </Page>
  );
};

export default NewPassword;
