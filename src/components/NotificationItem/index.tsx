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

const NotificationItem: React.FC = () => {
  return (
    <Container>
      <ColumGroup>
        <Subject>Trilha do Elefante</Subject>
        <Type>Avaliar roteiro</Type>
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
