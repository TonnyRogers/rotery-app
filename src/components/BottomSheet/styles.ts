import styled from 'styled-native-components';
import {Animated, Platform} from 'react-native';

const metricH = Platform.OS === 'ios' ? 'vh' : '%';
const metricW = Platform.OS === 'ios' ? 'vw' : '%';

export const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  position: absolute;
  height: ${'100' + metricH};
  width: ${'100' + metricW};
`;

export const Overlay = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Content = styled(Animated.View)<{topMargin?: number}>`
  background: #fff;
  padding: 1rem;
  border-top-right-radius: 1.2rem;
  border-top-left-radius: 1.2rem;
  margin-top: ${(props) => props.topMargin || '8'}rem;
  flex: 1;
`;

export const ChildrenContent = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 5rem;
  padding: 1rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  background: rgba(61, 199, 123, 0.2);
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 1.6rem;
  font-family: 'Roboto';
  font-weight: bold;
`;
