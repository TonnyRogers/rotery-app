/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {format} from 'date-fns';
import {pt} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, Keyboard} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  getConversationRequest,
  sendMessageRequest,
} from '../../store/modules/messages/actions';
import {
  wsChatSubscribe,
  wsCloseChatChannel,
} from '../../store/modules/websocket/actions';
import {MessageProps} from '../../utils/types';
import * as RootNavigation from '../../RootNavigation';

import {
  Container,
  CardHeader,
  BackButton,
  CardContent,
  UserInfo,
  UserButton,
  UserImage,
  ColumnGroup,
  RowGroup,
  RowGroupSpaced,
  Name,
  JoinDate,
  ConversationList,
  MessageContent,
  Message,
  MessageDate,
  ReplyContent,
  MessageForm,
  SendButton,
  SendButtonText,
  ShareTitle,
  ShareSubTitle,
  ShareButton,
  ShareButtonText,
} from './styles';

import Card from '../../components/Card';
import TextArea from '../../components/TextArea';
import {RootStateProps} from '../../store/modules/rootReducer';
import Page from '../../components/Page';
import {toDateTimeZone} from '../../utils/helpers';
import ShadowBox from '../../components/ShadowBox';

const validationSchema = yup.object().shape({
  message: yup.string().required('campo obrigatório'),
});

interface UserConversation {
  route: {
    params: {
      userId: number;
    };
  };
}

const UserConversation: React.FC<UserConversation> = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});

  const watchMessage = watch('message');
  const scrollViewRef = useRef<ScrollView>();
  const messageRef = useRef<any>();
  const {userId} = route.params;
  const {user} = useSelector((state: RootStateProps) => state.auth);
  const {conversation} = useSelector((state: RootStateProps) => state.messages);
  const {itineraries} = useSelector(
    (state: RootStateProps) => state.itineraries,
  );
  const {itineraries: nextItineraries} = useSelector(
    (state: RootStateProps) => state.nextItineraries,
  );

  useEffect(() => {
    register('message');
  }, [register]);

  useEffect(() => {
    dispatch(getConversationRequest(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(wsChatSubscribe(user.id, userId));
    return function cleanup() {
      dispatch(wsCloseChatChannel(user.id, userId));
    };
  }, [dispatch, userId, user.id]);

  useEffect(
    () => scrollViewRef.current?.scrollToEnd({animated: true}),
    [conversation],
  );

  const sender = conversation?.find((item) => item.sender_id === userId);

  const formatDate = useCallback(
    (date?: string, withParser: boolean = true) => {
      if (date) {
        const zonedDate = toDateTimeZone(date);
        if (withParser) {
          return format(zonedDate, 'dd MMM yyyy H:mm', {
            locale: pt,
          });
        }

        return format(zonedDate, 'dd MMM yyyy H:mm', {
          locale: pt,
        });
      }
    },
    [],
  );

  const handleSendMessage = (data: any) => {
    Keyboard.dismiss();
    dispatch(sendMessageRequest(userId, data.message));
    setValue('message', '');
  };

  const handleMessageNavigation = useCallback(
    (itineraryId: number) => {
      const isMember = nextItineraries?.find((item) => item.id === itineraryId);
      const isOwner = itineraries?.find((item) => item.id === itineraryId);

      if (isMember) {
        RootNavigation.navigate('NextItineraryDetails', {id: itineraryId});
      }

      if (isOwner) {
        RootNavigation.navigate('MyItineraryDetails', {id: itineraryId});
      }

      if (!isMember && !isOwner) {
        RootNavigation.navigate('DynamicItineraryDetails', {
          id: itineraryId,
        });
      }
    },
    [itineraries, nextItineraries],
  );

  const renderMessage = useCallback(() => {
    const reverseConversation: MessageProps[] = JSON.parse(
      JSON.stringify(conversation),
    );
    return reverseConversation.reverse().map((messageItem) => {
      switch (messageItem.type) {
        case 'message':
          if (messageItem.sender_id === user.id) {
            return (
              <ReplyContent key={messageItem.id}>
                <Message>{messageItem.message}</Message>
                <MessageDate>{formatDate(messageItem.created_at)}</MessageDate>
              </ReplyContent>
            );
          } else {
            return (
              <MessageContent key={messageItem.id}>
                <Message>{messageItem.message}</Message>
                <MessageDate>{formatDate(messageItem.created_at)}</MessageDate>
              </MessageContent>
            );
          }
        case 'itinerary_invite':
          return (
            <ShadowBox key={messageItem.id}>
              <ShareTitle>{messageItem.json_data?.name}</ShareTitle>
              <RowGroupSpaced>
                <ShareSubTitle>{messageItem.json_data?.location}</ShareSubTitle>
                <ShareSubTitle>
                  {formatDate(messageItem.json_data?.begin, false)}
                </ShareSubTitle>
              </RowGroupSpaced>
              <ShareButton
                onPress={() =>
                  handleMessageNavigation(Number(messageItem.json_data?.id))
                }>
                <ShareButtonText>Ver Mais</ShareButtonText>
              </ShareButton>
            </ShadowBox>
          );
        default:
          break;
      }
    });
  }, [conversation, formatDate, handleMessageNavigation, user.id]);

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Page showHeader={false}>
      <Container>
        <RowGroup>
          <BackButton onPress={goBack}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
          <UserInfo>
            <UserButton>
              <UserImage
                source={{
                  uri:
                    sender && sender.sender.person.file
                      ? sender.sender.person.file.url
                      : undefined,
                }}
                resizeMode="cover"
              />
            </UserButton>
            <ColumnGroup>
              <Name>{sender && sender.sender.username}</Name>
              <JoinDate>Conversa</JoinDate>
            </ColumnGroup>
          </UserInfo>
        </RowGroup>
        <Card>
          <CardHeader />
          <CardContent>
            {/* mudar para Flatlist ou VirtualizedList */}
            <ConversationList
              ref={scrollViewRef}
              contentContainerStyle={{padding: 6}}>
              {renderMessage()}
            </ConversationList>

            <MessageForm>
              <TextArea
                value={watchMessage}
                onChange={(value: string) => setValue('message', value)}
                ref={messageRef}
                placeholder="Digite sua mensagem"
                error={errors.message?.message}
              />
              <SendButton onPress={handleSubmit(handleSendMessage)}>
                <Icon name="send-outline" size={24} color="#FFF" />
                <SendButtonText>Enviar</SendButtonText>
              </SendButton>
            </MessageForm>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default UserConversation;
