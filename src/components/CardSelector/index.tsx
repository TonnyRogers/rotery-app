/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
  ListRenderItemInfo,
} from 'react-native';
import FIcons from 'react-native-vector-icons/FontAwesome';

import * as RootNavigation from '../../RootNavigation';

import BottomSheet from '../BottomSheet';
import Card from '../Card';
import RowGroup from '../RowGroup';
import Text from '../Text';
import {
  CheckoutCustomerResponse,
  CheckoutCustomerCardResponse,
} from '../../utils/types';
import {cardIconName} from '../../screens/Checkout';
import {theme} from '../../utils/theme';
import {useDispatch} from 'react-redux';
import {checkoutActions} from '../../store2/checkout';

interface CardSelectorProps {
  visible: boolean;
  onRequestClose: () => void;
  onSelectCard: () => void;
  customer: CheckoutCustomerResponse | null;
}

export function CardSelector({
  onRequestClose,
  onSelectCard,
  visible,
  customer,
}: CardSelectorProps) {
  const dispatch = useDispatch();

  function navigateToWallet() {
    RootNavigation.navigate('Wallet');
  }

  return (
    <BottomSheet
      visible={visible}
      onRequestClose={() => onRequestClose()}
      title="Selecione o Cartão">
      <FlatList
        showsVerticalScrollIndicator={false}
        initialNumToRender={3}
        data={customer?.cards}
        keyExtractor={(listItem: CheckoutCustomerCardResponse) =>
          String(listItem.id)
        }
        renderItem={({
          item,
        }: ListRenderItemInfo<CheckoutCustomerCardResponse>) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              dispatch(checkoutActions.setDefaultCard(item));
              onSelectCard();
            }}>
            <Card>
              <RowGroup>
                <View>
                  <Text textWeight="bold">
                    {item.cardholder.name.toUpperCase()}{' '}
                  </Text>
                  <Text.Paragraph textWeight="bold">
                    **** **** **** {item.last_four_digits} {'  '}
                  </Text.Paragraph>
                  <Text textWeight="light">
                    {item.expiration_month}/{item.expiration_year}
                  </Text>
                </View>
                <FIcons
                  name={cardIconName?.[item.issuer.name]}
                  size={40}
                  color={theme.colors.blue}
                />
              </RowGroup>
            </Card>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <Card
            contentStyle={{
              borderWidth: 2,
              borderColor: '#CFCFCF',
              borderStyle: 'dashed',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={navigateToWallet}
                style={{padding: 32}}>
                <Text.Paragraph textWeight="bold">
                  Adicionar Cartao
                </Text.Paragraph>
              </TouchableOpacity>
            </View>
          </Card>
        )}
      />
    </BottomSheet>
  );
}
