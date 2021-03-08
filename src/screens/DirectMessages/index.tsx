import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';

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
  Title,
  MessageButton,
  MessageButtonText,
} from './styles';
import Card from '../../components/Card';

const DirectMessages: React.FC = () => {
  const navigation = useNavigation();

  function formatDate(date: string) {
    return format(
      parse(date, 'yyyy-MM-dd HH:mm:ss', new Date()),
      'dd MMM yyyy H:mm',
      {
        locale: pt,
      },
    );
  }

  const {messages} = useSelector((state: RootStateProps) => state.messages);

  function getUserConversation(userId: number) {
    navigation.navigate('UserConversation', {userId});
  }

  return (
    <Container>
      <TitleContent>
        <Title>Mensagens Diretas</Title>
      </TitleContent>
      <Card>
        <CardContent>
          <MessageList>
            {messages.map((message) => (
              <UserMessage
                key={message.id}
                onPress={() => getUserConversation(message.sender_id)}>
                <UserInfo>
                  <UserButton>
                    <UserImage
                      source={{
                        uri:
                          message.sender.person.file &&
                          message.sender.person.file.url,
                      }}
                      resizeMode="cover"
                    />
                  </UserButton>
                  <ColumnGroup>
                    <Name>{message.sender.username}</Name>
                    <JoinDate>
                      Atividade: {formatDate(message.created_at)}
                    </JoinDate>
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
            ))}
          </MessageList>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DirectMessages;
