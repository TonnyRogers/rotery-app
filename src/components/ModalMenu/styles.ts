import styled from 'styled-components/native';

export const Container = styled.Modal``;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  blurRadius: 1,
})`
  background: rgba(0, 0, 0, 0.8);
  flex: 1;
`;

export const Content = styled.View`
  background: #fff;
  min-height: 300px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
`;

export const Actions = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 10px;
`;

export const MenuButton = styled.TouchableOpacity`
  background: #3dc77b;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 47%;
  height: 100px;
  border-radius: 8px;
  margin: 5px;
  position: relative;
`;

export const MenuButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;

export const CounterContent = styled.View`
  background: #f57373;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 5px;
`;

export const Counter = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #fff;
`;

export const ItinerariesButton = styled.TouchableOpacity``;

export const ItinerariesButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  align-self: center;
`;

export const FavoritesButton = styled.TouchableOpacity``;

export const FavoritesButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export const SignOutButton = styled.TouchableOpacity`
  background: transparent;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
`;

export const SignOutButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  color: #3e44c7;
`;
