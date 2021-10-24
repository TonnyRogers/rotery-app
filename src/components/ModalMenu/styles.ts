import styled from 'styled-native-components';
import {
  Animated,
  KeyboardAvoidingView as RNKAvoidView,
  Platform,
} from 'react-native';

const metricH = Platform.OS === 'ios' ? 'vh' : '%';
const metricW = Platform.OS === 'ios' ? 'vw' : '%';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  position: absolute;
  height: ${'100' + metricH};
  width: ${'100' + metricW}:;
`;

export const KeyboardAvoidingView = styled(RNKAvoidView)`
  flex: 1;
  justify-content: flex-start;
`;

export const Content = styled(Animated.View)`
  background: #fff;
  min-height: 30rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  padding: 4rem 1rem;
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
  justify-content: center;
  margin-top: 1rem;
`;

export const MenuButton = styled.TouchableOpacity<{active?: boolean}>`
  background: ${(props) =>
    props.active !== undefined
      ? props.active
        ? '#3dc77b'
        : '#d5d5d5'
      : '#3dc77b'};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 10rem;
  border-radius: 0.8rem;
  margin: 0.5rem;
  position: relative;
`;

export const MenuButtonText = styled.Text<{active?: boolean}>`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: ${(props) =>
    props.active !== undefined ? (props.active ? '#fff' : '#999') : '#fff'};
  text-align: center;
`;

export const CounterContent = styled.View`
  background: #f57373;
  width: 2rem;
  height: 2rem;
  border-radius: 0.4rem;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 1rem;
  right: 1rem;
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
