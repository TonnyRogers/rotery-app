import styled from 'styled-native-components';
import {theme, ColorsType} from '../../utils/theme';

export type AlignTypes = 'flex-start' | 'flex-end' | 'center' | 'stretch';

export const Container = styled.View<{color?: ColorsType; align?: AlignTypes}>`
  min-height: 2rem;
  border-radius: 1rem;
  background: ${(props) =>
    props.color ? theme.colors[props.color] : theme.colors.disabled};
  align-items: center;
  justify-content: center;
  align-self: ${(props) => props.align || 'stretch'};
  padding: 0.5rem 1rem;
`;
