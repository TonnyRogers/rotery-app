import React from 'react';
import {Platform, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  KeyboardAvoidingView,
  ModalContent,
  CloseButton,
  ModalHeader,
} from './styles';
import Text from '../Text';

interface ModalProps {
  visible: boolean;
  onCloseRequest: () => void;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  children,
  title,
  onCloseRequest,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <>
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <StatusBar backgroundColor="rgba(0,0,0,0.4)" />
          <ModalContent>
            <ModalHeader>
              <Text.Title>{title}</Text.Title>
              <CloseButton onPress={onCloseRequest}>
                <Icon name="close" size={24} color="#3dc77b" />
              </CloseButton>
            </ModalHeader>
            {children}
          </ModalContent>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
};

export default Modal;
