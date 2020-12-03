import styled from 'styled-native-components';

export const Container = styled.View`
  flex: 1;
`;

export const ImageList = styled.ScrollView`
  background: #f6f6f6;
  height: 40rem;
  border-radius: 0.8rem;
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
  margin: 1rem 0.5rem;
`;

export const HighlightContent = styled.View``;

export const RowGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  text-align: center;
`;

export const Subtitle = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  text-align: center;
`;

export const ActionContent = styled.View`
  height: 4rem;
`;

export const CloseButton = styled.TouchableOpacity`
  height: 3rem;
  width: 8rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
  border-radius: 0.8rem;
  align-self: flex-end;
`;

export const CloseButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  text-align: center;
  font-weight: bold;
  color: #3dc77b;
`;
