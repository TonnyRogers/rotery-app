import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  height: 20px;
  width: 20px;
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
