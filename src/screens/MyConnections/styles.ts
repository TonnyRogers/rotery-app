import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

export const CardContent = styled.View``;

export const ColumnGroup = styled.View``;

export const ConnectionList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 400px;
`;

export const User = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
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

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

export const AcceptButton = styled.TouchableOpacity`
  background: #3dc77b;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 10px;
`;

export const RejectButton = styled.TouchableOpacity`
  background: #f57373;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-left: 10px;
`;

export const MessageButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-left: 10px;
`;

export const ConnectionFeedback = styled.View`
  background: #4885fd;
  height: 32px;
  width: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const FeedbackText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const Divider = styled.View`
  height: 3px;
  background: #eee;
  margin: 10px 0;
`;
