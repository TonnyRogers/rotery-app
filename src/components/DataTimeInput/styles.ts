import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 20px;
`;

export const Label = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #808080;
`;

export const DateButton = styled.TouchableOpacity`
  height: 45px;
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #cfcfcf;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #909090;
`;

export const Picker = styled.View`
  background: #808080;
  padding: 15px 30px;
  margin-top: 30px;
`;
