import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';

import {
  Container,
  Content,
  Header,
  KeyboardAvoidingView,
  Title,
  AlertActions,
  ConfirmButton,
  CancelButton,
  ButtonText,
  Message,
  BaseBlock,
} from './styles';

interface AlertProps {
  title?: string;
  visible: boolean;
  onRequestClose(): void;
  icon?: string;
  iconColor?: string;
  onConfirm?(): void;
  onCancel(): void;
  message?: string;
}

const Alert: React.FC<AlertProps> = ({
  visible,
  onRequestClose,
  icon,
  iconColor,
  title,
  onCancel,
  onConfirm,
  message,
}) => {
  return (
    <Container
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={() => onRequestClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Content>
          <Header>
            {icon && <Icon name={icon} size={30} color={iconColor} />}
            <Title>{title}</Title>
          </Header>
          <Message>{message}</Message>
          <AlertActions>
            {onConfirm && (
              <ConfirmButton onPress={onConfirm}>
                <Icon name="check" size={24} color="#FFF" />
                <ButtonText>Confirmar</ButtonText>
              </ConfirmButton>
            )}
            <CancelButton onPress={onCancel}>
              <Icon name="close" size={24} color="#FFF" />
              <ButtonText>{onConfirm ? 'Cancelar' : 'Fechar'}</ButtonText>
            </CancelButton>
          </AlertActions>
          <BaseBlock />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Alert;
