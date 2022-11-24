import styled from 'styled-native-components';

export type JustifyTypes = 'space-between' | 'flex-start' | 'center';

export const Container = styled.View<{
  justify?: JustifyTypes;
  isFlex?: boolean;
}>`
  ${(props) => (props.isFlex ? 'flex: 1;' : '')}
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
