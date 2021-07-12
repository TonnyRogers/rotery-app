import styled from 'styled-native-components';
import {Platform} from 'react-native';

const shadow =
  Platform.OS === 'ios'
    ? 'box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);'
    : 'elevation: 1;';

export const Container = styled.View`
  background: #fff;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.8rem;
  flex: 1;
`;

export const CardContent = styled.View`
  flex: 1;
`;
