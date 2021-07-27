import styled from 'styled-native-components';

export const Container = styled.View`
  flex: 1;
`;

export const ImageList = styled.ScrollView`
  background: #f4f4f4;
`;

export const Bullets = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Bullet = styled.View`
  height: 0.6rem;
  width: 0.6rem;
  border-radius: 0.4rem;
  margin: 0.5rem;
`;

export const HighlightContent = styled.View`
  flex: 1;
`;

export const RowGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
`;

export const Subtitle = styled.Text.attrs({
  numberOfLines: 4,
})`
  font-family: 'Roboto';
  font-size: 1.6rem;
  text-align: center;
`;
