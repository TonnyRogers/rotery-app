import styled from 'styled-native-components';
import {KeyboardAvoidingView as RNKAvoindingView, Platform} from 'react-native';

const metricHeight = Platform.OS === 'ios' ? 'vh' : '%';
const metricWidth = Platform.OS === 'ios' ? 'vw' : '%';

export const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  position: absolute;
  height: ${'100' + metricHeight};
  width: ${'100' + metricWidth};
`;

export const KeyboardAvoidingView = styled(RNKAvoindingView)`
  flex: 1;
`;

export const ModalContent = styled.View.attrs({})`
  flex: 1;
  min-height: ${'70' + metricHeight};
  background: #fff;
  padding: 1rem;
  margin: 2rem;
  border-radius: 0.8rem;
  margin-top: 8rem;
`;

export const Logo = styled.Image`
  height: 13rem;
  width: 13rem;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
`;

export const CloseButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  background: rgba(61, 199, 123, 0.2);
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ModalContentWrapper = styled.View`
  flex: 1;
  background: #445;
`;
