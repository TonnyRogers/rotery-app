import styled from 'styled-native-components';
import {Platform} from 'react-native';

import {theme} from '../../utils/theme';
const metric = Platform.OS === 'ios' ? 'vh' : '%';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background: ${theme.colors.appBackground};
  margin: 1rem;
`;

export const TransactionContainer = styled.View`
  flex-direction: column;
  background: ${theme.colors.appBackground};
  height: ${'20' + metric};
  margin: 0 1.5rem;
`;

export const Header = styled.View`
  height: 6rem;
  justify-content: center;
`;

export const CardContainer = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const ItemContainer = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  margin: 1rem 0;
`;

export const ItemIconHover = styled.View`
  background: ${theme.colors.blueTransparent};
  height: 5rem;
  width: 5rem;
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
`;
