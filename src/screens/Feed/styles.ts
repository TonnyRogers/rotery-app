import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const Content = styled.View``;

export const FilterContent = styled.View``;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 18px;
`;

export const FilterButton = styled.TouchableOpacity`
  background: #fff;
  height: 44px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border-radius: 45px;
  elevation: 1;
  margin: 5px;
`;

export const Input = styled.TextInput``;

export const ActivityList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Activity = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
  background: #3dc77b;
  border-radius: 15px;
  margin: 5px;
  elevation: 3;
`;

export const ActivityName = styled.Text`
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: bold;
  color: #fff;
`;

export const ItineraryList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  max-height: 435px;
`;

export const FloatContent = styled.View``;

export const NewItineraryButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  background: #3dc77b;
  border-radius: 15px;
  margin-top: -20px;
  elevation: 3;
  align-self: center;
`;

export const RowGroupSpaced = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
`;
