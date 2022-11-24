import styled from 'styled-native-components';
import {KeyboardAvoidingView as RNKAvoindingView, Platform} from 'react-native';

const shadow =
  Platform.OS === 'ios'
    ? 'box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);'
    : 'elevation: 1;';

const metricH = Platform.OS === 'ios' ? 'vh' : '%';
const metricW = Platform.OS === 'ios' ? 'vw' : '%';

export const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  position: absolute;
  height: ${'100' + metricH};
  width: ${'100' + metricW};
`;

export const KeyboardAvoidingView = styled(RNKAvoindingView)`
  flex: 1;
  justify-content: center;
`;

export const Content = styled.View.attrs({})`
  background: #fff;
  padding: 5rem;
  margin: 2rem;
  border-radius: 2rem;
  margin-top: 15rem;
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
