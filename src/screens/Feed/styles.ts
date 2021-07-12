import styled from 'styled-native-components';
import {Platform} from 'react-native';

const shadow =
  Platform.OS === 'ios' ? 'box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);' : '';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
`;

export const FilterContent = styled.View`
  margin-bottom: 0.5rem;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
`;

export const FilterButton = styled.TouchableOpacity``;

export const Input = styled.TextInput``;

export const ActivityList = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Activity = styled.TouchableOpacity`
  height: 6rem;
  width: 6rem;
  align-items: center;
  justify-content: center;
  background: #3dc77b;
  border-radius: 1.5rem;
  margin: 0.5rem;
  ${shadow}
`;

export const ActivityName = styled.Text`
  font-family: 'Roboto';
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
`;

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
