import styled from 'styled-native-components';
import {Modal, KeyboardAvoidingView as RNKAvoindingView} from 'react-native';

export const Container = styled(Modal)``;

export const KeyboardAvoidingView = styled(RNKAvoindingView)`
  background: rgba(0, 0, 0, 0.8);
  flex: 1;
  justify-content: center;
`;

export const Content = styled.View.attrs({})`
  background: #fff;
  min-height: 30rem;
  padding: 1rem;
  margin: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  elevation: 3;
`;

export const Logo = styled.Image`
  height: 13rem;
  width: 13rem;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  margin-top: 21rem;
`;
