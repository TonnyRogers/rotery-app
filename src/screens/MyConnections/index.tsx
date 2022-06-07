import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

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
import formatLocale from '../../providers/dayjs-format-locale';
import {UserConversationParams} from '../UserConversation';

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
    return formatLocale(date, 'DD MMM YY');
  }

  const myConnections: ConnectionsProps[] = [];

  connections?.forEach((connect) => {
    if (
      invites?.find(
        (invite) =>
          invite.owner.id === connect.target.id && invite.isBlocked === false,
      )
    ) {
      myConnections.push(connect);
    }
  });

  const myInvites: InvitesProps[] | undefined = invites?.filter(function (
    invite,
  ) {
    return !connections?.some(function (connect) {
      return invite.owner.id === connect.target.id;
    });
  });

  const renderInvites = useCallback(() => {
    function handleAcceptConnection(userId: number) {
      dispatch(acceptConnectionRequest(userId));
    }

    return myInvites?.map((item) => (
      <User key={item.id}>
        <UserInfo>
          <UserButton onPress={() => toUserProfile(item.owner.id)}>
            <UserImage
              source={{
                uri: item.owner.profile.file?.url,
              }}
              resizeMode="cover"
            />
          </UserButton>
          <ColumnGroup>
            <Text.Paragraph textColor="primaryText" textWeight="bold">
              {item.owner.username}
            </Text.Paragraph>
            <Text>desde {formatDate(item.owner.createdAt)}</Text>
          </ColumnGroup>
        </UserInfo>
        <Actions>
          <>
            <AcceptButton onPress={() => handleAcceptConnection(item.owner.id)}>
              <Icon name="check" size={24} color="#FFF" />
            </AcceptButton>
            <RejectButton onPress={() => handleRejectConnection(item.owner.id)}>
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

    function getUserConversation({
      userId,
      username,
      avatarUrl,
    }: UserConversationParams) {
      navigation.navigate('UserConversation', {
        userId,
        username,
        avatarUrl,
      });
    }

    return myConnections?.map((item) => (
      <User key={item.id}>
        <UserInfo>
          <UserButton onPress={() => toUserProfile(item.target.id)}>
            <UserImage
              source={{
                uri: item.target.profile.file?.url,
              }}
              resizeMode="cover"
            />
          </UserButton>
          <ColumnGroup>
            <Text.Paragraph textColor="primaryText" textWeight="bold">
              {item.target.username}
            </Text.Paragraph>
            <Text textWeight="light">
              desde {formatDate(item.target.createdAt)}
            </Text>
          </ColumnGroup>
        </UserInfo>
        <Actions>
          <>
            {!item.isBlocked && (
              <MessageButton
                onPress={() =>
                  getUserConversation({
                    userId: item.target.id,
                    username: item.target.username,
                    avatarUrl: item.target.profile.file?.url,
                  })
                }>
                <Icon
                  name="message-arrow-left-outline"
                  size={24}
                  color="#FFF"
                />
              </MessageButton>
            )}
            {item.isBlocked ? (
              <MessageButton
                onPress={() => handleUnblockConnection(item.target.id)}>
                <Icon name="lock-open" size={24} color="#FFF" />
              </MessageButton>
            ) : (
              <RejectButton
                onPress={() => handleBlockConnection(item.target.id)}>
                <Icon name="block-helper" size={24} color="#FFF" />
              </RejectButton>
            )}
            <RejectButton
              onPress={() => handleRejectConnection(item.target.id)}>
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
