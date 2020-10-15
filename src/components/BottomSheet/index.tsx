import React, {useRef, useEffect, useCallback} from 'react';
import {
  View,
  Modal,
  Animated,
  Dimensions,
  PanResponder,
  Text,
  TouchableOpacity,
} from 'react-native';

import {Content, Overlay} from './styles';

interface BottomSheetProps {
  visible: boolean;
  onRequestClose(state: any): any;
}

const BottomSheet: React.FC<BottomSheetProps> = ({visible, onRequestClose}) => {
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
    <Modal
      animated
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleDismiss}>
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
          }}
          {...panRespoders.panHandlers}>
          <View>
            <TouchableOpacity onPress={() => handleDismiss()}>
              <Text>FECHAR</Text>
            </TouchableOpacity>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
            <Text>BOoooooora</Text>
          </View>
        </Content>
      </Overlay>
    </Modal>
  );
};

export default BottomSheet;
