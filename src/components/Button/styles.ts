import styled from 'styled-native-components';

export const Container = styled.TouchableOpacity<{
  margin?: string;
  isFlex?: boolean;
}>`
  ${(props) => (props.isFlex ? 'flex: 1;' : '')}
  height: 5rem;
  margin: ${(props) => props.margin || ''};
`;
