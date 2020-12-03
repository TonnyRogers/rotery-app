import styled from 'styled-native-components';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  height: 2rem;
  width: 2rem;
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
