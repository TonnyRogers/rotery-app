import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import {View} from 'react-native';

import * as RootNavigation from '../../RootNavigation';

import Page from '../../components/Page';
import {PageContainer} from '../../components/PageContainer';
import Card from '../../components/Card';
import RowGroup from '../../components/RowGroup';
import Text from '../../components/Text';
import {theme} from '../../utils/theme';
import ShadowBox from '../../components/ShadowBox';
import ImageContainer from '../../components/ImageContainer';

import {ChatButton, MessageCounter, Header} from './styles';
import {SimpleList} from '../../components/SimpleList';
import {useDispatch, useSelector} from 'react-redux';
import {getChats} from '../../store2/chats';
import {ChatRouteParams} from '../Chat';
import {UserProps} from '../../utils/types';
import {useUserIsGuide} from '../../hooks/useUserIsGuide';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
import {viewedGuide} from '../../store2/guides';
import {RootState} from '../../providers/store';
import {GuideEnum} from '../../utils/enums';

export function ChatMessages() {
  const dispatch = useDispatch();

  const {chats} = useSelector((state: RootState) => state.chats);
  const {
    chatsGuide,
    data: {chatsContent},
  } = useSelector((state: RootState) => state.guides);
  const {conditionalRender} = useUserIsGuide();

  function toChat(target: UserProps) {
    RootNavigation.navigate<ChatRouteParams>('Chat', {target});
  }

  function renderChats() {
    return chats.map((item) => (
      <ChatButton onPress={() => toChat(item.sender)} key={item.id}>
        <ShadowBox margin={0}>
          <RowGroup align="center">
            <RowGroup isFlex={false}>
              <ImageContainer url={item.sender.profile.file?.url || ''} />
              <View>
                <Text.Paragraph
                  limitter={20}
                  maxLines={1}
                  textColor="primaryText"
                  textWeight="bold">
                  {item.sender.username}
                </Text.Paragraph>
                <Text
                  limitter={20}
                  maxLines={1}
                  textColor="secondaryText"
                  textWeight="light">
                  Sobre:{' '}
                  {`${item.jsonData?.locationName ?? 'indefinido'} (${
                    item.jsonData?.locationCityState ?? '--'
                  })`}
                </Text>
              </View>
            </RowGroup>
            <MessageCounter>
              <Text textColor="white" textWeight="bold">
                {item.unreadedCount}
              </Text>
            </MessageCounter>
          </RowGroup>
        </ShadowBox>
      </ChatButton>
    ));
  }

  useEffect(() => {
    dispatch(getChats());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const guideContent = chatsContent.map((content) => ({
    isAnimation: content.isAnimation,
    url: content.externalUrl ?? '',
    message: content.content ?? '',
    title: content.title ?? '',
    withInfo: content.withInfo,
  }));

  return (
    <Page>
      <PageContainer isScrollable={false}>
        <Card marginHorizontal={0}>
          <Header>
            {conditionalRender(
              <>
                <Icon name="bag-personal" size={24} color={theme.colors.blue} />
                <Text.Title>Chat com Mochileiros</Text.Title>
              </>,
              <>
                <IconMaterial
                  name="person-pin-circle"
                  size={24}
                  color={theme.colors.blue}
                />
                <Text.Title>Chat com Guias</Text.Title>
              </>,
            )}
          </Header>
          <SimpleList>{renderChats()}</SimpleList>
        </Card>
      </PageContainer>
      <Ads visible={chatsGuide} onRequestClose={() => {}} key="guide-welcome">
        <GuideCarousel
          data={guideContent}
          onClose={() => dispatch(viewedGuide({key: GuideEnum.CHAT}))}
        />
      </Ads>
    </Page>
  );
}
