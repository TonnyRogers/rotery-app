import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform} from 'react-native';
import {useSelector} from 'react-redux';

import {RootStateProps} from '../../store/modules/rootReducer';

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
  const {data} = useSelector((state: RootStateProps) => state.notifications);

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
            <Icon name={icon} size={24} color={iconColor} />
            <Title>{title}</Title>
          </Header>
          <NotificationList>
            {data &&
              data.map((item) => (
                <NotificationItem
                  key={item?.id}
                  notification={item}
                  close={onRequestClose()}
                />
              ))}
          </NotificationList>
          {children}
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Notification;
