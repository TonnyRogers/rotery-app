import React, {useEffect, useCallback, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions, Animated, PanResponder, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';

import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  Header,
  NotificationList,
  CloseButton,
} from './styles';

interface NotificationProps {
  title: string;
  visible: boolean;
  onRequestClose(value: boolean): any;
  icon: string;
  iconColor: string;
}
import NotificationItem from '../NotificationItem';
import Text from '../Text';

const Notification: React.FC<NotificationProps> = ({
  visible,
  onRequestClose,
  icon,
  iconColor,
  title,
}) => {
  const {data} = useSelector((state: RootStateProps) => state.notifications);
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
      onRequestClose(false);
    }, 400);
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
    } else {
      handleDismiss();
    }
  }, [handleDismiss, handleOpen, visible]);

  const renderNotifications = useCallback(() => {
    function childClose() {
      onRequestClose(false);
    }

    return data?.map((item) => (
      <NotificationItem key={item?.id} notification={item} close={childClose} />
    ));
  }, [data, onRequestClose]);
  return (
    <>
      {visible && (
        <Container>
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
                <Icon name={icon} size={24} color={iconColor} />
                <Text.Title>{title}</Text.Title>
              </Header>
              <NotificationList>{renderNotifications()}</NotificationList>
              <CloseButton onPress={handleDismiss}>
                <Icon name="chevron-up" size={24} color="#808080" />
              </CloseButton>
            </Content>
          </SafeAreaView>
        </Container>
      )}
    </>
  );
};

export default Notification;
