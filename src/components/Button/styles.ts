import styled from 'styled-native-components';

export const Container = styled.TouchableOpacity<{
  margin?: string;
  height?: number;
  width?: number;
  isFlex?: boolean;
}>`
  ${(props) => (props.isFlex ? 'flex: 1;' : '')}
  height: ${(props) => props.height + 'rem' || '5rem'};
  ${(props) => (props.width ? `width:${props.width}rem;` : '')}
  margin: ${(props) => props.margin || ''};
`;
