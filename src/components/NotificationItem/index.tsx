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
import {formatLocale} from '../../providers/dayjs-format-locale';
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
    if (item.alias === NotificationAlias.NEW_MESSAGE) {
      RootNavigation.replace('DirectMessagesTabs');
      close();
    }
    if (item.alias === NotificationAlias.NEW_CHAT) {
      RootNavigation.replace('ChatMessages');
      close();
    }
    if (item.alias === NotificationAlias.RATE_ITINERARY) {
      const notificationItem: {id: number} = item.jsonData;
      navigation.navigate('ItineraryRate', {
        id: notificationItem.id,
      });
      close();
    }
    if (item.alias === NotificationAlias.RATE_LOCATION) {
      const notificationItem: RateChatNotificationJsonData = item.jsonData;
      RootNavigation.navigate<RateChatNotificationJsonData>(
        'RateChat',
        notificationItem,
      );
      close();
    }
    if (item.alias === NotificationAlias.NEW_CONNECTION) {
      RootNavigation.replace('Connections');
      close();
    }
    if (item.alias === NotificationAlias.CONNECTION_ACCEPTED) {
      RootNavigation.replace('Connections');
      close();
    }
    if (item.alias === NotificationAlias.NEW_QUESTION) {
      const notificationItem: QuestionProps = item.jsonData;
      navigation.navigate('MyItineraryDetails', {
        id: notificationItem.itinerary,
      });
      close();
    }
    if (item.alias === NotificationAlias.NEW_MEMBER) {
      const notificationItem: MemberProps = item.jsonData;
      navigation.navigate('MyItineraryDetails', {
        id: notificationItem.itinerary,
      });
      close();
    }
    if (item.alias === NotificationAlias.NEW_ANSWER) {
      const notificationItem: QuestionProps = item.jsonData;
      navigation.navigate('FeedItineraryDetails', {
        id: notificationItem.itinerary,
      });
      close();
    }
    if (item.alias === NotificationAlias.MEMBER_ACCEPTED) {
      const notificationItem: MemberProps = item.jsonData;
      navigation.navigate('NextItineraryDetails', {
        id: notificationItem.itinerary,
      });
      close();
    }
    if (item.alias === NotificationAlias.ITINERARY_UPDATED) {
      const notificationItem: ItineraryProps = item.jsonData;
      navigation.navigate('NextItineraryDetails', {
        id: notificationItem.id,
      });
      close();
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
