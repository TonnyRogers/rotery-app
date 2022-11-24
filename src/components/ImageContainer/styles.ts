import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

const heroSizeType = {
  rect: `
    height: 26vh; 
    width: 87vw;
  `,
  square: `
  height: 40vh; 
  width: 87vw;
`,
};

export const Container = styled.View`
  flex: 1;
`;

export const CustomImage = styled.Image<{size?: number}>`
  height: ${(props) => props.size || 5}rem;
  width: ${(props) => props.size || 5}rem;
  border-radius: 0.8rem;
  margin-right: 0.5rem;
  background: #eee;
`;

export const HeroImage = styled.Image<{
  size?: number;
  sizeStyle: 'rect' | 'square';
}>`
  flex: 1;
  ${(props) => props.sizeStyle && heroSizeType[props.sizeStyle]}
  background: #eee;
  margin-vertical: 1.6rem;
`;

const containerStyle = `
position: relative;
height: 100%;
width: 100%;
border-radius: 1rem;
background: #459;
`;

export const OverlayedTouchableContainer = styled.TouchableOpacity`
  ${containerStyle}
`;

export const OverlayedContainer = styled.View`
  ${containerStyle}
`;

export const BackgroundOverlay = styled.View`
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 1rem;
`;

export const OverlayedImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  flex: 1;
  border-radius: 1rem;
  background: ${theme.colors.appBackgroundDarker};
`;

export const OverlayedTextContainer = styled.View`
  position: absolute;
  flex: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 1rem;
`;
