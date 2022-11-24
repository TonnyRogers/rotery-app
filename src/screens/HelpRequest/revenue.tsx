import React from 'react';
import {View} from 'react-native';

import Text from '../../components/Text';

interface HelpRevenueProps {
  item: any;
}

export function HelpRevenue() {
  return (
    <>
      <Text.Title>Faturamento</Text.Title>

      <View>
        <Text textWeight="light">
          Você esta solicitando ajuda sobre um problema com suas contribuições a
          receber/recebidas descreva abaixo como podemos ajudar.
        </Text>
      </View>
    </>
  );
}
