import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Container,
  CardHeader,
  BackButton,
  CardContent,
  UserInfo,
  UserButton,
  UserImage,
  ColumnGroup,
  Name,
  JoinDate,
  ConversationList,
  MessageContent,
  Message,
  MessageDate,
  ReplyContent,
} from './styles';

import Header from '../../components/Header';
import Card from '../../components/Card';

const UserConversation: React.FC = () => {
  return (
    <Container>
      <Header />
      <Card>
        <CardHeader>
          <BackButton onPress={() => {}}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
        </CardHeader>
        <CardContent>
          <UserInfo>
            <UserButton>
              <UserImage
                source={{
                  uri: '..',
                }}
                resizeMode="cover"
              />
            </UserButton>
            <ColumnGroup>
              <Name>Tony</Name>
              <JoinDate>Amaral</JoinDate>
            </ColumnGroup>
          </UserInfo>
          <ConversationList>
            <MessageContent>
              <Message>
                Fala cara como você esta ?Tentei de ligar ontem... Tudo pronto
                para nossa viagem semana que vem ?
              </Message>
              <MessageDate>15 Nov 2020 10:00</MessageDate>
            </MessageContent>
            <ReplyContent>
              <Message>
                Fala cara como você esta ?Tentei de ligar ontem... Tudo pronto
                para nossa viagem semana que vem ?
              </Message>
              <MessageDate>15 Nov 2020 10:00</MessageDate>
            </ReplyContent>
          </ConversationList>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserConversation;
