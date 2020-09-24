import styled from 'styled-components/native';
import {Picker} from '@react-native-community/picker';

export const Container = styled.View`
  margin-bottom: 20px;
`;

export const Content = styled.View`
  border-bottom-color: #cfcfcf;
  border-bottom-width: 1px;
`;

export const Label = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #808080;
`;

export const SPickerInput = styled(Picker)`
  color: #808080;
`;
