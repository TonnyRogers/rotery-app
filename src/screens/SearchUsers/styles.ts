import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

export const CardContent = styled.View`
  min-height: 460px;
`;

export const ColumnGroup = styled.View``;

export const UserList = styled.ScrollView``;

export const User = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const UserButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const UserImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 8px;
  margin-right: 5px;
  background: #eee;
`;

export const Name = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
`;

export const JoinDate = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;
