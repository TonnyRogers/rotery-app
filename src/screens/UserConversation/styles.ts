import styled from 'styled-native-components';
import {Platform} from 'react-native';

// const metric = Platform.OS === 'ios' ? 'vh' : '%';
const shadow =
  Platform.OS === 'ios'
    ? 'box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);'
    : 'elevation: 1;';

export const SafeView = styled.View`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  margin-top: 1rem;
`;

export const ColumnGroup = styled.View``;

export const RowGroup = styled.View`
  flex-direction: row;
`;

export const RowGroupSpaced = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CardHeader = styled.View`
  margin: 1rem 0;
`;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
  margin-left: 1rem;
  margin-right: 2rem;
`;

export const CardContent = styled.View`
  flex: 1;
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

export const Name = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  max-width: 20rem;
`;

export const JoinDate = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const ConversationList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 0.5rem;
  padding: 0.5rem;
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

export const ShareContent = styled.View`
  background: #fff;
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 0.8rem;
  ${shadow}
`;

export const ShareTitle = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
`;

export const ShareSubTitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
  max-width: 13rem;
`;

export const ShareAsideText = styled.Text``;

export const ShareButton = styled.TouchableOpacity`
  height: 4rem;
  width: 9rem;
  align-items: center;
  justify-content: center;
  background: #3dc77b;
  flex: 1;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  margin: 1rem 0;
  align-self: flex-end;
`;

export const ShareButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
`;
