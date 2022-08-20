import styled from 'styled-native-components';
import {theme} from '../../utils/theme';
import {ReactNode} from 'react';

export const Container = styled.ScrollView`
  flex: 1;
  margin: 0 1rem;
  padding: 1rem 0;
`;

export const Header = styled.View`
  margin-bottom: 1.8rem;
`;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const ActivityList = styled.ScrollView`
  max-height: 7rem;
  margin-bottom: 1.8rem;
`;

export const LocationCardList = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0 0 1rem 0;
`;

export const LocationButton = styled.TouchableOpacity`
  position: relative;
  margin: 0 1rem 1rem 0;
  height: 12rem;
  width: 10.2rem;
  border-radius: 1rem;
  background: #459;
`;

export const LocationButtonBackgroundContainer = styled.View<{
  children: ReactNode;
}>`
  flex: 1;
`;

export const BackgroundOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  height: 100%;
  width: 100%;
  bottom: 0px;
  border-radius: 1rem;
`;

export const LocationImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  flex: 1;
  border-radius: 1rem;
  background: ${theme.colors.appBackgroundDarker};
`;

export const LocationButtonTextContainer = styled.View`
  position: absolute;
  bottom: 10px;
  align-self: center;
  z-index: 10;
`;
