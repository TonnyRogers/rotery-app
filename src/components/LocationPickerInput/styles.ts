import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const Container = styled.View`
  flex: 1;
  margin-bottom: 2rem;
`;

export const TextLimitter = styled.View`
  width: 28rem;
`;

export const ListItem = styled.TouchableOpacity`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f2;
  padding: 1rem 0;
  flex-direction: row;
`;

export const LocationButton = styled.TouchableOpacity<{hasError: boolean}>`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.hasError ? theme.colors.red : theme.colors.borderBottom};
  padding: 1rem 0;
  flex-direction: row;
  justify-content: space-between;
`;
