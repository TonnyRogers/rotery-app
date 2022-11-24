import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

interface NetInfoResponse {
  status: boolean | null;
  type: string;
}

const netConnection = async (): Promise<NetInfoResponse> => {
  return await NetInfo.fetch().then((state) => {
    const status = state.isConnected;
    const type = state.type;

    if (!status) {
      Toast.show({
        text1: 'Sem conexão com a internet.',
        position: 'top',
        type: 'error',
      });
    }

    return {status, type};
  });
};

export default netConnection;
