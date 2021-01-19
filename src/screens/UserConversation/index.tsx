import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

import {
  getMessagesRequest,
  getConversationRequest,
  sendMessageRequest,
} from '../../store/modules/messages/actions';

import {
  wsChatSubscribe,
  wsCloseChatChannel,
} from '../../store/modules/websocket/actions';

import {
  SafeView,
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
  MessageForm,
  SendButton,
  SendButtonText,
} from './styles';

import Header from '../../components/Header';
import Card from '../../components/Card';
import TextArea from '../../components/TextArea';
import {RootStateProps} from '../../store/modules/rootReducer';

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
  const [message, setMessage] = useState('');

  const scrollViewRef = useRef<ScrollView>();
  const messageRef = useRef();
  const {userId} = route.params;
  const {user} = useSelector((state: RootStateProps) => state.auth);
  const {conversation} = useSelector((state: RootStateProps) => state.messages);

  useEffect(() => {
    dispatch(getConversationRequest(userId));
    dispatch(getMessagesRequest());

    dispatch(wsChatSubscribe(user.id, userId));
    // scrollViewRef.current?.scrollToEnd({animated: true});
    return function cleanup() {
      dispatch(wsCloseChatChannel(user.id, userId));
    };
  }, [dispatch, userId, user.id]);

  const sender = conversation?.find((item) => item.sender_id === userId);

  function formatDate(date: string) {
    return format(
      parse(date, 'yyyy-MM-dd HH:mm:ss', new Date()),
      'dd MMM yyyy H:mm',
      {
        locale: pt,
      },
    );
  }

  function handleSendMessage() {
    Keyboard.dismiss();
    if (!message) {
      return;
    }
    dispatch(sendMessageRequest(userId, message));
    setMessage('');
  }

  return (
    <SafeView>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{justifyContent: 'flex-end', marginBottom: 50}}>
        <Container>
          <Card>
            <CardHeader>
              <BackButton onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={24} color="#3dc77b" />
              </BackButton>
            </CardHeader>
            <CardContent>
              <UserInfo>
                <UserButton>
                  <UserImage
                    source={{
                      uri:
                        sender && sender.sender.person.file
                          ? sender.sender.person.file.url
                          : '..',
                    }}
                    resizeMode="cover"
                  />
                </UserButton>
                <ColumnGroup>
                  <Name>{sender && sender.sender.username}</Name>
                  <JoinDate>Conversa</JoinDate>
                </ColumnGroup>
              </UserInfo>
              <ConversationList ref={scrollViewRef}>
                {conversation.map((messageItem) =>
                  messageItem.sender_id === user.id ? (
                    <ReplyContent key={messageItem.id}>
                      <Message>{messageItem.message}</Message>
                      <MessageDate>
                        {formatDate(messageItem.created_at)}
                      </MessageDate>
                    </ReplyContent>
                  ) : (
                    <MessageContent key={messageItem.id}>
                      <Message>{messageItem.message}</Message>
                      <MessageDate>
                        {formatDate(messageItem.created_at)}
                      </MessageDate>
                    </MessageContent>
                  ),
                )}
              </ConversationList>

              <MessageForm>
                <TextArea
                  value={message}
                  onChange={setMessage}
                  ref={messageRef}
                  returnKeyType="send"
                  onSubmitEditing={handleSendMessage}
                />
                <SendButton onPress={handleSendMessage}>
                  <Icon name="send-outline" size={24} color="#FFF" />
                  <SendButtonText>Enviar</SendButtonText>
                </SendButton>
              </MessageForm>
            </CardContent>
          </Card>
        </Container>
      </KeyboardAvoidingView>
    </SafeView>
  );
};

export default UserConversation;
