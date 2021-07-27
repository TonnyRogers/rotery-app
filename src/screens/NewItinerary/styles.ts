import styled from 'styled-native-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';
// import {theme} from '../../utils/theme';

const shadow =
  Platform.OS === 'ios'
    ? 'box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);'
    : 'elevation: 1;';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex-direction: column;
  flex: 1;
`;

export const ModalContent = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const CardHeader = styled.View``;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const User = styled.View`
  align-items: center;
  justify-content: center;
`;

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
  ${shadow}
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

export const AddButton = styled.TouchableOpacity`
  background: #4885fd;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  height: 4rem;
  padding: 1rem 2rem;
  align-self: flex-end;
  align-items: center;
  justify-content: center;
`;

export const AddButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  color: #fff;
  font-size: 1.5rem;
`;

export const NewTransportButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  background: #4885fd;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-top-left-radius: 1rem;
  height: 4rem;
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

export const NewLodginButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ActivityList = styled.View``;

export const AddActivityButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const NewActivityButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const PublicButton = styled.TouchableOpacity<{selected: boolean}>`
  background: ${(props) => (props.selected ? 'transparent' : '#3dc77b')};
  border-color: #3dc77b;
  border-width: 0.3rem;
  border-radius: 1rem;
  height: 4rem;
  padding: 1rem 2rem;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

export const PublicButtonText = styled.Text<{selected: boolean}>`
  font-family: 'Roboto';
  font-weight: bold;
  color: ${(props) => (props.selected ? '#3dc77b' : '#FFF')};
  font-size: 1.5rem;
`;

export const PrivateButton = styled.TouchableOpacity<{selected: boolean}>`
  background: ${(props) => (props.selected ? '#3dc77b' : 'transparent')};
  border-color: #3dc77b;
  border-width: 0.3rem;
  border-radius: 1rem;
  height: 4rem;
  padding: 1rem 2rem;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;

export const PrivateButtonText = styled.Text<{selected: boolean}>`
  font-family: 'Roboto';
  font-weight: bold;
  color: ${(props) => (props.selected ? '#FFF' : '#3dc77b')};
  font-size: 1.5rem;
`;
