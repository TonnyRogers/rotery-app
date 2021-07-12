/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Shadow} from 'react-native-shadow-2';

import {NotificationsProps} from '../../utils/types';
import {setNoticationReadedRequest} from '../../store/modules/notifications/actions';
import * as RootNavigation from '../../RootNavigation';

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
    const notificationItem =
      typeof item.json_data === 'string'
        ? JSON.parse(item.json_data)
        : item.json_data;
    switch (item.alias) {
      case 'new_message': {
        RootNavigation.replace('DirectMessagesTabs');
        close();
        break;
      }
      case 'rate_itinerary': {
        navigation.navigate('ItineraryRate', {id: notificationItem.id});
        close();
        break;
      }
      case 'new_connection': {
        RootNavigation.replace('Connections');
        close();
        break;
      }
      case 'new_connection_accepted': {
        RootNavigation.replace('Connections');
        close();
        break;
      }
      case 'itinerary_question': {
        navigation.navigate('MyItineraryDetails', {
          id: notificationItem.itinerary_id,
        });
        close();
        break;
      }
      case 'itinerary_member_request': {
        navigation.navigate('MyItineraryDetails', {
          id: notificationItem.pivot.itinerary_id,
        });
        close();
        break;
      }
      case 'itinerary_answer': {
        navigation.navigate('FeedItineraryDetails', {
          id: notificationItem.itinerary_id,
        });
        close();
        break;
      }
      case 'itinerary_member_accepted': {
        navigation.navigate('NextItineraryDetails', {
          id: notificationItem.id,
        });
        close();
        break;
      }
      case 'itinerary_updated': {
        navigation.navigate('NextItineraryDetails', {
          id: notificationItem.id,
        });
        close();
        break;
      }
      default:
    }
  }

  return (
    <Shadow
      containerViewStyle={{
        flex: 1,
        margin: 8,
      }}
      contentViewStyle={{
        flex: 1,
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 12,
      }}
      radius={12}
      startColor="#00000009"
      finalColor="transparent"
      offset={[0, 0, 0, 0]}
      distance={5}>
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
    </Shadow>
  );
};

export default NotificationItem;
