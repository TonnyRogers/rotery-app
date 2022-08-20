import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const StepItemContainer = styled.View<{
  active: boolean;
  isLast?: boolean;
}>`
  margin-left: 0.6rem;
  padding: 1.6rem 0 1.6rem 1.6rem;
  border-left-width: 0.8rem;
  border-left-color: ${(props) =>
    props.active ? theme.colors.green : theme.colors.greenTransparent};
  position: relative;
  ${(props) => (props.isLast ? 'border-left-color: transparent;' : '')}
`;

export const StepItemCircleContainer = styled.View<{active: boolean}>`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background-color: ${(props) =>
    props.active ? theme.colors.green : theme.colors.greenTransparent};
  margin-right: 0.8rem;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: -14px;
  top: -1px;
  z-index: 10;
`;

export const StepItemCircle = styled.View`
  width: 1rem;
  height: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
`;
