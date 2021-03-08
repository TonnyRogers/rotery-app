import React, {useRef, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Animated, Dimensions, PanResponder} from 'react-native';

import {
  Content,
  Overlay,
  Container,
  Header,
  CloseButton,
  Title,
  ChildrenContent,
} from './styles';
interface BottomSheetProps {
  visible: boolean;
  onRequestClose(state: any): any;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onRequestClose,
  children,
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
      onRequestClose(false);
    }, 200);
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
    } else {
      handleDismiss();
    }
  }, [handleDismiss, handleOpen, visible]);

  return (
    <>
      {visible && (
        <Container>
          <Overlay>
            <Content
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
                <Title>Convidar Para Roteiro</Title>
                <CloseButton onPress={() => handleDismiss()}>
                  <Icon name="chevron-down" size={24} color="#3dc77b" />
                </CloseButton>
              </Header>
              <ChildrenContent>{children}</ChildrenContent>
            </Content>
          </Overlay>
        </Container>
      )}
    </>
  );
};

export default BottomSheet;
