import React, {useEffect, useCallback, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform, Dimensions, Animated, PanResponder} from 'react-native';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';

import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  Header,
  KeyboardAvoidingView,
  Title,
  CloseButton,
  ImageItem,
} from './styles';

interface AdsProps {
  title?: string;
  visible: boolean;
  onRequestClose(value: boolean): any;
  icon?: string;
  iconColor?: string;
}

const Ads: React.FC<AdsProps> = ({
  visible,
  onRequestClose,
  icon,
  iconColor,
  title,
  children,
}) => {
  const {data} = useSelector((state: RootStateProps) => state.notifications);
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
    }, 400);
  }, [height, onRequestClose, panY.y]);

  useEffect(() => {
    if (visible === true) {
      handleOpen();
    } else {
      handleDismiss();
    }
  }, [handleDismiss, handleOpen, visible]);

  return (
    <Container
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={() => onRequestClose(false)}
      statusBarTranslucent>
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
          {/* <CloseButton onPress={handleDismiss}>
            <Icon name="chevron-up" size={24} color="#808080" />
          </CloseButton> */}
          {/* <Header>
            <Icon name={icon} size={24} color={iconColor} />
            <Title>{title}</Title>
          </Header> */}
          {children}
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Ads;
