import styled from 'styled-native-components';
import {Animated, Platform} from 'react-native';

const metric = Platform.OS === 'ios' ? 'vh' : '%';

export const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  position: absolute;
  height: 100${metric};
  width: 100%:
`;

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
