import styled from 'styled-native-components';
import {Animated, KeyboardAvoidingView as RNKAvoidingView} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  position: absolute;
  height: 100vh;
  width: 100%:
`;

export const KeyboardAvoidingView = styled(RNKAvoidingView)`
  flex: 1;
`;

export const Content = styled(Animated.View)`
  background: #fff;
  min-height: 30rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  z-index: 101;
`;

export const Header = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2.4rem;
  font-weight: bold;
`;

export const Message = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: #9d9d9d;
  margin-bottom: 1rem;
  align-self: center;
`;

export const AlertActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background: #3dc77b;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  height: 4.4rem;
  padding: 1rem 2rem;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-right: 0.5rem;
`;

export const CancelButton = styled.TouchableOpacity`
  background: #f57373;
  border-top-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  height: 4.4rem;
  padding: 1rem 2rem;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: 0.5rem;
`;

export const ButtonText = styled.Text`
  font-size: 2rem;
  font-family: 'Roboto';
  color: #fff;
  font-weight: bold;
  margin: 0 0.8rem;
`;

export const BaseBlock = styled.View`
  background: #9d9d9d;
  height: 0.7rem;
  border-radius: 0.3rem;
  width: 17.2rem;
  margin-top: 9rem;
`;
