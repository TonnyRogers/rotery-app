import styled from 'styled-components/native';

export const Container = styled.View``;

export const ImageList = styled.ScrollView``;

export const Bullets = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Bullet = styled.View`
  height: 6px;
  width: 6px;
  border-radius: 4px;
  background: ${(props: {current: boolean}) =>
    props.current ? '#3dc77b' : '#e1e1e1'};
  margin: 5px;
`;

export const HighlightContent = styled.View``;

export const RowGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  text-align: center;
`;
