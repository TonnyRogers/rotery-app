import styled from 'styled-native-components';
import {KeyboardAvoidingView as RNKAvoidingView, Platform} from 'react-native';

const metricH = Platform.OS === 'ios' ? 'vh' : '%';
const metricW = Platform.OS === 'ios' ? 'vw' : '%';

export const Modal = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  height: ${'100' + metricH};
  width: ${'100' + metricW}:;
`;

export const KeyboardAvoidingView = styled(RNKAvoidingView)`
  flex: 1;
`;

export const Content = styled.View`
  background: #fff;
  min-height: 50rem;
  border-radius: 0.8rem;
  padding: 1rem;
  margin: 7rem 1rem 0 1rem;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CloseButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const ModalContent = styled.View`
  flex: 1;
  margin-bottom: 1rem;
`;

export const Actions = styled.View`
  height: 4.5rem;
  margin-bottom: 0.5rem;
  z-index: -1;
`;
