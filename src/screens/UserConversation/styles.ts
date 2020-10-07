import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
`;

export const ColumnGroup = styled.View``;

export const CardHeader = styled.View`
  margin: 10px 0;
`;

export const BackButton = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
`;

export const CardContent = styled.View`
  padding: 0 10px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
`;

export const UserButton = styled.View`
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

export const ConversationList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 5px;
  height: 260px;
`;

export const MessageContent = styled.View`
  background: #3dc77b;
  padding: 10px;
  margin: 10px 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const Message = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 500;
  color: #fff;
`;

export const MessageDate = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  align-self: flex-end;
  margin-top: 18px;
`;

export const ReplyContent = styled.View`
  background: #4885fd;
  padding: 10px;
  margin: 10px 0;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

export const MessageForm = styled.View``;

export const SendButton = styled.TouchableOpacity`
  background: #4885fd;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  padding: 10px;
  height: 40px;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const SendButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: 700;
  color: #fff;
`;
