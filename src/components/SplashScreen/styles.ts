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
  width: 100%:
`;

export const KeyboardAvoidingView = styled(RNKAvoindingView)`
  flex: 1;
  justify-content: center;
`;

export const Content = styled.View.attrs({})`
  background: #fff;
  padding: 1rem;
  margin: 2rem;
  border-radius: 0.8rem;
  ${shadow}
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
  align-self: center;
  margin-top: 25rem;
`;
