import styled from 'styled-native-components';

import {theme} from '../../utils/theme';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  flex-direction: column;
  background: ${theme.colors.appBackground};
`;

export const Header = styled.View`
  height: 6rem;
  justify-content: center;
  align-items: center;
  margin: 1rem;
`;

export const Content = styled.View`
  flex: 1;
  padding: 1rem;
`;
