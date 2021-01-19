import styled from 'styled-native-components';

export const Container = styled.View`
  margin-bottom: 2rem;
`;

export const Label = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: #808080;
`;

export const Field = styled.TextInput.attrs({
  placeholderTextColor: '#808080',
})`
  flex: 1;
  color: #808080;
  height: 4.4rem;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 0.1rem;
  border-bottom-color: #cfcfcf;
  position: relative;
`;
