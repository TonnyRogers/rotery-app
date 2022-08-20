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
  NotificationAlias,
  RateChatNotificationJsonData,
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
    // called when user click in notification component
    switch (item.alias) {
      case NotificationAlias.NEW_MESSAGE: {
        RootNavigation.replace('DirectMessagesTabs');
        close();
        break;
      }
      case NotificationAlias.NEW_CHAT: {
        RootNavigation.replace('ChatMessages');
        close();
        break;
      }
      case NotificationAlias.RATE_ITINERARY: {
        const notificationItem: {id: number} = item.jsonData;
        navigation.navigate('ItineraryRate', {
          id: notificationItem.id,
        });
        close();
        break;
      }
      case NotificationAlias.RATE_LOCATION: {
        const notificationItem: RateChatNotificationJsonData = item.jsonData;
        RootNavigation.navigate<RateChatNotificationJsonData>(
          'RateChat',
          notificationItem,
        );
        close();
        break;
      }
      case NotificationAlias.NEW_CONNECTION: {
        RootNavigation.replace('Connections');
        close();
        break;
      }
      case NotificationAlias.CONNECTION_ACCEPTED: {
        RootNavigation.replace('Connections');
        close();
        break;
      }
      case NotificationAlias.NEW_QUESTION: {
        const notificationItem: QuestionProps = item.jsonData;
        navigation.navigate('MyItineraryDetails', {
          id: notificationItem.itinerary,
        });
        close();
        break;
      }
      case NotificationAlias.NEW_MEMBER: {
        const notificationItem: MemberProps = item.jsonData;
        navigation.navigate('MyItineraryDetails', {
          id: notificationItem.itinerary,
        });
        close();
        break;
      }
      case NotificationAlias.NEW_ANSWER: {
        const notificationItem: QuestionProps = item.jsonData;
        navigation.navigate('FeedItineraryDetails', {
          id: notificationItem.itinerary,
        });
        close();
        break;
      }
      case NotificationAlias.MEMBER_ACCEPTED: {
        const notificationItem: MemberProps = item.jsonData;
        navigation.navigate('NextItineraryDetails', {
          id: notificationItem.itinerary,
        });
        close();
        break;
      }
      case NotificationAlias.ITINERARY_UPDATED: {
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
      startColor="#00000007"
      finalColor="transparent"
      offset={[0, 0, 0, 0]}
      distance={7}>
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
