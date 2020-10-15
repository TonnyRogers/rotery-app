import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView``;

export const CardHeader = styled.View``;

export const BackButton = styled.TouchableOpacity``;

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
  height: 114px;
  width: 114px;
  border-radius: 8px;
  background: #f8f8f8;
  border-color: #cfcfcf;
  border-width: 1px;
`;

export const ChangeAvatarButton = styled.TouchableOpacity`
  height: 31px;
  width: 114px;
  background: #3e44c7;
  border-radius: 8px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const ChangeAvatarButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #fff;
`;

export const UserName = styled.Text`
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: bold;
`;

export const Reputation = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

export const Joined = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  color: #4885fd;
`;

export const ItineraryName = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
`;

export const ItineraryLocation = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;

export const ItineraryDate = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;

export const SubmitButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-direction: row;
  margin: 10px;
`;

export const SubmitButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
