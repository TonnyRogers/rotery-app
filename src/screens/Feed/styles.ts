import styled from 'styled-native-components';
import {Platform} from 'react-native';

const shadow =
  Platform.OS === 'ios'
    ? 'box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);'
    : 'elevation: 1;';

export const Container = styled.SafeAreaView`
  flex: 1;
  position: relative;
  margin-top: 6.5rem;
`;

export const Content = styled.View`
  flex: 1;
`;

export const FilterContent = styled.View``;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 1.8rem;
  font-weight: bold;
`;

export const FilterButton = styled.TouchableOpacity`
  background: #fff;
  height: 4.4rem;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  border-radius: 4.5rem;
  margin: 0.5rem;
`;

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

export const FloatContent = styled.View``;

export const NewItineraryButton = styled.TouchableOpacity`
  height: 5rem;
  width: 5rem;
  align-items: center;
  justify-content: center;
  background: #3dc77b;
  border-radius: 1.5rem;
  margin-top: -3rem;
  ${shadow}
  align-self: center;
`;

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
