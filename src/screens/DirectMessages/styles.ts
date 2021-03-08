import styled from 'styled-native-components';
import {Platform} from 'react-native';

const metric = Platform.OS === 'ios' ? 'vh' : '%';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 6.5rem;
`;

export const ColumnGroup = styled.View``;

export const CardHeader = styled.View`
  flex-direction: row;
  padding: 0 1rem;
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
  margin-right: 2.5rem;
`;

export const TitleContent = styled.View`
  flex-direction: row;
  margin: 0 1rem;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
`;

export const CardContent = styled.View`
  flex: 1;
`;

export const MessageList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
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
