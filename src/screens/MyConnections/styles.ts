import styled from 'styled-native-components';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 1.8rem;
  font-weight: bold;
  margin-left: 1rem;
`;

export const CardContent = styled.View`
  min-height: 46rem;
`;

export const ColumnGroup = styled.View``;

export const ConnectionList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const User = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const UserInfo = styled.View`
  flex-direction: row;
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

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

export const AcceptButton = styled.TouchableOpacity`
  background: #3dc77b;
  height: 3.2rem;
  width: 3.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  margin-right: 1rem;
`;

export const RejectButton = styled.TouchableOpacity`
  background: #f57373;
  height: 3.2rem;
  width: 3.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  margin-left: 1rem;
`;

export const MessageButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 3.2rem;
  width: 3.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  margin-left: 1rem;
`;

export const ConnectionFeedback = styled.View`
  background: #4885fd;
  height: 3.2rem;
  width: 10rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
`;

export const FeedbackText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
`;

export const Divider = styled.View`
  height: 0.3rem;
  background: #eee;
  margin: 1rem 0;
`;
