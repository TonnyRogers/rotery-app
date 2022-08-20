import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const Container = styled.View<{isFlex: boolean}>`
  ${(props) => (props.isFlex ? 'flex: 1;' : '')}
  margin-bottom: 2rem;
`;

export const Label = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: #808080;
`;

export const Field = styled.TextInput<{hasError: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #f8f8f8;
  border-radius: 0.8rem;
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) =>
    props.hasError ? theme.colors.red : theme.colors.borderBottom};
  min-height: 4rem;
  padding: 1rem;
  margin-top: 0.8rem;
`;

export const Content = styled.View``;
