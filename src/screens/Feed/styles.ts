import styled from 'styled-native-components';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
`;

export const FilterContent = styled.View``;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
`;

export const FilterButton = styled.TouchableOpacity``;

export const Input = styled.TextInput``;

export const ItineraryList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const RowGroupSpaced = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem;
`;

export const ColumnGroup = styled.View`
  align-items: center;
  justify-content: center;
`;

export const EmptyData = styled.View`
  align-items: center;
  justify-content: center;
`;
