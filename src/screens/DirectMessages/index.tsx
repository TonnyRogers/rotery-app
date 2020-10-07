import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';

import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  CardHeader,
  BackButton,
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
import Header from '../../components/Header';
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
      <Header />
      <Card>
        <CardHeader>
          <BackButton onPress={() => {}}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
          <TitleContent>
            <Icon name="inbox-arrow-down-outline" size={24} color="#4885fd" />
            <Title>Mensagens Diretas</Title>
          </TitleContent>
        </CardHeader>
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
                        uri: message.sender.person.file
                          ? message.sender.person.file.url
                          : '..',
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
