import styled from 'styled-native-components';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardContent = styled.View``;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const EditButton = styled.TouchableOpacity``;

export const RowGroupSpaced = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StatusContent = styled.View`
  position: relative;
  z-index: 10;
`;

export const Label = styled.Text`
  font-family: 'Roboto';
  font-size: 1.8rem;
  font-weight: bold;
  color: #4885fd;
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

export const RowGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Divider = styled.View`
  background: #808080;
  height: 100%;
  width: 0.2rem;
  border-radius: 0.1rem;
`;

export const IconHolder = styled.View`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  background: #4885fd;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

export const ItemsContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

export const DataContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
`;

export const ColumnGroup = styled.View``;

export const JoinButton = styled.TouchableOpacity`
  background: #3dc77b;
  height: 4rem;
  width: 12rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  margin: 0.5rem 0;
`;

export const JoinButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
`;

export const SendButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 4rem;
  width: 12rem;
  align-self: flex-end;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
`;

export const SendButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
`;

export const DeleteItineraryButton = styled.TouchableOpacity`
  background: #f57373;
  height: 4.4rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  flex-direction: row;
  margin: 1rem;
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
