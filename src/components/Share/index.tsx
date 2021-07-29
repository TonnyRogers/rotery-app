import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {ShareButton, Container, RowGroup} from './styles';
import Card from '../Card';
import BottomSheet from '../BottomSheet';
import ConnectionShareList, {DataTypes} from '../ConnectionShareList';

interface ShareProps {
  data: {
    componentType: string;
    type: DataTypes;
    id?: number;
    ownerId?: number;
  };
}

const Share: React.FC<ShareProps> = ({data}) => {
  const [isSharelistVisible, setIsSharelistVisible] = useState(false);

  return (
    <>
      <Container>
        <Card>
          <RowGroup>
            <ShareButton onPress={() => setIsSharelistVisible(true)}>
              <Icon name="share" size={24} color="#3dc77b" />
            </ShareButton>
          </RowGroup>
        </Card>
      </Container>
      <BottomSheet
        title="Compartilhar Roteiro"
        visible={isSharelistVisible}
        onRequestClose={() => setIsSharelistVisible(false)}>
        <ConnectionShareList
          data={{id: data.id, type: data.type, ownerId: data.ownerId}}
        />
      </BottomSheet>
    </>
  );
};

export default Share;
