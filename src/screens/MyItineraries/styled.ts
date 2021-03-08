import styled from 'styled-native-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 6.5rem;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
  margin-left: 1rem;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-left: 2rem;
`;

export const Content = styled.View`
  flex: 1;
`;

export const ColumnGroup = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ItineraryList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const NewItineraryButton = styled.TouchableOpacity`
  background: #3dc77b;
  border-radius: 0.8rem;
  align-items: center;
  justify-content: center;
  height: 4.4rem;
  margin: 1rem 4rem;
`;

export const NewItineraryButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
`;
