import styled from 'styled-native-components';

export type JustifyTypes = 'space-between' | 'flex-start' | 'center';

export const Container = styled.View<{justify?: JustifyTypes}>`
  flex: 1;
  flex-direction: row;
  justify-content: ${(props) => props.justify || 'space-between'};
`;
