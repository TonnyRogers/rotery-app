/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScrollView, Keyboard} from 'react-native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {getConversationRequest} from '../../store/modules/messages/actions';
import {
  wsChatSubscribe,
  wsCloseChatChannel,
  wsSendChatMessageRequest,
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
import ShadowBox from '../../components/ShadowBox';
import {formatLocale} from '../../providers/dayjs-format-locale';
import {YupValidationMessages} from '../../utils/enums';

const validationSchema = yup.object().shape({
  message: yup.string().required(YupValidationMessages.REQUIRED),
});

export interface UserConversationParams {
  userId: number;
  username: string;
  avatarUrl?: string;
}

interface UserConversationRouteParams {
  route: {
    params: UserConversationParams;
  };
}

const UserConversation: React.FC<UserConversationRouteParams> = ({route}) => {
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
  const {userId, username, avatarUrl} = route.params;
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
    dispatch(wsChatSubscribe(Number(user?.id), userId));
    return function cleanup() {
      dispatch(wsCloseChatChannel(Number(user?.id), userId));
    };
  }, [dispatch, userId, user]);

  useEffect(
    () => scrollViewRef.current?.scrollToEnd({animated: true}),
    [conversation],
  );

  const formatDate = useCallback(
    (date?: string, withParser: boolean = true) => {
      if (date) {
        if (withParser) {
          return formatLocale(date, 'DD MMM YYYY H:mm');
        }

        return formatLocale(date, 'DD MMM YYYY H:mm');
      }
    },
    [],
  );

  const handleSendMessage = (data: any) => {
    Keyboard.dismiss();
    dispatch(
      wsSendChatMessageRequest({receiver: {id: userId}, message: data.message}),
    );
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

  const renderMessage: Function = (item: MessageProps) => {
    switch (item.type) {
      case 'message':
        if (item.sender.id === user?.id) {
          return (
            <ReplyContent key={item.id}>
              <Message>{item.message}</Message>
              <MessageDate>{formatDate(item.createdAt)}</MessageDate>
            </ReplyContent>
          );
        } else {
          return (
            <MessageContent key={item.id}>
              <Message>{item.message}</Message>
              <MessageDate>{formatDate(item.createdAt)}</MessageDate>
            </MessageContent>
          );
        }
      case 'itinerary_invite':
        return (
          <ShadowBox key={item.id}>
            <ShareTitle>{item.jsonData?.name}</ShareTitle>
            <RowGroupSpaced>
              <ShareSubTitle>{item.jsonData?.location}</ShareSubTitle>
              <ShareSubTitle>
                {formatDate(item.jsonData?.begin, false)}
              </ShareSubTitle>
            </RowGroupSpaced>
            <ShareButton
              onPress={() =>
                handleMessageNavigation(Number(item.jsonData?.id))
              }>
              <ShareButtonText>Ver Mais</ShareButtonText>
            </ShareButton>
          </ShadowBox>
        );
      default:
        break;
    }
  };

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
                  uri: avatarUrl,
                }}
                resizeMode="cover"
              />
            </UserButton>
            <ColumnGroup>
              <Name>{username}</Name>
              <JoinDate>Conversa</JoinDate>
            </ColumnGroup>
          </UserInfo>
        </RowGroup>
        <Card>
          <CardHeader />
          <CardContent>
            <ConversationList
              data={conversation}
              initialNumToRender={4}
              removeClippedSubviews
              keyExtractor={(item: any) => String(item.id)}
              renderItem={({item}: any) => renderMessage(item)}
              snapToEnd
              contentContainerStyle={{padding: 6}}
              inverted
            />

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
