import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ImageList = styled.ScrollView`
  background: #f6f6f6;
  height: 400px;
  border-radius: 8px;
`;

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
  margin: 10px 5px;
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

export const ActionContent = styled.View`
  height: 40px;
`;

export const CloseButton = styled.TouchableOpacity`
  height: 30px;
  width: 80px;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
  border-radius: 8px;
  align-self: flex-end;
`;

export const CloseButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  color: #3dc77b;
`;
