import styled from 'styled-native-components';

export type JustifyTypes = 'space-between' | 'flex-start' | 'center';
export type AlignTypes = 'flex-end' | 'flex-start' | 'center';

export const Container = styled.View<{
  justify?: JustifyTypes;
  align?: AlignTypes;
}>`
  flex: 1;
  flex-direction: row;
  justify-content: ${(props) => props.justify || 'space-between'};
  align-items: ${(props) => props.align || 'flex-start'};
`;
