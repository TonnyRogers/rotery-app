import React, {useEffect, useCallback, useRef} from 'react';
import {Platform, Dimensions, Animated, StatusBar} from 'react-native';

import {Container, Content, KeyboardAvoidingView} from './styles';

interface AdsProps {
  title?: string;
  visible: boolean;
  onRequestClose(): void;
  icon?: string;
  iconColor?: string;
}

const Ads: React.FC<AdsProps> = ({visible, onRequestClose, children}) => {
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
    }, 400);
  }, [height, onRequestClose, panY.y]);

  useEffect(() => {
    if (visible === true) {
      handleOpen();
    } else {
      handleDismiss();
    }
  }, [handleDismiss, handleOpen, visible]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0.4)" />
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
            }}>
            {children}
          </Content>
        </KeyboardAvoidingView>
      </Container>
    </>
  );
};

export default Ads;
