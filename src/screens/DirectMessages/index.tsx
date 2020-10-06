import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

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

  function getUserConversation() {
    navigation.navigate('UserConversation');
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
            <UserMessage onPress={() => getUserConversation()}>
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
              <Actions>
                <MessageButton>
                  <MessageButtonText>10</MessageButtonText>
                </MessageButton>
              </Actions>
            </UserMessage>
          </MessageList>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DirectMessages;
