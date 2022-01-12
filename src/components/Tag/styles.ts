import styled from 'styled-native-components';
import {theme, ColorsType} from '../../utils/theme';

export type AlignTypes = 'flex-start' | 'flex-end' | 'center' | 'stretch';

export const Container = styled.View<{color?: ColorsType; align?: AlignTypes}>`
  flex: 1;
  border-radius: 1rem;
  padding: 0.25rem;
  background: ${(props) =>
    props.color ? theme.colors[props.color] : theme.colors.disabled};
  align-items: center;
  align-self: ${(props) => props.align || 'stretch'};
  padding: 0.1rem 1rem;
`;
