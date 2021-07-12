import React from 'react';
import {Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  KeyboardAvoidingView,
  ModalContent,
  CloseButton,
  ModalHeader,
  Title,
} from './styles';

interface ModalProps {
  visible: boolean;
  onCloseRequest: () => {};
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  visible,
  children,
  title,
  onCloseRequest,
}) => {
  return (
    visible && (
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ModalContent>
            <ModalHeader>
              <Title>{title}</Title>
              <CloseButton onPress={onCloseRequest}>
                <Icon name="close" size={24} color="#3dc77b" />
              </CloseButton>
            </ModalHeader>
            {children}
          </ModalContent>
        </KeyboardAvoidingView>
      </Container>
    )
  );
};

export default Modal;
