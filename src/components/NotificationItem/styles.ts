import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  elevation: 3;
  min-height: 60px;
  margin: 8px;
  border-radius: 8px;
  padding: 5px 8px;
`;

export const ColumGroup = styled.View``;

export const Subject = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
`;

export const Type = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;

export const RowGroup = styled.View`
  flex-direction: row;
`;

export const DateText = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
`;

export const NotificationButton = styled.View`
  width: 32px;
  height: 32px;
  background: #4885fd;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
  margin-left: 5px;
  justify-content: center;
`;
