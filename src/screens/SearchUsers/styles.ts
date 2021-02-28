import styled from 'styled-native-components';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1rem;
`;

export const CardContent = styled.View`
  min-height: 46rem;
`;

export const ColumnGroup = styled.View``;

export const UserList = styled.ScrollView`
  flex: 1;
`;

export const User = styled.View`
  flex-direction: row;
  margin-bottom: 1rem;
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
