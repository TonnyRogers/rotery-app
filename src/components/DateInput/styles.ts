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

export const DateButton = styled.TouchableOpacity`
  height: 4.5rem;
  border-radius: 0.4rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 0.1rem;
  border-bottom-color: ${theme.colors.borderBottom};
`;

export const DateText = styled.Text`
  font-size: 1.4rem;
  color: #909090;
`;

export const Picker = styled.View`
  background: #808080;
  padding: 1.5rem 3rem;
  margin-top: 3rem;
`;
