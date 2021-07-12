import styled from 'styled-native-components';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.ScrollView``;

export const CardHeader = styled.View``;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const CardContent = styled.View``;

export const ColumnGroup = styled.View`
  align-items: center;
`;

export const RowGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const User = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.Image`
  height: 11.4rem;
  width: 11.4rem;
  border-radius: 0.8rem;
  background: #f8f8f8;
  border-color: #cfcfcf;
  border-width: 0.1rem;
`;

export const ChangeAvatarButton = styled.TouchableOpacity`
  height: 3.1rem;
  width: 11.4rem;
  background: #3e44c7;
  border-radius: 0.8rem;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
`;

export const ChangeAvatarButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #fff;
`;

export const UserName = styled.Text`
  font-family: 'Roboto';
  font-size: 2.4rem;
  font-weight: bold;
`;

export const Reputation = styled.View`
  flex-direction: row;
  margin-bottom: 1.5rem;
`;

export const Joined = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  color: #4885fd;
`;

export const ItineraryName = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
`;

export const ItineraryLocation = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const ItineraryDate = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const SubmitButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 4.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  flex-direction: row;
  margin: 1rem;
`;

export const SubmitButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
`;
