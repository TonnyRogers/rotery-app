import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Container = styled.View``;

export const Overlay = styled.View`
  background: rgba(0, 0, 0, 0.2);
  flex: 1;
  justify-content: flex-end;
`;

export const Content = styled(Animated.View)`
  background: #fff;
  padding-top: 12px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;
