import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ColumnGroup = styled.View``;

export const CardHeader = styled.View`
  margin: 20px 0;
`;

export const BackButton = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
  align-items: center;
  justify-content: center;
`;

export const TitleContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-left: 20px;
`;

export const CardContent = styled.View``;

export const MessageList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 390px;
`;

export const UserMessage = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  border-radius: 8px;
  padding: 5px;
  margin-bottom: 10px;
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

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

export const MessageButton = styled.View`
  background: #f57373;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-left: 10px;
`;

export const MessageButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #fff;
  font-weight: bold;
`;
