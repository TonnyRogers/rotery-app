/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as RootNavigation from '../../RootNavigation';

import {Header, ItemContainer, ItemIconHover} from './styles';
import Text from '../../components/Text';
import RowGroup from '../../components/RowGroup';
import Button from '../../components/Button';
import Page from '../../components/Page';
import api from '../../providers/api';
import {TipRevenueResponse} from '../../utils/types';
import {formatLocale} from '../../providers/dayjs-format-locale';
import {formatPrice} from '../../lib/utils';
import {theme} from '../../utils/theme';
import ColumnGroup from '../../components/ColumnGroup';
import ShadowBox from '../../components/ShadowBox';
import {useSelector, useDispatch} from 'react-redux';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
import {viewedGuide} from '../../store2/guides';
import {TipPaymentStatus, GuideEnum} from '../../utils/enums';
import {PageContainer} from '../../components/PageContainer';
import Divider from '../../components/Divider';
import {SimpleList} from '../../components/SimpleList';
import {HelpRequestRouteParamsProps} from '../HelpRequest';
import Tag from '../../components/Tag';
import {RootState} from '../../providers/store';
import axios, {AxiosRequestConfig} from 'axios';

const Revenues = () => {
  const [revenuesList, setRevenuesList] = useState<TipRevenueResponse>();
  const {data} = useSelector((state: RootState) => state.bankAccount);
  const {
    revenuesGuide,
    data: {revenuesContent},
  } = useSelector((state: RootState) => state.guides);
  const dispatch = useDispatch();

  useEffect(() => {
    const sourceRequest = axios.CancelToken.source();
    const config: AxiosRequestConfig = {cancelToken: sourceRequest.token};
    const getRevenuesHistory = async () => {
      try {
        const response = await api.get<TipRevenueResponse>('/revenues', config);

        setRevenuesList(response.data);
      } catch (error) {}
    };

    getRevenuesHistory();

    return () => {
      sourceRequest.cancel();
    };
  }, []);

  const guideContent = revenuesContent.map((content) => ({
    isAnimation: content.isAnimation,
    url: content.externalUrl ?? '',
    message: content.content ?? '',
    title: content.title ?? '',
    withInfo: content.withInfo,
  }));

  return (
    <Page showHeader={false}>
      <PageContainer isScrollable={false}>
        <Header>
          <RowGroup justify="space-between">
            <Button
              bgColor="greenTransparent"
              onPress={() => RootNavigation.goBack()}
              sizeHeight={4}
              sizeWidth={4}
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
              <Text.Title alignment="center">Ganhos</Text.Title>
            </View>
          </RowGroup>
        </Header>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <RowGroup justify="space-between">
            <View>
              <Text.Title alignment="start" limitter={12}>
                Dia de transferência
              </Text.Title>
              <ShadowBox width={100} height={100} containerAlign="center">
                <Text.Biggest
                  textWeight="bold"
                  textColor="primaryText"
                  alignment="center">
                  {data?.payDay}
                </Text.Biggest>
              </ShadowBox>
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
        <Divider />
        <Text.Title alignment="start">Movimentação</Text.Title>
        <SimpleList isHorizontal={false}>
          {revenuesList?.revenues.map((item) => (
            <ItemContainer key={item.id} onPress={() => {}}>
              <ItemIconHover>
                <Icon name="map-outline" size={26} color={theme.colors.green} />
              </ItemIconHover>
              <RowGroup>
                <View>
                  <Text
                    textColor="primaryText"
                    textWeight="light"
                    limitter={15}
                    maxLines={1}>
                    De: {String(item.payer.username)}
                  </Text>
                  <Text>
                    {formatLocale(String(item.createdAt), 'DD MMM YY')}
                  </Text>
                </View>
                <View>
                  <Text
                    textColor={
                      item.paymentStatus === TipPaymentStatus.PAID
                        ? 'green'
                        : 'red'
                    }
                    alignment="end"
                    textWeight="bold">
                    {formatPrice(Number(item.paymentAmount) * 100)}
                  </Text>
                  {item.paidAt && (
                    <Tag align="flex-end" color="blueTransparent">
                      <Text textColor="blue" textWeight="bold">
                        pago
                      </Text>
                    </Tag>
                  )}
                </View>
              </RowGroup>
            </ItemContainer>
          ))}
        </SimpleList>
        <RowGroup isFlex={false}>
          <Button
            onPress={() => RootNavigation.navigate('RevenuesConfig')}
            customContent
            sizeHeight={6}
            sizeWidth={6}
            sizeMargin="0 1rem 0rem 0"
            bgColor="blueTransparent"
            textColor="white">
            <ColumnGroup>
              <Icon name="wrench-outline" size={24} color="#4885fd" />
              <Text.Small textColor="blue" textWeight="bold">
                Config.
              </Text.Small>
            </ColumnGroup>
          </Button>
          <Button
            bgColor="blueTransparent"
            onPress={() =>
              RootNavigation.navigate<HelpRequestRouteParamsProps>(
                'HelpRequest',
                {
                  type: 'revenue',
                  item: null,
                },
              )
            }
            customContent
            sizeHeight={6}
            sizeWidth={6}
            sizeMargin="0 1rem 0rem 0"
            isFlex>
            <ColumnGroup>
              <Icon name="hand-left" size={24} color={theme.colors.blue} />
              <Text.Small textColor={'blue'} textWeight="bold">
                Ajuda
              </Text.Small>
            </ColumnGroup>
          </Button>
        </RowGroup>
      </PageContainer>
      <Ads
        visible={revenuesGuide}
        onRequestClose={() => {}}
        key="guide-revenues">
        <GuideCarousel
          data={guideContent}
          onClose={() => dispatch(viewedGuide({key: GuideEnum.REVENUES}))}
        />
      </Ads>
    </Page>
  );
};

export default Revenues;
