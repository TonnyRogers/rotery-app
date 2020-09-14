import styled from 'styled-components/native';

export const Container = styled.Modal``;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
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

export const Actions = styled.View``;

export const MenuButton = styled.TouchableOpacity`
  background: #3dc77b;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
`;

export const MessageButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export const CounterContent = styled.View`
  background: #f57373;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const Counter = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
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
  margin: 10px 0;
`;

export const SignOutButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  color: #3e44c7;
`;
