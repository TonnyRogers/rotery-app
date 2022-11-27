import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import {ConnectionsProps} from '../../utils/types';
import api from '../../providers/api';
import NetInfo from '../../providers/netinfo';

import {
  ConnectionList,
  User,
  UserInfo,
  UserImage,
  ColumnGroup,
  Name,
  Actions,
  ShareButton,
} from './styles';
import axios, {AxiosRequestConfig} from 'axios';

export type DataTypes = 'itinerary' | 'user';

interface SharedConnectionProps extends ConnectionsProps {
  shared?: boolean;
}
interface ConnectionShareListProps {
  data: {type?: DataTypes; id?: number; ownerId?: number};
}

const ConnectionShareList: React.FC<ConnectionShareListProps> = ({data}) => {
  const [connections, setConnections] = useState<SharedConnectionProps[]>([]);

  useEffect(() => {
    const sourceRequest = axios.CancelToken.source();
    const config: AxiosRequestConfig = {cancelToken: sourceRequest.token};
    async function getConnections() {
      const info = await NetInfo();
      if (!info) {
        return false;
      }
      const response = await api.get('/connections', config);
      if (response.data) {
        const sharedConnection = response.data.connections.map(
          (item: SharedConnectionProps) => ({
            ...item,
            shared: false,
          }),
        );

        setConnections(sharedConnection);
      }
    }

    getConnections();

    return () => {
      sourceRequest.cancel();
    };
  }, [data]);

  const handleSendInvite = async (
    type?: string,
    target?: SharedConnectionProps,
    id?: number,
  ) => {
    const info = await NetInfo();
    if (!info) {
      return false;
    }

    if (
      typeof target?.target !== 'number' &&
      target?.target.id === data.ownerId
    ) {
      Toast.show({
        text1: 'Convite para Host.',
        text2: 'Você não pode convidar o Host do roteiro.',
        position: 'bottom',
        type: 'info',
      });
      return false;
    }

    let response;
    try {
      switch (type) {
        case 'itinerary': {
          response = await api.post(`/itineraries/${id}/invite`, {
            userId: target?.target.id,
          });
          break;
        }
        default:
          break;
      }

      if (response?.status === 201) {
        const connectionList = connections;
        const sharedIndex = connectionList.findIndex(
          (item) => target?.id === item.id,
        );

        Toast.show({
          text1: 'Convite envidado.',
          position: 'bottom',
          type: 'success',
        });
        if (sharedIndex !== -1) {
          connectionList[sharedIndex].shared = true;
          setConnections([...connectionList]);
        }
      }
    } catch (error) {
      Toast.show({
        text1: 'Erro ao enviar convite.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

  if (!connections) {
    return null;
  }

  return (
    <>
      <ConnectionList>
        {connections.map(
          (connection) =>
            typeof connection.target !== 'number' && (
              <User key={connection.id}>
                <UserInfo>
                  <UserImage
                    source={{
                      uri: connection.target.profile.file?.url || undefined,
                    }}
                    resizeMode="cover"
                  />
                  <ColumnGroup>
                    <Name>{connection.target.username}</Name>
                  </ColumnGroup>
                </UserInfo>
                <Actions>
                  <ShareButton
                    onPress={() =>
                      handleSendInvite(data.type, connection, data.id)
                    }>
                    {connection.shared ? (
                      <Icon name="check-outline" size={24} color="#FFF" />
                    ) : (
                      <Icon
                        name="arrow-right-bold-outline"
                        size={24}
                        color="#FFF"
                      />
                    )}
                  </ShareButton>
                </Actions>
              </User>
            ),
        )}
      </ConnectionList>
    </>
  );
};

export default ConnectionShareList;
