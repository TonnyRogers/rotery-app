import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

import {NotificationsProps} from '../../store/modules/notifications/reducer';
import {setNoticationReadedRequest} from '../../store/modules/notifications/actions';

import {
  Container,
  ColumGroup,
  Subject,
  Type,
  RowGroup,
  DateText,
  NotificationButton,
} from './styles';

interface NotificationItemProps {
  notification: NotificationsProps;
  close: any;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  close,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function formatDate(date: string) {
    return format(parse(date, 'yyyy-MM-dd HH:mm:ss', new Date()), 'dd MMM', {
      locale: pt,
    });
  }

  function notificationActionHandle(item: NotificationsProps) {
    dispatch(setNoticationReadedRequest(item.id));
    switch (item.alias) {
      case 'new_message': {
        navigation.navigate('DirectMessagesTabs');
        close();
        break;
      }
      case 'rate_itinerary': {
        navigation.navigate('DirectMessagesTabs');
        close();
        break;
      }
      case 'new_connection': {
        navigation.navigate('Connections');
        close();
        break;
      }
      case 'new_connection_accepted': {
        navigation.navigate('Connections');
        close();
        break;
      }
      case 'itinerary_update': {
        navigation.navigate('NextItineraryDetails', {id: 1});
        close();
        break;
      }
      case 'itinerary_question': {
        navigation.navigate('MyItineraryDetails', {
          id: item.json_data.itinerary_id,
        });
        close();
        break;
      }
      case 'itinerary_member_request': {
        navigation.navigate('MyItineraryDetails', {
          id: item.json_data.itinerary_id,
        });
        close();
        break;
      }
      case 'itinerary_answer': {
        navigation.navigate('NextItineraryDetails', {
          id: item.json_data.itinerary_id,
        });
        close();
        break;
      }
      case 'itinerary_member_accepted': {
        navigation.navigate('NextItineraryDetails', {
          id: item.json_data.itinerary_id,
        });
        close();
        break;
      }
      case 'itinerary_updated': {
        navigation.navigate('NextItineraryDetails', {
          id: item.json_data.id,
        });
        close();
        break;
      }
      default:
    }
  }

  return (
    <Container onPress={() => notificationActionHandle(notification)}>
      <ColumGroup>
        <Subject>{notification.subject}</Subject>
        <Type>{notification.content}</Type>
      </ColumGroup>
      <RowGroup>
        <DateText>{formatDate(notification.created_at)}</DateText>
        <NotificationButton>
          <Icon name="bell-ring-outline" size={24} color="#FFF" />
        </NotificationButton>
      </RowGroup>
    </Container>
  );
};

export default NotificationItem;
