import styled from 'styled-native-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.ScrollView`
  flex-direction: column;
  flex: 1;
`;

export const CardHeader = styled.View``;

export const BackButton = styled.TouchableOpacity``;

export const CardContent = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: #808080;
`;

export const ImageList = styled.View`
  flex-direction: row;
  width: 100%;
  margin: 1rem 0;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const ImageButton = styled.TouchableOpacity`
  width: 10rem;
  height: 7.6rem;
  margin: 0.2rem;
`;

export const AddImageButton = styled.View`
  width: 10rem;
  height: 7.6rem;
  margin: 0.2rem;
  background: #fff;
  border-style: solid;
  border-color: #d9d8d8;
  border-width: 0.2rem;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;
`;

export const Background = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
`;

export const BackgroundCover = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  border-radius: 1rem;
`;

export const SIcon = styled(Icon)`
  position: relative;
`;

export const DataContent = styled.View`
  background: #fff;
  padding: 1rem;
  border-radius: 0.8rem;
  margin: 0 0.5rem 1rem 0.5rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

export const DataContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
`;

export const RowGroup = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
`;

export const RowGroupSpaced = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`;

export const ContentTitle = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  margin-left: 1rem;
`;

export const IconHolder = styled.View`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
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
  font-size: 1.6rem;
  color: #808080;
`;

export const FieldValue = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const AddTransportButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  background: #3dc77b;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  height: 3.7rem;
  padding: 1rem 2rem;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  color: #fff;
  font-size: 2rem;
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
