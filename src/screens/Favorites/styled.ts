import styled from 'styled-native-components';

export const Container = styled.View`
  flex: 1;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 1rem;
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
  margin-left: 1rem;
`;

export const Content = styled.View`
  flex: 1;
`;

export const ItineraryList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const ColumnGroup = styled.View`
  align-items: center;
  justify-content: center;
`;
