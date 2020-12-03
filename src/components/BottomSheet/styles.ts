import styled from 'styled-native-components';
import {Animated} from 'react-native';

export const Container = styled.View``;

export const Overlay = styled.View`
  background: rgba(0, 0, 0, 0.2);
  flex: 1;
  justify-content: flex-end;
`;

export const Content = styled(Animated.View)`
  background: #fff;
  padding-top: 1.2rem;
  border-top-right-radius: 1.2rem;
  border-top-left-radius: 1.2rem;
`;
