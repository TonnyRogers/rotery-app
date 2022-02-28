import styled from 'styled-native-components';
import {
  Animated,
  KeyboardAvoidingView as RNKAvoidingView,
  Platform,
} from 'react-native';

const metric = Platform.OS === 'ios' ? 'vh' : '%';
const topPadding = Platform.OS === 'ios' ? '4.5rem' : '1.6rem';

export const Container = styled.View`
flex: 1;
background: rgba(0, 0, 0, 0.4);
z-index: 100;
position: absolute;
height: 100${metric};
width: 100%:
`;

export const KeyboardAvoidingView = styled(RNKAvoidingView)`
  flex: 1;
  justify-content: flex-start;
`;

export const Content = styled(Animated.View)`
  background: #fff;
  min-height: 30rem;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  padding: ${topPadding} 1rem 0.8rem 1rem;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 0.6rem;
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
  max-height: 35rem;
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
