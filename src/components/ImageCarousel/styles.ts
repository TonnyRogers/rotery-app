import styled from 'styled-native-components';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');

export const Container = styled.View``;

export const ImageList = styled.ScrollView`
`;

export const ImageItem = styled.Image`
  width: ${(width*0.88)/10}rem;
  height: 20rem;
  border-radius: 0.8rem;
  margin: 0.5rem;
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
  background: #3dc77b;
  margin: 0.5rem;
`;
