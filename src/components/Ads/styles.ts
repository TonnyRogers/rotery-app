import styled from 'styled-components/native';
import {Animated} from 'react-native';

export const Container = styled.Modal``;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  background: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: flex-end;
`;

export const Content = styled(Animated.View)`
  flex: 1;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px;
  margin-top: 75px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  background: #123;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
`;

export const CloseButton = styled.TouchableOpacity`
  background: transparent;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ImageItem = styled(Animated.Image)`
  height: 514px;
  border-radius: 10px;
`;
