import React, {useRef, useCallback, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Platform,
  Dimensions,
  PanResponder,
  Animated,
  SafeAreaView,
} from 'react-native';

import {
  Container,
  Content,
  Header,
  KeyboardAvoidingView,
  AlertActions,
  ConfirmButton,
  CancelButton,
  ButtonText,
  BaseBlock,
} from './styles';
import Text from '../Text';

interface AlertProps {
  title?: string;
  visible: boolean;
  onRequestClose(): void;
  icon?: string;
  iconColor?: string;
  onConfirm?(): void;
  onCancel?(): void;
  message?: string;
}

const Alert: React.FC<AlertProps> = ({
  visible,
  onRequestClose,
  icon,
  iconColor,
  title,
  onConfirm,
  message,
}) => {
  const {height} = Dimensions.get('screen');
  const panY = useRef(new Animated.ValueXY({x: 0, y: -height})).current;

  const handleOpen = useCallback(() => {
    Animated.timing(panY.y, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [panY.y]);

  const handleDismiss = useCallback(() => {
    Animated.timing(panY.y, {
      toValue: -height,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      onRequestClose();
    }, 300);
  }, [height, onRequestClose, panY.y]);

  const panRespoders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (e, gs) => {
        if (gs.dy < 0) {
          panY.setValue({x: 0, y: gs.dy});
        }
      },
      onPanResponderRelease: (e, gs) => {
        if (gs.dy < 0 && gs.vy > 1) {
          return handleDismiss();
        }
        Animated.spring(panY.y, {
          toValue: 0,
          bounciness: 3,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  useEffect(() => {
    if (visible === true) {
      handleOpen();
    }
  }, [handleOpen, visible]);

  if (!visible) {
    return null;
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView>
          <Content
            style={{
              transform: [
                {
                  translateY: panY.y.interpolate({
                    inputRange: [-100, 0, 1],
                    outputRange: [-100, 0, 1],
                  }),
                },
              ],
            }}
            {...panRespoders.panHandlers}>
            <Header>
              {icon && <Icon name={icon} size={30} color={iconColor} />}

              <Text.Title alignment="center">{title}</Text.Title>
            </Header>
            <Text.Paragraph alignment="center" textWeight="light">
              {message}
            </Text.Paragraph>
            <AlertActions>
              {onConfirm && (
                <ConfirmButton onPress={onConfirm}>
                  <Icon name="check" size={24} color="#FFF" />
                  <ButtonText>Confirmar</ButtonText>
                </ConfirmButton>
              )}
              <CancelButton onPress={handleDismiss}>
                <Icon name="close" size={24} color="#FFF" />
                <ButtonText>{onConfirm ? 'Voltar' : 'Fechar'}</ButtonText>
              </CancelButton>
            </AlertActions>
            <BaseBlock />
          </Content>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Alert;
