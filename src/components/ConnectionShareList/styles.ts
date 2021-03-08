import styled from 'styled-native-components';

export const ConnectionList = styled.ScrollView``;

export const ColumnGroup = styled.View``;

export const User = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const UserInfo = styled.View`
  flex-direction: row;
`;

export const UserButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const UserImage = styled.Image`
  height: 5rem;
  width: 5rem;
  border-radius: 0.8rem;
  margin-right: 0.5rem;
  background: #eee;
`;

export const Name = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
`;

export const JoinDate = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const ShareButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 3.2rem;
  width: 3.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  margin-right: 1rem;
`;
