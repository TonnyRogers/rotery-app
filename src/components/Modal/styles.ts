import styled from 'styled-native-components';
import {KeyboardAvoidingView as RNKAvoindingView, Platform} from 'react-native';

const shadow =
  Platform.OS === 'ios'
    ? 'box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);'
    : 'elevation: 1;';

export const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  position: absolute;
  height: 100%;
  width: 100%;
`;

export const KeyboardAvoidingView = styled(RNKAvoindingView)`
  flex: 1;
`;

export const ModalContent = styled.View.attrs({})`
  background: #fff;
  padding: 1rem;
  margin: 2rem;
  justify-content: center;
  border-radius: 0.8rem;
  ${shadow}
  margin-top: 6.5rem;
  min-height: 50rem;
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

export const Wrapper = styled.View`
  background: #445;
`;
