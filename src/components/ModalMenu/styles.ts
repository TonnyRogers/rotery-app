import styled from 'styled-native-components';
import {
  Animated,
  Modal,
  KeyboardAvoidingView as RNKAvoidView,
} from 'react-native';

export const Container = styled(Modal)``;

export const KeyboardAvoidingView = styled(RNKAvoidView).attrs({
  blurRadius: 1,
})`
  background: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: flex-start;
`;

export const Content = styled(Animated.View)`
  background: #fff;
  min-height: 30rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  padding: 1rem;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  margin-left: 0.5rem;
`;

export const Actions = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-top: 1rem;
`;

export const MenuButton = styled.TouchableOpacity`
  background: #3dc77b;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 47%;
  height: 10rem;
  border-radius: 0.8rem;
  margin: 0.5rem;
  position: relative;
`;

export const MenuButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
`;

export const CounterContent = styled.View`
  background: #f57373;
  width: 2rem;
  height: 2rem;
  border-radius: 0.4rem;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0.5rem;
`;

export const Counter = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #fff;
`;

export const ItinerariesButton = styled.TouchableOpacity``;

export const ItinerariesButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  align-self: center;
`;

export const FavoritesButton = styled.TouchableOpacity``;

export const FavoritesButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
`;

export const SignOutButton = styled.TouchableOpacity`
  background: transparent;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.8rem;
`;

export const SignOutButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
  color: #3e44c7;
`;

export const CloseButton = styled.TouchableOpacity`
  background: transparent;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.8rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
