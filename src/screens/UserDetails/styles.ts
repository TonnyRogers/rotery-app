import styled from 'styled-native-components';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const CardHeader = styled.View``;

export const TitleContent = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const CardCotent = styled.View``;

export const UserDetail = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.Image`
  height: 10rem;
  width: 10rem;
  border-radius: 0.8rem;
  margin-right: 0.5rem;
  background: #eee;
`;

export const Name = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
`;

export const DateJoin = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const Profission = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const Age = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const Location = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const ConnectButton = styled.TouchableOpacity`
  background: #3dc77b;
  height: 4rem;
  width: 12rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  margin: 1rem;
`;

export const ConnectButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
  margin-right: 0.5rem;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2.4rem;
  font-weight: bold;
  margin: 1rem 0;
  text-align: center;
`;

export const RateList = styled.View``;

export const ItineraryName = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: 700;
`;

export const ItineraryDate = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const IconContent = styled.View`
  background: #4885fd;
  height: 3rem;
  width: 3rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
`;

export const RowGroupSpaced = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ColumnGroup = styled.View``;

export const UserRate = styled.View`
  align-items: center;
  justify-content: center;
`;

export const RateDescription = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;
