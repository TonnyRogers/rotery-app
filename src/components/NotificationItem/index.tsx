/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {Shadow} from 'react-native-shadow-2';

import {
  NotificationsProps,
  QuestionProps,
  MemberProps,
  ItineraryProps,
} from '../../utils/types';
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
import formatLocale from '../../providers/dayjs-format-locale';
interface NotificationItemProps {
  notification: NotificationsProps<any>;
  close: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  close,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function formatDate(date: string) {
    return formatLocale(date, 'DD MMM');
  }

  function notificationActionHandle(item: NotificationsProps<any>) {
    dispatch(setNoticationReadedRequest(item.id));
    switch (item.alias) {
      case 'new_message': {
        RootNavigation.replace('DirectMessagesTabs');
        close();
        break;
      }
      case 'rate_itinerary': {
        const notificationItem: {id: number} = item.jsonData;
        navigation.navigate('ItineraryRate', {
          id: notificationItem.id,
        });
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
        const notificationItem: QuestionProps = item.jsonData;
        navigation.navigate('MyItineraryDetails', {
          id: notificationItem.itinerary,
        });
        close();
        break;
      }
      case 'itinerary_member_request': {
        const notificationItem: MemberProps = item.jsonData;
        navigation.navigate('MyItineraryDetails', {
          id: notificationItem.itinerary,
        });
        close();
        break;
      }
      case 'itinerary_answer': {
        const notificationItem: QuestionProps = item.jsonData;
        navigation.navigate('FeedItineraryDetails', {
          id: notificationItem.itinerary,
        });
        close();
        break;
      }
      case 'itinerary_member_accepted': {
        const notificationItem: MemberProps = item.jsonData;
        navigation.navigate('NextItineraryDetails', {
          id: notificationItem.itinerary,
        });
        close();
        break;
      }
      case 'itinerary_updated': {
        const notificationItem: ItineraryProps = item.jsonData;
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
          <DateText>{formatDate(notification.createdAt)}</DateText>
          <NotificationButton>
            <Icon name="bell-ring-outline" size={24} color="#FFF" />
          </NotificationButton>
        </RowGroup>
      </Container>
    </Shadow>
  );
};

export default NotificationItem;
