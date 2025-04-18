import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import api from '../../services/api';

import {
  Container,
  Header,
  RowGroup,
  Logo,
  SubmitButton,
  SubmitButtonText,
  BackButton,
} from './styles';
const horizontalLogo = require('../../../assets/horizontal-logo.png');
import Input from '../../components/Input';
import Page from '../../components/Page';
import Text from '../../components/Text';
import DismissKeyboad from '../../components/DismissKeyboad';
import SplashScreen from '../../components/SplashScreen';

interface RecoverPasswordProps {
  navigation: {
    goBack(): void;
    navigate(route: string): void;
    canGoBack(): boolean;
  };
}

const RecoverPassword: React.FC<RecoverPasswordProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isOnLoading, setIsOnLoading] = useState(false);
  const emailRef = useRef<any>();

  async function handleRecoverPassword() {
    if (!email) {
      return;
    }

    try {
      setIsOnLoading(true);
      await api.post('/users/reset-password', {
        email,
      });
      Toast.show({
        text1: 'Instruções enviadas por e-mail.',
        position: 'bottom',
        type: 'success',
      });
      setEmail('');

      setIsOnLoading(false);
      navigation.navigate('NewPassword');
    } catch (error) {
      setIsOnLoading(false);
      Toast.show({
        text1: 'Erro ao solicitar recuperação.',
        position: 'bottom',
        type: 'error',
      });
    }
  }

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Page showHeader={false}>
      <DismissKeyboad>
        <Container>
          <Header>
            <RowGroup>
              <BackButton onPress={goBack}>
                <Icon name="chevron-left" size={24} color="#3dc77b" />
              </BackButton>
            </RowGroup>
            <Logo source={horizontalLogo} resizeMode="contain" />
            <Text.Title alignment="center">Recuperar acesso</Text.Title>
          </Header>
          <Input
            onChange={setEmail}
            value={email}
            label="E-mail"
            placeholder="seu e-mail de acesso"
            autoCapitalize="none"
            ref={emailRef}
          />
          <SubmitButton onPress={handleRecoverPassword}>
            <SubmitButtonText>Recuperar</SubmitButtonText>
          </SubmitButton>
        </Container>
      </DismissKeyboad>
      <SplashScreen visible={isOnLoading} />
    </Page>
  );
};

export default RecoverPassword;
