import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const Container = styled.View`
  margin-bottom: 2rem;
`;

export const Label = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: #808080;
`;

export const Field = styled.TextInput`
  flex: 1;
  color: #808080;
  height: 4.4rem;
`;

export const Content = styled.View<{hasError: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 0.1rem;
  border-bottom-color: ${(props) =>
    props.hasError ? theme.colors.red : '#cfcfcf'};
  position: relative;
`;

export const ButtonIcon = styled.TouchableOpacity`
  height: 3rem;
  width: 3rem;
`;
