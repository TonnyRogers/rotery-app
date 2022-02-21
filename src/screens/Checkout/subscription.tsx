/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';

import Text from '../../components/Text';
import RowGroup from '../../components/RowGroup';
import Divider from '../../components/Divider';
import {formatPrice} from '../../lib/utils';
import {FlexContainer} from './styles';

interface CheckoutSubscriptionProps {
  amount: number;
  name: string;
}

const CheckoutSubscription = ({amount, name}: CheckoutSubscriptionProps) => {
  return (
    <FlexContainer>
      <View style={{marginBottom: 10}}>
        <Text.Title textColor="primaryText">Assinatura</Text.Title>
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
        <View>
          <Text
            textColor="primaryText"
            textWeight="bold"
            limitter={14}
            maxLines={1}>
            Periodo
          </Text>
          <Text limitter={14} maxLines={1} textWeight="light">
            12 Meses
          </Text>
        </View>
      </RowGroup>
      <View>
        <Text>
          pode ser cancelado a qualquer momento sem custos adicionais.
        </Text>
      </View>
      <Divider />
      <View style={{alignItems: 'flex-end'}}>
        <RowGroup justify="flex-start">
          <Text textColor="primaryText">Total(mês) </Text>
          <Text.Title>{formatPrice(amount)}</Text.Title>
        </RowGroup>
      </View>
    </FlexContainer>
  );
};

export default CheckoutSubscription;
