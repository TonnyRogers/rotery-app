import styled from 'styled-native-components';

export const Container = styled.View`
  flex: 1;
`;

export const CustomImage = styled.Image<{size?: number}>`
  height: ${(props) => props.size || 5}rem;
  width: ${(props) => props.size || 5}rem;
  border-radius: 0.8rem;
  margin-right: 0.5rem;
  background: #eee;
`;
