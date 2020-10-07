import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';

import {RootStateProps} from '../../store/modules/rootReducer';
import {
  getConnectionsRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  blockConnectionRequest,
  unblockConnectionRequest,
} from '../../store/modules/connections/actions';
import {
  ConnectionsProps,
  InvitesProps,
} from '../../store/modules/connections/reducer';

import {
  Container,
  Title,
  CardContent,
  ConnectionList,
  User,
  UserInfo,
  UserButton,
  UserImage,
  ColumnGroup,
  Name,
  JoinDate,
  Actions,
  AcceptButton,
  RejectButton,
  Divider,
  MessageButton,
} from './styles';
import Card from '../../components/Card';
import Header from '../../components/Header';

const MyConnections: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {connections, invites} = useSelector(
    (state: RootStateProps) => state.connections,
  );

  useEffect(() => {
    dispatch(getConnectionsRequest());
  }, [dispatch]);

  function handleAcceptConnection(userId: number) {
    dispatch(acceptConnectionRequest(userId));
  }

  function handleRejectConnection(userId: number) {
    dispatch(rejectConnectionRequest(userId));
  }

  function handleBlockConnection(userId: number) {
    dispatch(blockConnectionRequest(userId));
  }

  function handleUnblockConnection(userId: number) {
    dispatch(unblockConnectionRequest(userId));
  }

  function toUserProfile(userId: number) {
    navigation.navigate('UserDetails', {
      userId,
    });
  }

  function getUserConversation(userId: number) {
    navigation.navigate('UserConversation', {userId});
  }

  function formatDate(date: string) {
    return format(
      parse(date, 'yyyy-MM-dd HH:mm:ss', new Date()),
      'dd MMM yyyy',
      {
        locale: pt,
      },
    );
  }

  const myConnections: ConnectionsProps[] = [];

  connections?.forEach((connect) => {
    if (invites?.find((invite) => invite.owner_id === connect.user_id)) {
      myConnections.push(connect);
    }
  });

  const myInvites: InvitesProps[] | undefined = invites?.filter(function (
    invite,
  ) {
    return !connections?.some(function (connect) {
      return invite.owner_id === connect.user_id;
    });
  });

  return (
    <Container>
      <Header />
      <Title>Minhas Conexões</Title>
      <Card>
        <CardContent>
          <ConnectionList>
            {myInvites?.map((item) => (
              <User key={item.id}>
                <UserInfo>
                  <UserButton onPress={() => toUserProfile(item.owner_id)}>
                    <UserImage
                      source={{
                        uri: item.owner.person.file
                          ? item.owner.person.file.url
                          : '..',
                      }}
                      resizeMode="cover"
                    />
                  </UserButton>
                  <ColumnGroup>
                    <Name>{item.owner.username}</Name>
                    <JoinDate>{formatDate(item.owner.created_at)}</JoinDate>
                  </ColumnGroup>
                </UserInfo>
                <Actions>
                  <>
                    <AcceptButton
                      onPress={() => handleAcceptConnection(item.owner_id)}>
                      <Icon name="check" size={24} color="#FFF" />
                    </AcceptButton>
                    <RejectButton
                      onPress={() => handleRejectConnection(item.owner_id)}>
                      <Icon name="close" size={24} color="#FFF" />
                    </RejectButton>
                  </>
                </Actions>
              </User>
            ))}
            <Divider />
            {myConnections?.map((item) => (
              <User key={item.id}>
                <UserInfo>
                  <UserButton onPress={() => toUserProfile(item.user_id)}>
                    <UserImage
                      source={{
                        uri: item.target.person.file
                          ? item.target.person.file.url
                          : '..',
                      }}
                      resizeMode="cover"
                    />
                  </UserButton>
                  <ColumnGroup>
                    <Name>{item.target.username}</Name>
                    <JoinDate>{formatDate(item.target.created_at)}</JoinDate>
                  </ColumnGroup>
                </UserInfo>
                <Actions>
                  <>
                    {!item.blocked && (
                      <MessageButton
                        onPress={() => getUserConversation(item.user_id)}>
                        <Icon
                          name="message-arrow-left-outline"
                          size={24}
                          color="#FFF"
                        />
                      </MessageButton>
                    )}
                    {item.blocked ? (
                      <MessageButton
                        onPress={() => handleUnblockConnection(item.user_id)}>
                        <Icon name="lock-open" size={24} color="#FFF" />
                      </MessageButton>
                    ) : (
                      <RejectButton
                        onPress={() => handleBlockConnection(item.user_id)}>
                        <Icon name="block-helper" size={24} color="#FFF" />
                      </RejectButton>
                    )}
                    <RejectButton
                      onPress={() => handleRejectConnection(item.user_id)}>
                      <Icon name="close" size={24} color="#FFF" />
                    </RejectButton>
                  </>
                </Actions>
              </User>
            ))}
          </ConnectionList>
        </CardContent>
      </Card>
    </Container>
  );
};

export default MyConnections;
