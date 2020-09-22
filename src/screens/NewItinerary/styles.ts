import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView`
  flex-direction: column;
  flex: 1;
`;

export const CardContent = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #808080;
`;

export const ImageList = styled.View`
  flex-direction: row;
  width: 100%;
  margin: 10px 0;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const ImageButton = styled.TouchableOpacity`
  width: 100px;
  height: 76px;
  margin: 2px;
`;

export const AddImageButton = styled.View`
  width: 100px;
  height: 76px;
  margin: 2px;
  background: #fff;
  border-style: solid;
  border-color: #d9d8d8;
  border-width: 2px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const Background = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

export const BackgroundCover = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  border-radius: 10px;
`;

export const SIcon = styled(Icon)`
  position: relative;
`;

// export const AddImageButton = styled.TouchableOpacity`
//   width: 103px;
//   height: 76px;
//   justify-content: center;
//   align-items: center;
//   background: #565;
//   border-radius: 10px;
//   margin: 2px;
// `;

export const DataContent = styled.View`
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  margin: 0 5px 10px 5px;
  elevation: 3;
`;

export const DataContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

export const RowGroup = styled.View`
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

export const IconHolder = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background: #4885fd;
  align-items: center;
  justify-content: center;
`;

export const CardActions = styled.View`
  flex-direction: row-reverse;
  width: 100%;
`;

export const TransportList = styled.View``;

export const ColumnGroup = styled.View``;

export const HeaderActions = styled.View`
  flex-direction: row-reverse;
  justify-content: space-between;
`;

export const RemoveButton = styled.TouchableOpacity``;

export const FieldTitle = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #808080;
`;

export const FieldValue = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;

export const AddTransportButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  background: #4885fd;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  height: 37px;
  padding: 10px 20px;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  color: #fff;
  font-size: 20px;
`;

export const LodgingList = styled.View``;

export const AddLodginButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ActivityList = styled.View``;

export const AddActivityButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
