import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

export const MessageCounter = styled.View`
  height: 3.2rem;
  width: 3.2rem;
  border-radius: 0.8rem;
  background-color: ${theme.colors.red};
  align-items: center;
  justify-content: center;
`;

export const ChatButton = styled.TouchableOpacity`
  height: 9rem;
  margin: 0.3rem 0;
`;
