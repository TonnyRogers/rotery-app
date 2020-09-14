import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #808080;
`;

export const Field = styled.TextInput`
  flex: 1;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #cfcfcf;
  position: relative;
`;
