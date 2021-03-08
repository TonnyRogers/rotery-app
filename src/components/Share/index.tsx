import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';

import {showBottomSheet} from '../../store/modules/bottomsheet/actions';
import {ShareButton} from './styles';
import Card from '../Card';

interface ShareProps {
  data: {
    componentType: string;
    type: string;
    id: number;
  };
}

const Share: React.FC<ShareProps> = ({data}) => {
  const dispacth = useDispatch();

  const showShareComponent = () => {
    dispacth(
      showBottomSheet({
        componentype: data.componentType,
        id: data.id,
        type: data.type,
      }),
    );
  };

  return (
    <>
      <Card>
        <ShareButton onPress={() => showShareComponent()}>
          <Icon name="share" size={24} color="#3dc77b" />
        </ShareButton>
      </Card>
    </>
  );
};

export default Share;
