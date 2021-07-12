import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';

import {RootStateProps} from '../../store/modules/rootReducer';
import {
  acceptConnectionRequest,
  rejectConnectionRequest,
  blockConnectionRequest,
  unblockConnectionRequest,
} from '../../store/modules/connections/actions';
import {ConnectionsProps, InvitesProps} from '../../utils/types';
import {theme} from '../../utils/theme';

import {
  Container,
  CardContent,
  ConnectionList,
  User,
  UserInfo,
  UserButton,
  UserImage,
  ColumnGroup,
  Actions,
  AcceptButton,
  RejectButton,
  Divider,
  MessageButton,
  TitleContent,
} from './styles';
import Card from '../../components/Card';
import Page from '../../components/Page';
import FloatButton from '../../components/FloatButton';
import Text from '../../components/Text';

const MyConnections: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {connections, invites} = useSelector(
    (state: RootStateProps) => state.connections,
  );

  const toUserProfile = useCallback(
    (userId: number) => {
      navigation.navigate('UserDetails', {
        userId,
      });
    },
    [navigation],
  );

  const handleRejectConnection = useCallback(
    (userId: number) => {
      dispatch(rejectConnectionRequest(userId));
    },
    [dispatch],
  );

  function toSearchUsers() {
    navigation.navigate('SearchUsers');
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

  const renderInvites = useCallback(() => {
    function handleAcceptConnection(userId: number) {
      dispatch(acceptConnectionRequest(userId));
    }

    return myInvites?.map((item) => (
      <User key={item.id}>
        <UserInfo>
          <UserButton onPress={() => toUserProfile(item.owner_id)}>
            <UserImage
              source={{
                uri: item.owner.person.file && item.owner.person.file.url,
              }}
              resizeMode="cover"
            />
          </UserButton>
          <ColumnGroup>
            <Text.Paragraph textColor="primary" textWeight="bold">
              {item.owner.username}
            </Text.Paragraph>
            <Text>{formatDate(item.owner.created_at)}</Text>
          </ColumnGroup>
        </UserInfo>
        <Actions>
          <>
            <AcceptButton onPress={() => handleAcceptConnection(item.owner_id)}>
              <Icon name="check" size={24} color="#FFF" />
            </AcceptButton>
            <RejectButton onPress={() => handleRejectConnection(item.owner_id)}>
              <Icon name="close" size={24} color="#FFF" />
            </RejectButton>
          </>
        </Actions>
      </User>
    ));
  }, [dispatch, handleRejectConnection, myInvites, toUserProfile]);

  const renderConnections = useCallback(() => {
    function handleBlockConnection(userId: number) {
      dispatch(blockConnectionRequest(userId));
    }

    function handleUnblockConnection(userId: number) {
      dispatch(unblockConnectionRequest(userId));
    }

    function getUserConversation(userId: number) {
      navigation.navigate('UserConversation', {userId});
    }

    return myConnections?.map((item) => (
      <User key={item.id}>
        <UserInfo>
          <UserButton onPress={() => toUserProfile(item.user_id)}>
            <UserImage
              source={{
                uri: item.target.person.file && item.target.person.file.url,
              }}
              resizeMode="cover"
            />
          </UserButton>
          <ColumnGroup>
            <Text.Paragraph textColor="primary" textWeight="bold">
              {item.target.username}
            </Text.Paragraph>
            <Text>{formatDate(item.target.created_at)}</Text>
          </ColumnGroup>
        </UserInfo>
        <Actions>
          <>
            {!item.blocked && (
              <MessageButton onPress={() => getUserConversation(item.user_id)}>
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
              <RejectButton onPress={() => handleBlockConnection(item.user_id)}>
                <Icon name="block-helper" size={24} color="#FFF" />
              </RejectButton>
            )}
            <RejectButton onPress={() => handleRejectConnection(item.user_id)}>
              <Icon name="close" size={24} color="#FFF" />
            </RejectButton>
          </>
        </Actions>
      </User>
    ));
  }, [
    dispatch,
    handleRejectConnection,
    myConnections,
    navigation,
    toUserProfile,
  ]);

  return (
    <Page>
      <Container>
        <TitleContent>
          <Text.Title>Minhas Conexões</Text.Title>
        </TitleContent>
        <Card>
          <CardContent>
            <ConnectionList>
              {renderInvites()}
              <Divider />
              {renderConnections()}
            </ConnectionList>
          </CardContent>
        </Card>
      </Container>
      <FloatButton
        alignment="right"
        shape="circle"
        icon={() => (
          <Icon
            name="account-search-outline"
            size={24}
            color={theme.colors.white}
          />
        )}
        onPressAction={() => toSearchUsers()}
        bgColor="secondary"
      />
    </Page>
  );
};

export default MyConnections;
