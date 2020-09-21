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

export const CardActions = styled.View`
  flex-direction: row;
`;

export const SubmitButton = styled.TouchableOpacity``;

export const SubmitButtonText = styled.Text``;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #808080;
`;

export const ImageList = styled.FlatList`
  flex-direction: row;
  width: 100%;
`;

export const ImageButton = styled.TouchableOpacity`
  width: 103px;
  height: 76px;
  margin: 2px;
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
  background: ${(props: {empty: boolean}) =>
    props.empty ? '#FFF' : 'rgba(0, 0, 0, 0.6)'};
  border-style: ${(props) => (props.empty ? 'solid' : 'solid')};
  border-color: ${(props) => (props.empty ? '#D9D8D8' : '#D9D8D8')};
  border-width: ${(props) => (props.empty ? '2px' : '0')};
  position: absolute;
  border-radius: 10px;
`;

export const SIcon = styled(Icon)`
  position: relative;
`;

export const AddImageButton = styled.TouchableOpacity`
  width: 103px;
  height: 76px;
  justify-content: center;
  align-items: center;
  background: #565;
  border-radius: 10px;
  margin: 2px;
`;
