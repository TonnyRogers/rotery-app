import styled from 'styled-native-components';
// import {Platform} from 'react-native';

// const metric = Platform.OS === 'ios' ? 'vh' : '%';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 1rem;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
  margin-left: 1rem;
`;

export const TitleContent = styled.View`
  flex-direction: row;
  margin: 0 1rem;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 1.8rem;
  font-weight: bold;
`;

export const CardContent = styled.View`
  flex: 1;
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
