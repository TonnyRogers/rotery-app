import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const Container = styled.View`
  margin-bottom: 2rem;
  height: 6.5rem;
`;

export const TextLimitter = styled.View`
  width: 27rem;
`;

export const RowGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ListItem = styled.TouchableOpacity`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: #f2f2f2;
  padding: 1rem 0;
  flex-direction: row;
`;

export const LocationButton = styled.TouchableOpacity<{hasError: boolean}>`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) =>
    props.hasError ? theme.colors.red : theme.colors.borderBottom};
  padding: 1rem 0;
  flex-direction: row;
  justify-content: space-between;
  height: 4.4rem;
  margin: 1rem 0;
`;
