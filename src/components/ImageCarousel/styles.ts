import styled from 'styled-components/native';

export const Container = styled.View``;

export const ImageList = styled.ScrollView``;

export const ImageItem = styled.Image`
  width: 310px;
  height: 200px;
  border-radius: 8px;
  margin: 5px;
`;

export const Bullets = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Bullet = styled.View`
  height: 8px;
  width: 8px;
  border-radius: 4px;
  background: #808080;
  opacity: ${(props: {current: boolean}) => (props.current ? '0.5' : '0.1')};
  margin: 5px;
`;
