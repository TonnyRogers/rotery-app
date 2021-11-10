import React, {useRef, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Animated, Dimensions, PanResponder, StatusBar} from 'react-native';

import {
  Content,
  Overlay,
  Container,
  Header,
  CloseButton,
  ChildrenContent,
} from './styles';
import Text from '../Text';
interface BottomSheetProps {
  title: string;
  visible: boolean;
  onRequestClose(): void;
  topMargin?: number;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  title,
  onRequestClose,
  children,
  topMargin,
}) => {
  const {height} = Dimensions.get('screen');
  const panY = useRef(new Animated.ValueXY({x: 0, y: height})).current;

  const handleOpen = useCallback(() => {
    Animated.timing(panY.y, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [panY.y]);

  const handleDismiss = useCallback(() => {
    Animated.timing(panY.y, {
      toValue: height,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      onRequestClose();
    }, 500);
  }, [height, onRequestClose, panY.y]);

  const panRespoders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (e, gs) => {
        if (gs.dy > 0) {
          panY.setValue({x: 0, y: gs.dy});
        }
      },
      onPanResponderRelease: (e, gs) => {
        if (gs.dy > 0 && gs.vy > 1) {
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
    if (visible) {
      handleOpen();
    }
  }, [handleOpen, visible]);

  if (!visible) {
    return null;
  }

  return (
    <Container>
      <StatusBar backgroundColor="rgba(0,0,0,0.4)" />
      <Overlay>
        <Content
          topMargin={topMargin}
          style={{
            transform: [
              {
                translateY: panY.y.interpolate({
                  inputRange: [-1, 0, 1],
                  outputRange: [0, 0, 1],
                }),
              },
            ],
          }}>
          <Header {...panRespoders.panHandlers}>
            <Text.Title>{title}</Text.Title>
            <CloseButton onPress={() => handleDismiss()}>
              <Icon name="chevron-down" size={24} color="#3dc77b" />
            </CloseButton>
          </Header>
          <ChildrenContent>{children}</ChildrenContent>
        </Content>
      </Overlay>
    </Container>
  );
};

export default BottomSheet;
