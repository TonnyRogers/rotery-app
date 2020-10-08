import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  ColumGroup,
  Subject,
  Type,
  RowGroup,
  Date,
  NotificationButton,
} from './styles';

interface NotificationItemProps {
  notification: any;
}

const NotificationItem: React.FC<NotificationItemProps> = ({notification}) => {
  return (
    <Container>
      <ColumGroup>
        <Subject>Trilha do Elefante</Subject>
        <Type>{notification.content}</Type>
      </ColumGroup>
      <RowGroup>
        <Date>21 Jun</Date>
        <NotificationButton>
          <Icon name="bell-ring-outline" size={24} color="#FFF" />
        </NotificationButton>
      </RowGroup>
    </Container>
  );
};

export default NotificationItem;
