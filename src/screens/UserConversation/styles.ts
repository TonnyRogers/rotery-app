import styled from 'styled-native-components';

export const SafeView = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View``;

export const ColumnGroup = styled.View``;

export const CardHeader = styled.View`
  margin: 1rem 0;
`;

export const BackButton = styled.TouchableOpacity`
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
`;

export const CardContent = styled.View`
  padding: 0 1rem;
`;

export const UserInfo = styled.View`
  flex-direction: row;
`;

export const UserButton = styled.View`
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

export const ConversationList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 0.5rem;
  height: 23rem;
`;

export const MessageContent = styled.View`
  background: #3dc77b;
  padding: 1rem;
  margin: 1rem 0;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

export const Message = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
`;

export const MessageDate = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  align-self: flex-end;
  margin-top: 1.8rem;
`;

export const ReplyContent = styled.View`
  background: #4885fd;
  padding: 1rem;
  margin: 1rem 0;
  border-top-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

export const MessageForm = styled.View``;

export const SendButton = styled.TouchableOpacity`
  background: #4885fd;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  padding: 1rem;
  height: 4rem;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const SendButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: 700;
  color: #fff;
`;
