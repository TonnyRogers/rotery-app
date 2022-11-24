/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext,
} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcons from 'react-native-vector-icons/FontAwesome';
import {WebViewMessageEvent} from 'react-native-webview';
import {
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  Vibration,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

import {paymentToken} from '../../providers/payment';

import {BackButton, Header, Container} from './styles';
import Text from '../../components/Text';
import Page from '../../components/Page';
import Card from '../../components/Card';
import WebView from '../../components/WebView';
import Button from '../../components/Button';
import RowGroup from '../../components/RowGroup';
import * as RootNavigation from '../../RootNavigation';
import BottomSheet from '../../components/BottomSheet';
import {theme} from '../../utils/theme';
import {
  CardTokenResponse,
  CheckoutCustomerCardResponse,
  ItineraryProps,
  PayerCosts,
} from '../../utils/types';
import {
  getCustomer,
  createCustomer,
  deleteCustomerCard,
  addCustomerCard,
  checkoutActions,
} from '../../store2/checkout';
import PickerInput from '../../components/PickerInput';
import Modal from '../../components/Modal';
import CheckoutItinerary from './itinerary';
import CheckoutSubscription from './subscription';
import SubscriptionCardChange from './subscription-card-change';
import {
  createSubscription,
  changeSubscriptionCard,
} from '../../store2/subscription';
import {useIsAndroid} from '../../hooks/useIsAndroid';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
import {viewedGuide} from '../../store2/guides';
import {LoadingContext} from '../../context/loading/context';
import {RootState} from '../../providers/store';
import {GuideEnum} from '../../utils/enums';

const confirmAnimation = require('../../../assets/animations/animation_confirm.json');
const processingAnimation = require('../../../assets/animations/animation_processing_card.json');
const blockAnimation = require('../../../assets/animations/animation_block.json');

const cardIconName: Record<string, string> = {
  Mastercard: 'cc-mastercard',
  'American Express': 'cc-amex',
  Visa: 'cc-visa',
};

interface CustomCardResponse extends CheckoutCustomerCardResponse {
  token?: string;
}

interface PlanPayload {
  id: number;
  amount: number;
  reference_id: string;
  name: string;
}

interface ChangeSubscriptionCardPayload extends PlanPayload {
  subscriptionId: number;
}

export type CheckoutRouteParamsProps = {
  data: ItineraryProps | PlanPayload | ChangeSubscriptionCardPayload;
  paymentType: 'itinerary' | 'subscription' | 'subscription-card-change';
  hasInstallments: boolean;
};

interface CheckoutProps {
  route: {
    params: CheckoutRouteParamsProps;
  };
}

const Checkout = ({route}: CheckoutProps) => {
  const {setLoading, isLoading} = useContext(LoadingContext);
  const dispatch = useDispatch();
  const injectCardconfirmJs = useRef('');
  const {
    params: {data, paymentType, hasInstallments},
  } = route;
  const {isAndroid} = useIsAndroid();

  const {data: profile} = useSelector((state: RootState) => state.profile);
  const {customer, loading, checkoutStatus} = useSelector(
    (state: RootState) => state.checkout,
  );
  const {loading: subscriptionLoading, data: subscriptionData} = useSelector(
    (state: RootState) => state.subscription,
  );
  const {
    subscriptionCheckoutGuide,
    data: {subscriptionCheckoutContent},
  } = useSelector((state: RootState) => state.guides);

  const [webCardConfirmVisible, setWebCardConfirmVisible] = useState(false);
  const [webCheckouVisible, setWebCheckouVisible] = useState(false);
  const [webCardsVisible, setCardsVisible] = useState(false);
  const [submitButtonDisabled, setSubmitButtonActive] = useState(false);
  const [editCardVisible, setEditCardVisible] = useState(false);
  const [isIntallmentsOptionsOpen, setInstallmentsOptionsOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState<CustomCardResponse | null>();
  const [onEditionCard, setOnEditionCard] =
    useState<CustomCardResponse | null>();
  const [installment, setInstallment] = useState('');
  const [installmentsListOptions, setInstallmentsListOptions] = useState<
    PayerCosts[]
  >([]);

  const itineraryAmount = useMemo(() => {
    let amount = 0;
    if ('lodgings' in data) {
      data?.lodgings.forEach((listItem) => (amount += Number(listItem.price)));
      data?.transports.forEach(
        (listItem) => (amount += Number(listItem.price)),
      );
      data?.activities.forEach(
        (listItem) => (amount += Number(listItem.price)),
      );
    }

    const tax = amount * 0.05;
    return {amount, tax, total: amount + tax};
  }, [data]);

  const checkoutWebViewCb = (e: WebViewMessageEvent) => {
    const dataParse = JSON.parse(e.nativeEvent.data);
    const cardTokenPayload: CardTokenResponse = dataParse.payload;

    if (dataParse.message === 'ok' && customer !== null) {
      dispatch(
        addCustomerCard({
          cardToken: cardTokenPayload.id,
          customerId: customer?.id,
        }),
      );
      setWebCheckouVisible(false);
    } else {
      Toast.show({
        text1: 'Dados do cartão incorretos, verifique.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

  const cardConfirmWebViewCb = (e: WebViewMessageEvent) => {
    const dataParse = JSON.parse(e.nativeEvent.data);
    const cardTokenPayload: CardTokenResponse = dataParse.payload;
    if (dataParse.message === 'ok' && customer !== null) {
      if (selectedCard && cardTokenPayload.id) {
        switch (paymentType) {
          case 'itinerary':
            setSelectedCard({...selectedCard, token: cardTokenPayload.id});
            setWebCardConfirmVisible(false);
            setInstallmentsListOptions([
              ...cardTokenPayload.installments[0].payer_costs,
            ]);
            break;
          case 'subscription':
            setSelectedCard({...selectedCard, token: cardTokenPayload.id});
            setWebCardConfirmVisible(false);
            setSubmitButtonActive(true);
            setInstallmentsListOptions([
              ...cardTokenPayload.installments[0].payer_costs,
            ]);
            break;

          default:
            setSelectedCard({...selectedCard, token: cardTokenPayload.id});
            setWebCardConfirmVisible(false);
            setSubmitButtonActive(true);
            break;
        }
        setInstallment('');
      }
    } else {
      setSelectedCard(null);
      Toast.show({
        text1: 'Erro ao validar cartão, tente novamente.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

  const selectCard = (card: CheckoutCustomerCardResponse, amount: number) => {
    injectCardconfirmJs.current = `
      mp = new MercadoPago('${paymentToken.dev}');
      document.querySelector('#cardId').value = ${card.id};
      document.querySelector('#transactionAmmount').value = ${amount.toFixed(
        2,
      )};
      cardSixDigits = '${card.first_six_digits}';
      true;
  `;
    setWebCardConfirmVisible(true);
    setCardsVisible(false);
    setSubmitButtonActive(false);
    setSelectedCard(card);
  };

  const injectCheckoutJs = `
    mp = new MercadoPago('${paymentToken.dev}');
    document.querySelector('#transactionAmmount').value = ${itineraryAmount.total.toFixed(
      2,
    )};
    true;
  `;

  const renderCheckoutHead = useCallback(() => {
    switch (paymentType) {
      case 'itinerary':
        if ('lodgings' in data && data) {
          return (
            <CheckoutItinerary
              itinerary={data}
              itineraryAmount={itineraryAmount}
            />
          );
        }
        break;
      case 'subscription':
        if ('amount' in data) {
          return (
            <CheckoutSubscription amount={data?.amount} name={data.name} />
          );
        }
        break;
      case 'subscription-card-change':
        if ('amount' in data) {
          return (
            <SubscriptionCardChange amount={data?.amount} name={data.name} />
          );
        }
        break;
    }
  }, [data, itineraryAmount, paymentType]);

  const checkoutResponseText = useMemo(() => {
    const textFormated = {
      title: '',
      animation: confirmAnimation,
      subTitle: '',
    };

    if (paymentType === 'itinerary') {
      switch (checkoutStatus) {
        case 'approved':
          textFormated.title = 'Tudo Certo!';
          textFormated.animation = confirmAnimation;
          textFormated.subTitle = `Seu pagamento foi processado com sucesso, em breve você vai
          receber uma confirmação.`;
          break;
        case 'in_process':
          textFormated.title = 'Estamos Processando';
          textFormated.animation = processingAnimation;
          textFormated.subTitle =
            'Não se preocupe, assim que o pagamento for processado vamos ter informar por e-mail.';
          break;
        case 'rejected':
          textFormated.title = 'Opa!';
          textFormated.animation = blockAnimation;
          textFormated.subTitle =
            'Seu pagamento foi recusado tente novamente ou utilize outro cartão.';
          break;

        default:
          break;
      }
    } else if (paymentType === 'subscription') {
      switch (subscriptionData?.status) {
        case 'authorized':
          textFormated.title = 'Tudo Certo!';
          textFormated.animation = confirmAnimation;
          textFormated.subTitle = `Seu pagamento foi processado com sucesso, em breve você vai
          receber uma confirmação.`;
          break;
        case 'pending':
          textFormated.title = 'Estamos Processando';
          textFormated.animation = processingAnimation;
          textFormated.subTitle =
            'Não se preocupe, assim que o pagamento for processado vamos ter informar por e-mail.';
          break;

        default:
          break;
      }
    }

    return textFormated;
  }, [checkoutStatus, paymentType, subscriptionData]);

  const verifyCustomer = useCallback(() => {
    if (!profile?.user.customerId && !customer) {
      dispatch(
        createCustomer({
          email: String(profile?.user.email),
          fullName: profile?.name ? profile?.name : undefined,
          phone: profile?.phone ? Number(profile?.phone) : undefined,
        }),
      );
    }
    setCardsVisible(true);
  }, [customer, dispatch, profile]);

  const renderAddCardButton = useCallback(
    () =>
      selectedCard ? (
        <Card
          contentStyle={{
            borderWidth: 2,
            borderColor: theme.colors.green,
            borderStyle: 'solid',
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => setCardsVisible(true)}>
            <RowGroup>
              <View style={{flex: 1}}>
                <Text textWeight="bold">
                  {selectedCard.cardholder.name.toUpperCase()}{' '}
                </Text>
                <Text.Paragraph textWeight="bold">
                  **** **** **** {selectedCard?.last_four_digits} {'  '}
                </Text.Paragraph>
                <Text textWeight="light">
                  {selectedCard?.expiration_month}/
                  {selectedCard?.expiration_year}
                </Text>
              </View>
              <FIcons
                name={cardIconName?.[selectedCard?.issuer.name]}
                size={40}
                color={theme.colors.blue}
              />
            </RowGroup>
          </TouchableOpacity>
        </Card>
      ) : (
        <Card
          contentStyle={{
            borderWidth: 2,
            borderColor: '#CFCFCF',
            borderStyle: 'dashed',
          }}>
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <TouchableOpacity
              onPress={() => verifyCustomer()}
              style={{padding: 32}}>
              <Text.Paragraph textWeight="bold">
                Selecione o Pagamento
              </Text.Paragraph>
            </TouchableOpacity>
          </View>
        </Card>
      ),
    [selectedCard, verifyCustomer],
  );

  useEffect(() => {
    if (profile?.user.customerId && !customer) {
      dispatch(getCustomer(profile?.user.customerId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      dispatch(checkoutActions.resetCheckoutStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (loading !== isLoading) {
      setLoading(loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (loading !== subscriptionLoading) {
      setLoading(subscriptionLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionLoading]);

  const guideContent = subscriptionCheckoutContent.map((content) => ({
    isAnimation: content.isAnimation,
    url: content.externalUrl ?? '',
    message: content.content ?? '',
    title: content.title ?? '',
    withInfo: content.withInfo,
  }));

  const changeIntallmenteValue = (value: string) => {
    setInstallment(value);
    setSubmitButtonActive(true);
  };

  const processPayment = () => {
    // const selectedInstallment = installmentsListOptions.find(
    //   (item) => item.installments === Number(installment),
    // );
    if (customer && selectedCard && selectedCard.token) {
      switch (paymentType) {
        // case 'itinerary':
        //   if ('lodgings' in data) {
        //     dispatch(
        //       processJoinItineraryPaymentRequest(data.id, {
        //         description: `Cobrança de valores referente ao roteiro ${data.name}`,
        //         external_reference: `Roteiro: RT0${data.id}`,
        //         installments: Number(selectedInstallment?.installments),
        //         issuer_id: selectedCard.issuer.id,
        //         payer: {
        //           id: customer?.id,
        //           email: customer.email,
        //           entity_type: 'individual',
        //           type: 'customer',
        //         },
        //         payment_method_id: selectedCard.payment_method.id,
        //         statement_descriptor: `Rotery - Pagamento do Roteiro RT0${data.id}`,
        //         token: selectedCard?.token,
        //         transaction_amount: Number(selectedInstallment?.total_amount),
        //       }),
        //     );
        //   }
        //   break;
        case 'subscription':
          if ('reference_id' in data) {
            dispatch(
              createSubscription({
                preapproval_plan_id: data.reference_id,
                card_token_id: selectedCard.token,
                payer_email: customer.email,
                planId: data.id,
              }),
            );
          }
          break;
        case 'subscription-card-change':
          if ('subscriptionId' in data) {
            dispatch(
              changeSubscriptionCard({
                subscriptionId: data.subscriptionId,
                card_token_id: selectedCard.token,
              }),
            );
          }
          break;

        default:
          break;
      }
    }
    setSelectedCard(null);
    setInstallmentsListOptions([]);
    setSubmitButtonActive(false);
  };

  const handleCardOptions = (card: CheckoutCustomerCardResponse) => {
    setOnEditionCard(card);
    setEditCardVisible(true);
    Vibration.vibrate([100, 100, 200, 100]);
  };

  const handleCloseCardOptions = () => {
    setOnEditionCard(null);
    setEditCardVisible(false);
  };

  const handleRemoveCard = () => {
    if (customer?.id && onEditionCard?.id) {
      dispatch(
        deleteCustomerCard({
          customerId: customer?.id,
          cardId: onEditionCard?.id,
        }),
      );
      setOnEditionCard(null);
      setEditCardVisible(false);
    }
  };

  return (
    <Page showHeader={false}>
      <Container renderToHardwareTextureAndroid>
        <Header>
          <RowGroup>
            <BackButton onPress={() => RootNavigation.goBack()}>
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </BackButton>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text.Title alignment="center">Pagamento</Text.Title>
            </View>
          </RowGroup>
        </Header>
        {checkoutStatus ? (
          <Card>
            <Text.Title alignment="center">
              {checkoutResponseText.title}
            </Text.Title>
            <View style={{height: 150}}>
              <LottieView
                source={checkoutResponseText.animation}
                loop={true}
                autoPlay
                resizeMode="contain"
                hardwareAccelerationAndroid={!!isAndroid}
                renderMode="AUTOMATIC"
                style={{flex: 1}}
              />
            </View>
            <Text alignment="center" textWeight="light">
              {checkoutResponseText.subTitle}
            </Text>
          </Card>
        ) : (
          <>
            <Card>
              {renderCheckoutHead()}
              <View
                style={{
                  flex: 1,
                }}>
                {renderAddCardButton()}
              </View>
              {hasInstallments && (
                <PickerInput
                  label="Parcelas"
                  value={installment}
                  onChange={(value: string) => changeIntallmenteValue(value)}
                  options={installmentsListOptions.map((item) => ({
                    name: item.recommended_message,
                    value: item.installments,
                  }))}
                  byValue={true}
                  categorySelectable={true}
                  open={isIntallmentsOptionsOpen}
                  setOpen={setInstallmentsOptionsOpen}
                  onOpen={() => {}}
                  zIndex={200}
                  zIndexInverse={100}
                  key="installments"
                  listMode="SCROLLVIEW"
                />
              )}
            </Card>
            <Button
              sizeMargin="1rem"
              isEnabled={submitButtonDisabled}
              bgColor="green"
              onPress={() => processPayment()}>
              Finalizar Pedido
            </Button>
          </>
        )}
      </Container>
      <BottomSheet
        visible={webCardsVisible}
        onRequestClose={() => setCardsVisible(false)}
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
              onPress={() =>
                selectCard(
                  item,
                  'amount' in data ? data.amount / 100 : itineraryAmount.total,
                )
              }
              onLongPress={() => handleCardOptions(item)}>
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
                  onPress={() => setWebCheckouVisible(true)}
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
      <WebView
        key="checkout"
        injectScript={injectCheckoutJs}
        url="https://www.rotery.com.br/mobile-checkout"
        onRequestClose={() => setWebCheckouVisible(false)}
        visible={webCheckouVisible}
        onMessageCallback={(event) => checkoutWebViewCb(event)}
        title="Novo"
      />
      <WebView
        key="confirm_card"
        url="https://www.rotery.com.br/mobile-cardconfirm"
        injectScript={injectCardconfirmJs.current}
        onRequestClose={() => setWebCardConfirmVisible(false)}
        visible={webCardConfirmVisible}
        onMessageCallback={(event) => cardConfirmWebViewCb(event)}
        title="Confirmar Cartão"
      />
      <Modal
        title="Editar Cartão"
        visible={editCardVisible}
        onCloseRequest={handleCloseCardOptions}>
        <View style={{height: 100, padding: 16}}>
          <RowGroup>
            <View>
              <Text textWeight="bold">
                {onEditionCard?.cardholder.name.toUpperCase()}{' '}
              </Text>
              <Text.Paragraph textWeight="bold">
                **** **** **** {onEditionCard?.last_four_digits} {'  '}
              </Text.Paragraph>
              <Text textWeight="light">
                {onEditionCard?.expiration_month}/
                {onEditionCard?.expiration_year}
              </Text>
            </View>
            <FIcons
              name={cardIconName?.[String(onEditionCard?.issuer.name)]}
              size={40}
              color={theme.colors.blue}
            />
          </RowGroup>
        </View>
        <Button sizeMargin="1rem" bgColor="red" onPress={handleRemoveCard}>
          Remover
        </Button>
      </Modal>
      <Ads
        visible={subscriptionCheckoutGuide}
        onRequestClose={() => {}}
        key="guide-feed">
        <GuideCarousel
          data={guideContent}
          onClose={() =>
            dispatch(viewedGuide({key: GuideEnum.SUBSCRIPTION_CHECKOUT}))
          }
        />
      </Ads>
    </Page>
  );
};

export default Checkout;
