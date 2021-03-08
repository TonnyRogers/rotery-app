import React, {useEffect, useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import {ConnectionsProps} from '../../utils/types';
import api from '../../services/api';
import NetInfo from '../../services/netinfo';

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

interface ConnectionShareListProps {
  data: {type?: string; id?: number};
}

const ConnectionShareList: React.FC<ConnectionShareListProps> = ({data}) => {
  const [connections, setConnections] = useState([] as ConnectionsProps[]);

  useEffect(() => {
    async function getConnections() {
      const info = await NetInfo();
      if (!info) {
        return false;
      }
      const response = await api.get('/connections');
      if (response.data) {
        setConnections(response.data.connections);
      }
    }

    getConnections();

    () => {
      getConnections();
    };
  }, [data]);

  const handleSendInvite = useCallback(
    async (type?: string, userId?: number, id?: number) => {
      const info = await NetInfo();
      if (!info) {
        return false;
      }

      let response;
      try {
        switch (type) {
          case 'itinerary': {
            response = await api.post(`/itineraries/${id}/invite`, {
              user_id: userId,
            });
            break;
          }
          default:
            break;
        }

        if (response?.status === 201) {
          Toast.show({
            text1: 'Convite envidado.',
            position: 'bottom',
            type: 'success',
          });
        }
      } catch (error) {
        Toast.show({
          text1: 'Erro ao enviar convite.',
          position: 'bottom',
          type: 'error',
        });
      }
    },
    [],
  );

  return (
    <>
      <ConnectionList>
        {connections &&
          connections.map((connection) => (
            <User key={connection.id}>
              <UserInfo>
                <UserImage
                  source={{
                    uri: connection.target.person.file?.url || undefined,
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
                    handleSendInvite(data.type, connection.target.id, data.id)
                  }>
                  <Icon
                    name="arrow-right-bold-outline"
                    size={24}
                    color="#FFF"
                  />
                </ShareButton>
              </Actions>
            </User>
          ))}
      </ConnectionList>
    </>
  );
};

export default ConnectionShareList;
