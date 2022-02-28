import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const Container = styled.View``;

export const ImageList = styled.ScrollView``;

export const ImageItem = styled.Image`
  flex: 1;
  width: 100%;
  height: 20rem;
  border-radius: 0.8rem;
  margin: 0.5rem;
  background: ${theme.colors.appBackground};
`;

export const Bullets = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Bullet = styled.View`
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 0.4rem;
  margin: 0.5rem;
`;
