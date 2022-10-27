import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

export async function authenticate() {
  const hasPlayService = await GoogleSignin.hasPlayServices();

  if (hasPlayService) {
    try {
      const authUser = await GoogleSignin.signIn();
      return authUser;
    } catch (error) {
      Toast.show({
        text1: 'Erro ao autenticar com Google.',
        text2: 'revise os dados e tente novamente',
        position: 'bottom',
        type: 'error',
      });
    }
  }
}

export async function unauthenticate() {
  const hasPlayService = await GoogleSignin.hasPlayServices();

  if (hasPlayService) {
    GoogleSignin.signOut();
  }
}

export async function validate() {
  return await GoogleSignin.hasPlayServices();
}
