import styled from 'styled-native-components';

export const Container = styled.TouchableOpacity<{
  margin?: string;
  height?: number;
  isFlex?: boolean;
}>`
  ${(props) => (props.isFlex ? 'flex: 1;' : '')}
  height: ${(props) => props.height + 'rem' || '5rem'};
  margin: ${(props) => props.margin || ''};
`;
