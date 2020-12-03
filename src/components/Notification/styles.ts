import styled from 'styled-native-components';
import {
  Animated,
  Modal,
  KeyboardAvoidingView as RNKAvoidingView,
} from 'react-native';

export const Container = styled(Modal)``;

export const KeyboardAvoidingView = styled(RNKAvoidingView)`
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

export const NotificationList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  max-height: 50rem;
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
