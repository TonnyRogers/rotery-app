import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';

import {
  Container,
  Content,
  Header,
  KeyboardAvoidingView,
  Title,
  NotificationList,
} from './styles';

interface NotificationProps {
  title: string;
  visible: boolean;
  onRequestClose: () => {};
  icon: string;
  iconColor: string;
}
import NotificationItem from '../NotificationItem';

const Notification: React.FC<NotificationProps> = ({
  visible,
  onRequestClose,
  children,
  icon,
  iconColor,
  title,
}) => {
  return (
    <Container
      visible={visible}
      animationType="fade"
      onRequestClose={() => onRequestClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Content>
          <Header>
            <Icon name={icon} size={24} color={iconColor} />
            <Title>{title}</Title>
          </Header>
          <NotificationList>
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
          </NotificationList>
          {children}
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Notification;
