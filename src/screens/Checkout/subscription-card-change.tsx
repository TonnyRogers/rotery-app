/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

import Text from '../../components/Text';
import RowGroup from '../../components/RowGroup';
import Divider from '../../components/Divider';
import {formatPrice} from '../../lib/utils';
import {FlexContainer} from './styles';

interface SubscriptionCardChangeProps {
  amount: number;
  name: string;
}

const SubscriptionCardChange = ({
  amount,
  name,
}: SubscriptionCardChangeProps) => {
  return (
    <FlexContainer>
      <View style={{marginBottom: 10}}>
        <Text.Title textColor="primaryText">Trocar Cartão</Text.Title>
      </View>
      <RowGroup>
        <View>
          <Text
            textColor="primaryText"
            textWeight="bold"
            limitter={14}
            maxLines={1}>
            Plano
          </Text>
          <Text limitter={18} maxLines={1} textWeight="light">
            {name}
          </Text>
        </View>
      </RowGroup>
      <View style={{flex: 1}}>
        <Text alignment="start" textWeight="light">
          por falha, limite insuficiente ou outro motivo seu pagamento não esta
          em dia, solicitamos que utilize outro cartão.
        </Text>
      </View>
      <Divider />
      <View style={{alignItems: 'flex-end', flex: 1}}>
        <RowGroup justify="flex-start">
          <Text textColor="primaryText" textWeight="light">
            Total(mês){' '}
          </Text>
          <Text.Title>{formatPrice(amount)}</Text.Title>
        </RowGroup>
      </View>
    </FlexContainer>
  );
};

export default SubscriptionCardChange;
