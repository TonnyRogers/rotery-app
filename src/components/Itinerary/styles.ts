import styled from 'styled-components/native';

export const Container = styled.View`
  background: #fff;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  elevation: 3;
`;

export const ItineraryHeader = styled.View``;

export const RowGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
`;

export const Location = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
  max-width: 200px;
`;

export const Date = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;

export const FavoriteButton = styled.TouchableOpacity``;

export const Description = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-family: 'Roboto';
  font-size: 14px;
  color: #545454;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Badges = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Badge = styled.View`
  width: 48px;
  height: 40px;
  background: #4885fd;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  margin-right: 8px;
  justify-content: center;
`;

export const Quantity = styled.Text`
  font-family: 'Roboto';
  font-size: 10px;
  color: #fff;
`;

export const DetailsButton = styled.TouchableOpacity`
  height: 37px;
  align-items: center;
  justify-content: center;
  background: #3dc77b;
  flex: 1;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const DetailsButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
