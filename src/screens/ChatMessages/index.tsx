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
import {RootStateProps} from '../../store/modules/rootReducer';
import {getChatMessagesRequest} from '../../store/modules/chats/actions';
import {ChatRouteParams} from '../Chat';
import {UserProps} from '../../utils/types';
import {useUserIsHost} from '../../hooks/useUserIsHost';

export function ChatMessages() {
  const dispatch = useDispatch();

  const {chats} = useSelector((state: RootStateProps) => state.chats);
  const {conditionalRender} = useUserIsHost();

  function toChat(target: UserProps) {
    RootNavigation.navigate<ChatRouteParams>('Chat', {target});
    console.tron.log('ALooo');
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
    dispatch(getChatMessagesRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </Page>
  );
}
