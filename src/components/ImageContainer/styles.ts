import styled from 'styled-native-components';

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
  ${(props) => props.sizeStyle && heroSizeType[props.sizeStyle]}
  background: #eee;
  margin-vertical: 1.6rem;
`;
