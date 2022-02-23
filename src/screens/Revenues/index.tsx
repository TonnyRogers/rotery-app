/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as RootNavigation from '../../RootNavigation';

import {
  Container,
  Header,
  TransactionContainer,
  ItemContainer,
  ItemIconHover,
} from './styles';
import Text from '../../components/Text';
import RowGroup from '../../components/RowGroup';
import Button from '../../components/Button';
import Page from '../../components/Page';
import api from '../../services/api';
import {FindAllMemberRevenuesResponse, PaymentStatus} from '../../utils/types';
import formatLocale from '../../providers/dayjs-format-locale';
import {formatPrice} from '../../lib/utils';
import {theme} from '../../utils/theme';
import ColumnGroup from '../../components/ColumnGroup';
import ShadowBox from '../../components/ShadowBox';
import {RootStateProps} from '../../store/modules/rootReducer';
import {useSelector} from 'react-redux';

const Revenues = () => {
  const [revenuesList, setRevenuesList] =
    useState<FindAllMemberRevenuesResponse>();
  const {data} = useSelector((state: RootStateProps) => state.bankAccount);

  useEffect(() => {
    const getRevenuesHistory = async () => {
      try {
        const response = await api.get<FindAllMemberRevenuesResponse>(
          '/revenues',
        );

        setRevenuesList(response.data);
      } catch (error) {}
    };

    getRevenuesHistory();
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
              <Text.Title alignment="center">Faturamento</Text.Title>
            </View>
          </RowGroup>
        </Header>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <RowGroup justify="space-between">
            <View>
              <Text.Title alignment="start" limitter={12}>
                Dia de transferência
              </Text.Title>
              <View
                style={{
                  width: 100,
                  height: 100,
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                }}>
                <ShadowBox>
                  <Text.Biggest
                    textWeight="bold"
                    textColor="primaryText"
                    alignment="start">
                    {data?.payDay}
                  </Text.Biggest>
                </ShadowBox>
              </View>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
              <Text.Title limitter={8} alignment="start">
                Total a Receber
              </Text.Title>
              <Text.Big alignment="end" textWeight="bold" textColor="green">
                {revenuesList?.total && formatPrice(revenuesList?.total * 100)}
              </Text.Big>
            </View>
          </RowGroup>
        </View>
        <Text.Title alignment="start">Movimentação</Text.Title>

        <TransactionContainer renderToHardwareTextureAndroid>
          {revenuesList?.revenues.map((item) => (
            <ItemContainer
              key={item.id}
              onPress={() =>
                RootNavigation.navigate('RevenueDetail', {
                  revenue: item,
                  paymentType: 'itinerary',
                })
              }>
              <ItemIconHover>
                <Icon name="map-outline" size={26} color={theme.colors.green} />
              </ItemIconHover>
              <RowGroup>
                <View>
                  <Text textColor="primaryText" limitter={15} maxLines={1}>
                    {String(item.itinerary.name)}
                  </Text>
                  <Text>
                    {formatLocale(String(item.itinerary.begin), 'DD MMM YY')}
                  </Text>
                </View>
                <View>
                  <Text
                    textColor={
                      item.paymentStatus === PaymentStatus.PAID
                        ? 'green'
                        : 'red'
                    }
                    alignment="end"
                    textWeight="bold">
                    {formatPrice(item.amount * 100)}
                  </Text>
                </View>
              </RowGroup>
            </ItemContainer>
          ))}
        </TransactionContainer>
        <Button
          onPress={() => RootNavigation.navigate('RevenuesConfig')}
          customContent
          sizeHeight={60}
          sizeWidth={60}
          sizeMargin="0 2rem 1rem 0"
          bgColor="blueTransparent"
          textColor="white">
          <ColumnGroup>
            <Icon name="wrench-outline" size={24} color="#4885fd" />
            <Text.Small textColor="blue" textWeight="bold">
              Config.
            </Text.Small>
          </ColumnGroup>
        </Button>
      </Container>
    </Page>
  );
};

export default Revenues;
