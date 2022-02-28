/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import {View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';

import * as RootNavigation from '../../RootNavigation';
const plantAnimation = require('../../../assets/animations/animation_float_features.json');
import {SearchSubscriptionResult, Plan} from '../../utils/types';
import {
  Container,
  Header,
  TransactionContainer,
  ItemContainer,
  ItemIconHover,
  CardContainer,
} from './styles';
import Text from '../../components/Text';
import RowGroup from '../../components/RowGroup';
import Button from '../../components/Button';
import Page from '../../components/Page';
import formatLocale from '../../providers/dayjs-format-locale';
import {formatPrice} from '../../lib/utils';
import {theme} from '../../utils/theme';
import {RootStateProps} from '../../store/modules/rootReducer';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../../components/Card';
import ShadowBox from '../../components/ShadowBox';
import SplashScreen from '../../components/SplashScreen';
import {CheckoutRouteParamsProps} from '../Checkout';
import Divider from '../../components/Divider';
import ImageContainer from '../../components/ImageContainer';
import {
  getSubscriptionRequest,
  cancelSubscriptionRequest,
} from '../../store/modules/subscription/actions';
import Alert from '../../components/Alert';
import Tag from '../../components/Tag';
import api from '../../services/api';
import {AxiosResponse} from 'axios';

const HostSubscription = () => {
  const dispatch = useDispatch();
  const [cancelSubscriptionAlertVisible, setCancelSubscriptionAlertVisible] =
    useState(false);
  const [subscriptionHistoric, setSubscriptionHistoric] =
    useState<SearchSubscriptionResult | null>(null);
  const [plan, setPlan] = useState<Plan>();

  const {data, loading} = useSelector(
    (state: RootStateProps) => state.subscription,
  );

  const handleCancelSubscription = () => {
    if (data?.id) {
      dispatch(cancelSubscriptionRequest(data?.id));
    }
  };

  useEffect(() => {
    if (!data) {
      dispatch(getSubscriptionRequest());
    }
  }, [dispatch, data]);

  useEffect(() => {
    const getSubscriptionHistoricData = async () => {
      const response: AxiosResponse<SearchSubscriptionResult[]> = await api.get(
        `/subscriptions/details?ref=${data?.referenceId}`,
      );
      setSubscriptionHistoric(response.data[0]);
    };

    if (data) {
      getSubscriptionHistoricData();
    }

    return () => {
      setSubscriptionHistoric(null);
    };
  }, [data]);

  useEffect(() => {
    const getPlan = async () => {
      const response: AxiosResponse<Plan> = await api.get(
        '/subscriptions/plan/3',
      );

      setPlan(response.data);
    };

    if (!plan) {
      getPlan();
    }
  }, [data, plan]);

  const renderSubscriptionStatusTag = useCallback(() => {
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
  }, [data]);

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
              }}>
              <Text.Title alignment="center">
                Assinatura {renderSubscriptionStatusTag()}
              </Text.Title>
            </View>
          </RowGroup>
        </Header>
        {data ? (
          <>
            <ShadowBox>
              <LottieView
                source={plantAnimation}
                loop={true}
                cacheStrategy="strong"
                autoPlay
                resizeMode="contain"
                hardwareAccelerationAndroid={!!(Platform.OS === 'android')}
                renderMode="AUTOMATIC"
                style={{
                  flex: 1,
                }}
                duration={3000}
              />
            </ShadowBox>
            <Text.Title alignment="start">Movimentação</Text.Title>
            <TransactionContainer>
              {subscriptionHistoric !== null && (
                <ItemContainer key={subscriptionHistoric.id} onPress={() => {}}>
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
                        Mensalidade{' '}
                        {subscriptionHistoric.summarized.charged_quantity} de{' '}
                        {subscriptionHistoric.summarized.quotas}
                      </Text>
                      <Text>
                        {formatLocale(
                          subscriptionHistoric.summarized.last_charged_date,
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
                          Number(
                            subscriptionHistoric.summarized.charged_amount *
                              100,
                          ),
                        )}
                      </Text>
                      <Text>
                        {formatLocale(
                          subscriptionHistoric.next_payment_date,
                          'DD MMM YY HH:mm',
                        )}
                      </Text>
                    </View>
                  </RowGroup>
                </ItemContainer>
              )}
            </TransactionContainer>
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
              <CardContainer showsVerticalScrollIndicator={false}>
                <Text.Title alignment="start">
                  Tenha mais vantagens para gerenciar suas viagens
                </Text.Title>
                <Divider />
                <ImageContainer.Hero url="https://rotery-filestore.nyc3.digitaloceanspaces.com/rotery-banner.webp" />
                <Text.Paragraph alignment="start">
                  Com a assinatura você pode oferecer pagamento online (com
                  cartão de crédito) para os viajantes e rebecer tudo por dentro
                  do app.
                </Text.Paragraph>
                <Divider />
                <ImageContainer.Hero url="https://rotery-filestore.nyc3.digitaloceanspaces.com/rotery-sobre-conexoes.webp" />
                <Text.Paragraph alignment="start">
                  Você também pode criar quantos roteiros desejar sem limites.
                </Text.Paragraph>
                <Divider />
                <Text.Paragraph alignment="start">Assine ja!</Text.Paragraph>
              </CardContainer>
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
      </Container>
      <SplashScreen visible={loading} />
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
};

export default HostSubscription;
