import styled from 'styled-native-components';

export const Container = styled.View`
  background: #fff;
  margin: 1rem;
  padding: 1rem;
  border-radius: 0.8rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ItineraryHeader = styled.View``;

export const RowGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
`;

export const Name = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
`;

export const Location = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
  max-width: 20rem;
`;

export const DateText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const FavoriteButton = styled.TouchableOpacity``;

export const Description = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #545454;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

export const Badges = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Badge = styled.View`
  width: 4.8rem;
  height: 4rem;
  background: #4885fd;
  flex-direction: column;
  align-items: center;
  border-radius: 0.8rem;
  margin-right: 0.8rem;
  justify-content: center;
`;

export const Quantity = styled.Text`
  font-family: 'Roboto';
  font-size: 1rem;
  color: #fff;
`;

export const DetailsButton = styled.TouchableOpacity`
  height: 3.7rem;
  align-items: center;
  justify-content: center;
  background: #3dc77b;
  flex: 1;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

export const DetailsButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.8rem;
  font-weight: bold;
  color: #fff;
`;

export const StatusContent = styled.View`
  position: relative;
  z-index: 10;
`;

export const Status = styled.View`
  width: 11rem;
  height: 2.5rem;
  background: #4885fd;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  position: absolute;
  right: 0;
`;

export const StatusName = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #fff;
`;
