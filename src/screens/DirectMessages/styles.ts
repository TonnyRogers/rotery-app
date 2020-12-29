import styled from 'styled-native-components';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ColumnGroup = styled.View``;

export const CardHeader = styled.View`
  margin: 2rem 0;
`;

export const BackButton = styled.TouchableOpacity`
  height: 2rem;
  width: 2rem;
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
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-left: 2rem;
`;

export const CardContent = styled.View``;

export const MessageList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  height: 39rem;
`;

export const UserMessage = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  height: 6rem;
  border-radius: 0.8rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
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

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const MessageButton = styled.View`
  background: #f57373;
  height: 3.2rem;
  width: 3.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  margin-left: 1rem;
`;

export const MessageButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #fff;
  font-weight: bold;
`;
