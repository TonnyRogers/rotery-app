import styled from 'styled-native-components';
import {Platform} from 'react-native';

const shadow =
  Platform.OS === 'ios'
    ? 'box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);'
    : 'elevation: 1;';

export const Container = styled.View.attrs({})`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 5px;
  ${shadow}
`;

export const RowGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MemberDetails = styled.View`
  flex-direction: row;
`;

export const UserImage = styled.Image`
  height: 5rem;
  width: 5rem;
  border-radius: 0.8rem;
  margin-right: 0.5rem;
  background: #eee;
`;

export const UserButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
