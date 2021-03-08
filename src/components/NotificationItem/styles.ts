import styled from 'styled-native-components';
import {Platform} from 'react-native';

const shadow =
  Platform.OS === 'ios'
    ? 'box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);'
    : 'elevation: 1;';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  ${shadow}
  min-height: 6rem;
  margin: 0.8rem;
  border-radius: 0.8rem;
  padding: 0.5rem 0.8rem;
`;

export const ColumGroup = styled.View``;

export const Subject = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
`;

export const Type = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const RowGroup = styled.View`
  flex-direction: row;
`;

export const DateText = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
`;

export const NotificationButton = styled.View`
  width: 3.2rem;
  height: 3.2rem;
  background: #4885fd;
  flex-direction: row;
  align-items: center;
  border-radius: 0.8rem;
  margin-left: 0.5rem;
  justify-content: center;
`;
