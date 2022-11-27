/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import * as RootNavigation from '../../RootNavigation';
const plantAnimation = require('../../../assets/animations/animation_float_features.json');

import {ItemIconHover} from './styles';
import Page from '../../components/Page';
import {PageContainer} from '../../components/PageContainer';
import Text from '../../components/Text';
import RowGroup from '../../components/RowGroup';
import Button from '../../components/Button';
import {theme} from '../../utils/theme';
import Tag from '../../components/Tag';
import Alert from '../../components/Alert';
import {cancelSubscription, getSubscription} from '../../store2/subscription';
import ShadowBox from '../../components/ShadowBox';
import {AnimationContent} from '../../components/AnimationContent';
import {SearchSubscriptionResult, Plan} from '../../utils/types';
import {formatLocale} from '../../providers/dayjs-format-locale';
import {formatPrice} from '../../lib/utils';
import {CheckoutRouteParamsProps} from '../Checkout';
import Divider from '../../components/Divider';
import ImageContainer from '../../components/ImageContainer';
import Card from '../../components/Card';
import {SimpleList} from '../../components/SimpleList';
import api from '../../providers/api';
import {LoadingContext} from '../../context/loading/context';
import {RootState} from '../../providers/store';
import axios, {AxiosRequestConfig} from 'axios';

export function BackpackerSubscription() {
  const {setLoading, isLoading} = useContext(LoadingContext);
  const dispatch = useDispatch();
  const {data, loading} = useSelector((state: RootState) => state.subscription);

  const [cancelSubscriptionAlertVisible, setCancelSubscriptionAlertVisible] =
    useState(false);
  const [subscriptionHistoric, setSubscriptionHistoric] =
    useState<SearchSubscriptionResult[]>();
  const [plan, setPlan] = useState<Plan>();

  function handleCancelSubscription() {
    if (data?.id) {
      dispatch(cancelSubscription(data?.id));
      setCancelSubscriptionAlertVisible(false);
    }
  }

  const renderSubscriptionStatusTag = () => {
    switch (data?.status) {
      case 'authorized':
        return (
          <Tag color="green">
            <Text.Small textColor="white" textWeight="bold">
              ATIVA
            </Text.Small>
          </Tag>
        );
      case 'pending':
        return (
          <Tag color="orange">
            <Text.Small textColor="white" textWeight="bold">
              PENDENTE
            </Text.Small>
          </Tag>
        );
      case 'no_payment':
        return (
          <Tag color="red">
            <Text.Small textColor="white" textWeight="bold">
              S/ PAGAMENTO
            </Text.Small>
          </Tag>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!data) {
      dispatch(getSubscription());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const sourceRequest = axios.CancelToken.source();
    const config: AxiosRequestConfig = {cancelToken: sourceRequest.token};
    const getSubscriptionHistoricData = async () => {
      const response = await api.get<SearchSubscriptionResult[]>(
        `/subscriptions/details?ref=${data?.referenceId}`,
        config,
      );
      setSubscriptionHistoric(response.data);
    };

    if (data) {
      getSubscriptionHistoricData();
    }

    return () => {
      setSubscriptionHistoric([]);
      sourceRequest.cancel();
    };
  }, [data]);

  useEffect(() => {
    const sourceRequest = axios.CancelToken.source();
    const config: AxiosRequestConfig = {cancelToken: sourceRequest.token};
    const getPlan = async () => {
      const response = await api.get<Plan>('/subscriptions/plan/1', config);

      setPlan(response.data);
    };

    if (!plan) {
      getPlan();
    }

    return () => {
      sourceRequest.cancel();
    };
  }, [data, plan]);

  useEffect(() => {
    if (loading !== isLoading) {
      setLoading(loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <Page showHeader={false}>
      <PageContainer isScrollable={false}>
        <RowGroup isFlex={false} justify="space-between">
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
            }}>
            <Text.Title alignment="center">
              Assinatura {renderSubscriptionStatusTag()}
            </Text.Title>
          </View>
        </RowGroup>
        {data ? (
          <>
            <ShadowBox margin={0} height={330}>
              <AnimationContent
                animationJson={plantAnimation}
                duration={3000}
                height={300}
              />
            </ShadowBox>
            <Divider />
            <Text.Title alignment="start">Movimentação</Text.Title>
            <SimpleList>
              {subscriptionHistoric?.map((item) => (
                <RowGroup key={item.id} align="center">
                  <ItemIconHover>
                    <Icon
                      name="map-outline"
                      size={26}
                      color={theme.colors.blue}
                    />
                  </ItemIconHover>
                  <RowGroup>
                    <View>
                      <Text
                        textColor="primaryText"
                        limitter={15}
                        maxLines={1}
                        textWeight="light">
                        Mensalidade {item.summarized.charged_quantity} de{' '}
                        {item.summarized.quotas}
                      </Text>
                      <Text>
                        {formatLocale(
                          item.summarized.last_charged_date,
                          'DD MMM YY HH:mm',
                        )}
                      </Text>
                    </View>
                    <View>
                      <Text
                        textColor={'green'}
                        alignment="end"
                        textWeight="bold">
                        {formatPrice(
                          Number(item.auto_recurring.transaction_amount * 100),
                        )}
                      </Text>
                      <Text>
                        {formatLocale(
                          item.next_payment_date,
                          'DD MMM YY HH:mm',
                        )}
                      </Text>
                    </View>
                  </RowGroup>
                </RowGroup>
              ))}
            </SimpleList>
            {data.status === 'no_payment' ? (
              <Button
                onPress={() =>
                  RootNavigation.navigate<CheckoutRouteParamsProps>(
                    'Checkout',
                    {
                      paymentType: 'subscription-card-change',
                      data: {
                        id: Number(plan?.id),
                        amount: Number(plan?.amount) * 100,
                        reference_id: String(plan?.referenceId),
                        name: String(plan?.name),
                        subscriptionId: data.id,
                      },
                      hasInstallments: false,
                    },
                  )
                }
                bgColor="blue"
                textColor="white">
                Alterar Cartão
              </Button>
            ) : (
              <Button
                isEnabled={data.status === 'authorized'}
                onPress={() => setCancelSubscriptionAlertVisible(true)}
                bgColor="red"
                textColor="white">
                Cancelar Assinatura
              </Button>
            )}
          </>
        ) : (
          <>
            <Card marginHorizontal={0}>
              <SimpleList isHorizontal={false}>
                <Text.Title alignment="start">
                  Explore o Brasil sem limites
                </Text.Title>
                <ImageContainer.Hero
                  sizeStyle="square"
                  fit="cover"
                  url="https://rotery-filestore.nyc3.digitaloceanspaces.com/hero-pagamento-no-app-square.webp"
                />
                <Text.Paragraph alignment="start">
                  Escolha se tornar um mochileiro mais conectado, com guias de
                  todo o país ao seu dispor e de forma ilimitada.
                </Text.Paragraph>
                <Divider />
                <Text.Paragraph alignment="start">
                  O plano é mensal com a duração de 12 meses, podendo ser
                  cancelado a qualquer momento sem taxas ou qualquer surpresa.
                </Text.Paragraph>
                <Text.Paragraph alignment="start">Assine ja!</Text.Paragraph>
                <Divider />
                <Text alignment="start">
                  Os guias são econtrados de acordo com a área de cobertura que
                  o app possue, estamos em constante expansão do território de
                  cobertura e então antes de assinar verfirique se a sua região
                  de interesse ja possui guias.
                </Text>
              </SimpleList>
            </Card>
            <Button
              onPress={() =>
                RootNavigation.navigate<CheckoutRouteParamsProps>('Checkout', {
                  paymentType: 'subscription',
                  data: {
                    id: Number(plan?.id),
                    amount: Number(plan?.amount) * 100,
                    reference_id: String(plan?.referenceId),
                    name: String(plan?.name),
                  },
                  hasInstallments: false,
                })
              }
              isEnabled={!!plan}
              bgColor="green"
              textColor="white">
              Assinar
            </Button>
          </>
        )}
      </PageContainer>
      <Alert
        title="Cancelar Assinatura!"
        message={'você deseja realmente cancelar sua assinatura?'}
        icon="clipboard-alert-outline"
        iconColor="#3dc77b"
        visible={cancelSubscriptionAlertVisible}
        onRequestClose={() => setCancelSubscriptionAlertVisible(false)}
        onConfirm={handleCancelSubscription}
      />
    </Page>
  );
}
