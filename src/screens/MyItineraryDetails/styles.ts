import styled from 'styled-native-components';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.ScrollView``;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BackButton = styled.TouchableOpacity``;

export const EditButton = styled.TouchableOpacity``;

export const CardContent = styled.View``;

export const Name = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
`;

export const RowGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RowGroupSpaced = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ColumnGroup = styled.View``;

export const Location = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const DateBegin = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const DescriptionTitle = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
`;

export const Description = styled.Text`
  font-family: 'Roboto';
`;

export const HostContent = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 0;
`;

export const HostLabel = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text`
  font-family: 'Roboto';
  font-size: 1.8rem;
  font-weight: bold;
  color: #4885fd;
`;

export const Divider = styled.View`
  background: #808080;
  height: 100%;
  width: 0.2rem;
  border-radius: 0.1rem;
`;

export const HostButton = styled.TouchableOpacity`
  flex-direction: row;
`;

export const UserImage = styled.Image`
  height: 5rem;
  width: 5rem;
  border-radius: 0.8rem;
  margin-right: 0.5rem;
  background: #eee;
`;

export const HostDetails = styled.View`
  padding: 0.5rem;
`;

export const RateStars = styled.View`
  flex-direction: row;
`;

export const DataContent = styled.View`
  background: #fff;
  padding: 1rem;
  border-radius: 0.8rem;
  margin: 1rem 0.5rem;
  elevation: 2;
`;
export const DataContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
`;
export const ContentTitle = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1rem;
`;

export const Value = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const IconHolder = styled.View`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  background: #4885fd;
  align-items: center;
  justify-content: center;
`;

export const DataName = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
`;

export const DataDescription = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
  margin: 1rem 0;
`;

export const DatePriceContent = styled.View`
  flex-direction: row-reverse;
`;

export const DataPriceLabel = styled.Text`
  font-family: 'Roboto';
  font-size: 1.2rem;
`;

export const DataPriceValue = styled.Text`
  font-family: 'Roboto';
  font-size: 1.2rem;
  font-weight: bold;
`;

export const DeleteItineraryButton = styled.TouchableOpacity`
  background: #f57373;
  height: 4.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  flex-direction: row;
  margin: 1rem;
  padding: 0 1rem;
`;

export const DeleteItineraryButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
`;
export const FinalizeItineraryButton = styled.TouchableOpacity`
  background: #3dc77b;
  height: 4.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  flex-direction: row;
  margin: 1rem;
  padding: 0 1rem;
`;

export const FinalizeItineraryButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
  margin-left: 0.8rem;
`;

export const StatusContent = styled.View`
  position: relative;
  z-index: 10;
`;

export const Status = styled.View`
  width: 11rem;
  height: 2.5rem;
  background: #4885fd;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  position: absolute;
  right: 0;
  z-index: 10;
`;

export const StatusName = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #fff;
`;
