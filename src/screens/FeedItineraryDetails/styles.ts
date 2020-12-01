import styled from 'styled-components/native';

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
  font-size: 16px;
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
  font-size: 14px;
  color: #9d9d9d;
`;

export const DateBegin = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;

export const DescriptionTitle = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
`;

export const Description = styled.Text`
  font-family: 'Roboto';
`;

export const HostContent = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 10px 0;
`;

export const HostLabel = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.Text`
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
  color: #4885fd;
`;

export const Divider = styled.View`
  background: #808080;
  height: 100%;
  width: 2px;
  border-radius: 1px;
`;

export const HostButton = styled.TouchableOpacity`
  flex-direction: row;
`;

export const UserImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 8px;
  margin-right: 5px;
  background: #eee;
`;

export const HostDetails = styled.View`
  padding: 5px;
`;

export const RateStars = styled.View`
  flex-direction: row;
`;

export const DataContent = styled.View`
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 5px;
  elevation: 3;
`;
export const DataContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;
export const ContentTitle = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

export const Value = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;

export const IconHolder = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: #4885fd;
  align-items: center;
  justify-content: center;
`;

export const DataName = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
`;

export const DataDescription = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
  margin: 10px 0;
`;

export const DatePriceContent = styled.View`
  flex-direction: row-reverse;
`;

export const DataPriceLabel = styled.Text`
  font-family: 'Roboto';
  font-size: 12px;
`;

export const DataPriceValue = styled.Text`
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: bold;
`;

export const SendButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 40px;
  width: 120px;
  align-self: flex-end;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const SendButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const JoinButton = styled.TouchableOpacity`
  background: #3dc77b;
  height: 40px;
  width: 120px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const JoinButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const StatusContent = styled.View`
  position: relative;
`;

export const Status = styled.View`
  width: 110px;
  height: 25px;
  background: #4885fd;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: absolute;
  right: 0;
  z-index: 10;
`;

export const StatusName = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #fff;
`;
