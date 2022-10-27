/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useMemo} from 'react';
import {View, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as RootNavigation from '../../RootNavigation';

import Page from '../../components/Page';
import {PageContainer} from '../../components/PageContainer';
import Card from '../../components/Card';
import RowGroup from '../../components/RowGroup';
import ImageContainer from '../../components/ImageContainer';
import Text from '../../components/Text';
import Button from '../../components/Button';

import {ConversationList, Message} from './styles';
import TextArea from '../../components/TextArea';
import Alert from '../../components/Alert';
import {theme} from '../../utils/theme';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateProps} from '../../store/modules/rootReducer';
import {
  ChatMessage,
  UserProps,
  RateChatNotificationJsonData,
  CanBeginChatResponse,
} from '../../utils/types';
import {
  getCurrentChatRequest,
  beginChatRequest,
  finishChatRequest,
} from '../../store/modules/chats/actions';
import {ChatType} from '../../utils/enums';
import {
  wsSendChatMessageRequest,
  wsChatSubscribe,
  wsCloseChatChannel,
} from '../../store/modules/websocket/actions';
import Empty from '../../components/Empty';
import formatLocale from '../../providers/dayjs-format-locale';
import {useUserIsGuide} from '../../hooks/useUserIsGuide';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
import {beginChatGuide} from '../../utils/constants';
import api from '../../providers/api';
import netConnection from '../../providers/netinfo';
import Toast from 'react-native-toast-message';
import ColumnGroup from '../../components/ColumnGroup';

export interface ChatRouteParams {
  target: UserProps;
  location?: {
    id: number;
    name: string;
    state: string;
  };
}

interface ChatProps {
  route: {
    params: ChatRouteParams;
  };
}

export function Chat({
  route: {
    params: {target, location},
  },
}: ChatProps) {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [isFinishChatAlertVisible, setFinishChatAlertVisible] = useState(false);
  const [chatLocationGuideVisible, setChatLocationGuideVisible] =
    useState(false);
  const [chatLimitMessageVisible, setChatLimitMessageVisible] = useState(false);
  const {isGuide} = useUserIsGuide();

  const {currentChat, loading} = useSelector(
    (state: RootStateProps) => state.chats,
  );
  const {user} = useSelector((state: RootStateProps) => state.auth);

  const lastChatItem = useMemo(() => currentChat[0], [currentChat]);
  const currentLocation = useMemo(() => {
    return {
      locationCityState:
        location?.state ?? lastChatItem?.jsonData?.locationCityState,
      locationId: location?.id ?? lastChatItem?.jsonData?.locationId,
      locationName: location?.name ?? lastChatItem?.jsonData?.locationName,
    };
  }, [lastChatItem, location]);

  function closeChatAlert() {
    setFinishChatAlertVisible(false);
  }

  function handleFinishChat() {
    dispatch(
      finishChatRequest({
        locationCityState: currentLocation.locationCityState,
        locationId: currentLocation.locationId,
        locationName: currentLocation.locationName,
        targetId: target.id,
      }),
    );

    if (!user?.isGuide && location) {
      RootNavigation.replace<RateChatNotificationJsonData>('RateChat', {
        guide: {
          id: target.id,
          createdAt: target.createdAt,
          profile: target.profile,
          username: target.username,
        },
        location,
      });
    }
    setFinishChatAlertVisible(false);
  }

  function handleSendMessage() {
    Keyboard.dismiss();
    dispatch(
      wsSendChatMessageRequest({
        receiver: {id: target.id},
        message: message,
      }),
    );
    setMessage('');
  }

  async function handleBeginChat() {
    if (location) {
      const info = await netConnection();

      if (!info.status) {
        return;
      }

      try {
        const response = await api.get<CanBeginChatResponse>(
          'chats/begin-validation',
        );

        if (!response.data.allowed) {
          setChatLimitMessageVisible(true);
          return;
        }

        dispatch(
          beginChatRequest({
            locationCityState: currentLocation.locationCityState,
            locationId: currentLocation.locationId,
            locationName: currentLocation.locationName,
            targetId: target.id,
          }),
        );

        return;
      } catch (error) {
        Toast.show({
          text1: 'Erro ao validar inicio do chat.',
          position: 'bottom',
          type: 'error',
        });
      }
    }

    setChatLocationGuideVisible(true);
  }

  const renderMessage = (item: ChatMessage) => {
    return (
      <Message isReply={item.sender.id !== user?.id} key={item.id}>
        <Text withLineBreak textColor="white">
          {item.message}
        </Text>
        <Text alignment="end" textColor="white">
          {formatLocale(item.createdAt, 'DD MMM YY HH:mm')}
        </Text>
      </Message>
    );
  };

  function navigateToSubscription() {
    setChatLimitMessageVisible(false);
    RootNavigation.goBack();
    RootNavigation.goBack();
    RootNavigation.navigate('BackpackerSubscription');
  }

  useEffect(() => {
    dispatch(getCurrentChatRequest(target.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.id]);

  useEffect(() => {
    user && dispatch(wsChatSubscribe(user?.id, target.id));

    return () => {
      user && dispatch(wsCloseChatChannel(user?.id, target.id));
    };
  }, [dispatch, target.id, user]);

  if (!user?.id || !currentChat) {
    return (
      <Empty onPressTo={() => RootNavigation.goBack()} buttonText="Voltar" />
    );
  }

  return (
    <Page showHeader={false}>
      <PageContainer isScrollable={false}>
        <RowGroup isFlex={false}>
          <Button
            onPress={() => RootNavigation.goBack()}
            customContent
            sizeHeight={4}
            sizeWidth={4}
            sizeBorderRadius={20}
            sizePadding={0}
            sizeMargin="1rem 0 0 0"
            bgColor="greenTransparent"
            textColor="white">
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </Button>
          {lastChatItem?.type !== ChatType.END && (
            <Button
              onPress={() => setFinishChatAlertVisible(true)}
              customContent
              sizeHeight={4}
              sizeWidth={4}
              sizeBorderRadius={20}
              sizePadding={0}
              sizeMargin="1rem 0 0 0"
              bgColor="redTransparent"
              textColor="white">
              <Icon
                name="chat-remove-outline"
                size={24}
                color={theme.colors.red}
              />
            </Button>
          )}
        </RowGroup>
        <Card
          marginHorizontal={0}
          marginVertical={8}
          containerStyle={{
            marginBottom:
              lastChatItem && lastChatItem?.type !== ChatType.END
                ? 60
                : undefined,
          }}>
          <RowGroup isFlex={false} justify="flex-start">
            <ImageContainer url={target.profile.file?.url || ''} />
            <View>
              <Text.Paragraph
                limitter={27}
                maxLines={1}
                textColor="primaryText"
                textWeight="bold">
                {target.username}
              </Text.Paragraph>
              <Text
                limitter={27}
                maxLines={1}
                textColor="secondaryText"
                textWeight="light">
                Sobre:{' '}
                {`${currentLocation.locationName ?? 'indefinido'} (${
                  currentLocation.locationCityState ?? '--'
                })`}
              </Text>
            </View>
          </RowGroup>
          <ConversationList
            data={currentChat}
            initialNumToRender={4}
            removeClippedSubviews
            keyExtractor={(item: any) => String(item.id)}
            renderItem={({item}: any) => renderMessage(item)}
            showsVerticalScrollIndicator={false}
            snapToEnd
            inverted
            refreshing={loading}
          />
        </Card>
        {((!lastChatItem && !isGuide) ||
          (lastChatItem?.type === ChatType.END && !isGuide)) && (
          <RowGroup justify="flex-end" isFlex={false}>
            <Button
              onPress={handleBeginChat}
              customContent
              sizeHeight={4.4}
              sizeBorderRadius={8}
              sizeMargin="0.5rem 0"
              sizePadding={8}
              bgColor="green"
              textColor="white">
              <RowGroup isFlex={false} align="center">
                <Icon name="chat-plus-outline" size={24} color="#FFF" />
                <Text.Paragraph textColor="white" textWeight="bold">
                  Iniciar Chat
                </Text.Paragraph>
              </RowGroup>
            </Button>
          </RowGroup>
        )}
        {lastChatItem && lastChatItem?.type !== ChatType.END && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 10,
              height: 85,
              marginBottom: 0,
              paddingHorizontal: 10,
            }}>
            <RowGroup isFlex align="center" justify="center">
              <TextArea
                placeholder="Descreva sua duvida..."
                value={message}
                onChange={(value: string) => setMessage(value)}
                isFlex
              />
              {message !== '' && (
                <Button
                  onPress={handleSendMessage}
                  customContent
                  sizeHeight={4}
                  sizeWidth={4}
                  sizeBorderRadius={20}
                  sizeMargin="1rem 0 0 0.5rem"
                  sizePadding={8}
                  bgColor="blue"
                  textColor="white">
                  <RowGroup isFlex={false} align="center">
                    <Icon name="send-outline" size={24} color="#FFF" />
                  </RowGroup>
                </Button>
              )}
            </RowGroup>
          </View>
        )}
      </PageContainer>
      <Alert
        visible={isFinishChatAlertVisible}
        onRequestClose={closeChatAlert}
        message="Deseja realmente finalizar este chat? Você tera que iniciar outro se confirmar."
        title="Finalizar Chat"
        onConfirm={handleFinishChat}
        onCancel={closeChatAlert}
      />
      <Ads
        visible={chatLocationGuideVisible}
        onRequestClose={() => {}}
        key="chat-guide">
        <GuideCarousel
          data={beginChatGuide}
          onClose={() => setChatLocationGuideVisible(false)}
        />
      </Ads>
      <Ads
        visible={chatLimitMessageVisible}
        onRequestClose={() => {}}
        key="chat-limit-message">
        <>
          <ColumnGroup>
            <Text.Title alignment="start">Você chegou ao limite 🥺</Text.Title>
            <Text>
              Utilizando o app no plano gratuito você tem o limite de um chat
              com guia por mês, mas você deseja mais ?
            </Text>
            <ImageContainer.Hero
              sizeStyle="square"
              fit="cover"
              url="https://rotery-filestore.nyc3.digitaloceanspaces.com/hero-gestao-no-app-square.webp"
            />
            <Text>
              Sem problemas! Assine agora mesmo o plano base para ter direito a
              chats ilimitados com os melhores guias do Brasil 🇧🇷
            </Text>
          </ColumnGroup>
          <RowGroup isFlex={false} justify="space-between">
            <Button
              onPress={() => setChatLimitMessageVisible(false)}
              customContent
              sizeHeight={4.4}
              sizeMargin="1rem 0 0 0.5rem"
              sizePadding={8}
              bgColor="red"
              textColor="white">
              <Text.Paragraph textColor="white" textWeight="bold">
                Não, obrigado
              </Text.Paragraph>
            </Button>
            <Button
              onPress={navigateToSubscription}
              customContent
              sizeHeight={4.4}
              sizeMargin="1rem 0 0 0.5rem"
              sizePadding={8}
              bgColor="blue"
              textColor="white">
              <Text.Paragraph textColor="white" textWeight="bold">
                Saber mais!
              </Text.Paragraph>
            </Button>
          </RowGroup>
        </>
      </Ads>
    </Page>
  );
}
