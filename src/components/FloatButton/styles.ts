import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

const positions = {
  left: `  
    bottom: 0;
    left: 0;
    `,
  right: `  
    bottom: 0;
    right: 0;
    `,
  center: `  
    bottom: 0;
    align-self: center;
    `,
};

const shape = {
  rounded: `
  height: 5rem;
  width: 5rem;
  border-radius: 0.8rem;
  `,
  circle: `
  height: 5rem;
  width: 5rem;
  border-radius: 2.5rem;
  `,
  square: `
  height: 5rem;
  width: 5rem;
  border-radius: 0.2rem;
  `,
};

const backgrounds = {
  primary: theme.colors.green,
  primaryTransparent: theme.colors.greenTransparent,
  secondary: theme.colors.blue,
};

export const Container = styled.TouchableOpacity<{
  alignment?: 'left' | 'center' | 'right';
  shape?: 'rounded' | 'circle' | 'square';
  bgColor?: 'primary' | 'secondary' | 'primaryTransparent';
}>`
  align-items: center;
  justify-content: center;
  position: absolute;
  margin: 1rem;
  padding: 0.5rem;
  ${(props) => (props.alignment ? positions[props.alignment] : positions.right)}
  ${(props) => (props.shape ? shape[props.shape] : shape.circle)}
  background: ${(props) =>
    props.bgColor ? backgrounds[props.bgColor] : backgrounds.primary};
`;
