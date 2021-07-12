import styled from 'styled-native-components';
import {
  Animated,
  KeyboardAvoidingView as RNKAvoindingView,
  Platform,
} from 'react-native';

const metricHeight = Platform.OS === 'ios' ? 'vh' : '%';
const metricWidth = Platform.OS === 'ios' ? 'vw' : '%';

export const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  position: absolute;
  height: ${'100' + metricHeight};
  width: ${'100' + metricWidth}:;
`;

export const KeyboardAvoidingView = styled(RNKAvoindingView)`
  flex: 1;
  justify-content: flex-end;
`;

export const Content = styled(Animated.View)`
  flex: 1;
  background: #fff;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  padding: 1rem 1rem;
  margin-top: 7.5rem;
  z-index: 101;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  background: #123;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  margin-left: 0.5rem;
`;

export const CloseButton = styled.TouchableOpacity`
  background: transparent;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.8rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const ImageItem = styled(Animated.Image)`
  height: 51.4rem;
  border-radius: 1rem;
`;
