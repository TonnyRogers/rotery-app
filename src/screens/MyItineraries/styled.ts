import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
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

export const ColumnGroup = styled.View`
  align-items: center;
  justify-content: center;
`;

export const ItineraryList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const NewItineraryButton = styled.TouchableOpacity`
  background: #3dc77b;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  height: 44px;
  margin: 10px 40px;
`;

export const NewItineraryButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
