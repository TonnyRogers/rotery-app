/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';

import * as RootNavigation from '../../RootNavigation';
const cardsAnimation = require('../../../assets/animations/animation_cards.json');

import {
  Container,
  Header,
  TransactionContainer,
  ItemContainer,
  ItemIconHover,
} from './styles';
import Card from '../../components/Card';
import Text from '../../components/Text';
import RowGroup from '../../components/RowGroup';
import Button from '../../components/Button';
import Page from '../../components/Page';
import api from '../../services/api';
import {MemberWithPaymentResponse} from '../../utils/types';
import formatLocale from '../../providers/dayjs-format-locale';
import {formatPrice} from '../../lib/utils';
import {theme} from '../../utils/theme';

const Wallet = () => {
  const [transactionList, setTransactionList] = useState<
    MemberWithPaymentResponse[]
  >([]);

  useEffect(() => {
    const getTransacionHistory = async () => {
      try {
        const response = await api.get<MemberWithPaymentResponse[]>(
          '/itineraries/member-with-payment',
        );

        setTransactionList(response.data);
      } catch (error) {}
    };

    getTransacionHistory();
  }, []);

  return (
    <Page showHeader={false}>
      <Container>
        <Header>
          <RowGroup justify="space-between">
            <Button
              bgColor="greenTransparent"
              onPress={() => RootNavigation.goBack()}
              sizeHeight={40}
              sizeWidth={40}
              sizeBorderRadius={20}
              sizePadding={0}
              customContent>
              <Icon name="chevron-left" size={24} color={theme.colors.green} />
            </Button>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text.Title alignment="center">Carteira</Text.Title>
            </View>
          </RowGroup>
        </Header>
        <Card>
          <LottieView
            source={cardsAnimation}
            loop={true}
            cacheStrategy="strong"
            autoPlay
            resizeMode="contain"
            hardwareAccelerationAndroid={!!(Platform.OS === 'android')}
            renderMode="AUTOMATIC"
            style={{flex: 1}}
          />
        </Card>
        <View style={{marginLeft: 10}}>
          <Text.Title>Histórico de Compras</Text.Title>
        </View>
        <TransactionContainer renderToHardwareTextureAndroid>
          {transactionList.map((item) => (
            <ItemContainer
              key={item.id}
              onPress={() =>
                RootNavigation.navigate('TransactionDetail', {
                  memberPayment: item,
                  paymentType: 'itinerary',
                })
              }>
              <ItemIconHover>
                <Icon name="map-outline" size={26} color={theme.colors.green} />
              </ItemIconHover>
              <RowGroup>
                <View>
                  <Text
                    textColor="primaryText"
                    limitter={15}
                    textWeight="light"
                    maxLines={1}>
                    {String(item.payment.metadata.itinerary_name)}
                  </Text>
                  <Text>
                    {formatLocale(
                      String(item.payment.metadata.itinerary_begin),
                      'DD MMM YY',
                    )}
                  </Text>
                </View>
                <View>
                  <Text
                    textColor={
                      item.payment.status === 'approved' &&
                      item.payment.status_detail !== 'partially_refunded'
                        ? 'red'
                        : 'green'
                    }
                    alignment="end"
                    textWeight="bold">
                    {formatPrice(item.payment.transaction_amount * 100)}
                  </Text>
                  <Text>
                    {formatLocale(item.payment.date_created, 'DD MMM YY HH:mm')}
                  </Text>
                </View>
              </RowGroup>
            </ItemContainer>
          ))}
        </TransactionContainer>
      </Container>
    </Page>
  );
};

export default Wallet;
