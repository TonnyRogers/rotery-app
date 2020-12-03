import styled from 'styled-native-components';
import {
  Modal as RNModal,
  KeyboardAvoidingView as RNKAvoidingView,
} from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const Modal = styled(RNModal)``;

export const KeyboardAvoidingView = styled(RNKAvoidingView)`
  background: rgba(0, 0, 0, 0.8);
  flex: 1;
`;

export const Content = styled.View`
  background: #fff;
  min-height: 30rem;
  border-radius: 0.8rem;
  padding: 1rem;
  margin: 2rem 1rem;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 2rem;
  font-weight: bold;
`;

export const CloseButton = styled.TouchableOpacity``;

export const ModalContent = styled.View``;

export const Actions = styled.View``;

export const FilterButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 4rem;
  width: 12rem;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
`;

export const FilterButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
`;
