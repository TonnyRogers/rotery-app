import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  CardContent,
  MessageList,
  UserMessage,
  UserInfo,
  UserButton,
  UserImage,
  ColumnGroup,
  Name,
  JoinDate,
  Actions,
  TitleContent,
  MessageButton,
  MessageButtonText,
} from './styles';
import Card from '../../components/Card';
import Page from '../../components/Page';
import Text from '../../components/Text';
import formatLocale from '../../providers/dayjs-format-locale';

const DirectMessages: React.FC = () => {
  const navigation = useNavigation();

  const formatDate = useCallback((date: string) => {
    return formatLocale(date, 'DD MMM YYYY H[h]');
  }, []);

  const {messages} = useSelector((state: RootStateProps) => state.messages);
  const {connections} = useSelector(
    (state: RootStateProps) => state.connections,
  );

  const getUserConversation = useCallback(
    (userId: number) => {
      navigation.navigate('UserConversation', {userId});
    },
    [navigation],
  );

  const validateConnetions = useCallback(() => {
    return messages.map(
      (message) =>
        connections?.find(
          (connect) =>
            connect.target.id === message.sender.id &&
            connect.isBlocked !== true,
        ) && (
          <UserMessage
            key={message.id}
            onPress={() => getUserConversation(message.sender.id)}>
            <UserInfo>
              <UserButton>
                <UserImage
                  source={{
                    uri: message.sender.profile.file?.url,
                  }}
                  resizeMode="cover"
                />
              </UserButton>
              <ColumnGroup>
                <Name>{message.sender.username}</Name>
                <JoinDate>Atividade: {formatDate(message.createdAt)}</JoinDate>
              </ColumnGroup>
            </UserInfo>
            <Actions>
              {message.unreaded > 0 && (
                <MessageButton>
                  <MessageButtonText>{message.unreaded}</MessageButtonText>
                </MessageButton>
              )}
            </Actions>
          </UserMessage>
        ),
    );
  }, [connections, formatDate, getUserConversation, messages]);

  return (
    <Page>
      <Container>
        <TitleContent>
          <Text.Title>Mensagens Diretas</Text.Title>
        </TitleContent>
        <Card>
          <CardContent>
            <MessageList>{validateConnetions()}</MessageList>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default DirectMessages;
