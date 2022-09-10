/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';

import * as RootNavigation from '../../RootNavigation';
const cardsAnimation = require('../../../assets/animations/animation_cards.json');

import {Header} from './styles';
import Card from '../../components/Card';
import Text from '../../components/Text';
import RowGroup from '../../components/RowGroup';
import Button from '../../components/Button';
import Page from '../../components/Page';
import {theme} from '../../utils/theme';
import {
  getCustomerRequest,
  removeCustomerCardRequest,
  addCustomerCardRequest,
  setDefaultCard,
} from '../../store/modules/checkout/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {SimpleList} from '../../components/SimpleList';
import {AnimationContent} from '../../components/AnimationContent';
import {PageContainer} from '../../components/PageContainer';
import BottomSheet from '../../components/BottomSheet';
import {
  CheckoutCustomerCardResponse,
  CardTokenResponse,
} from '../../utils/types';
import WebView from '../../components/WebView';
import {WebViewMessageEvent} from 'react-native-webview';
import Toast from 'react-native-toast-message';
import {paymentToken} from '../Checkout';
import SplashScreen from '../../components/SplashScreen';
import Alert from '../../components/Alert';

const cardIconName: Record<string, string> = {
  Mastercard: 'cc-mastercard',
  'American Express': 'cc-amex',
  Visa: 'cc-visa',
};

interface CustomCardResponse extends CheckoutCustomerCardResponse {
  token?: string;
}

const injectCheckoutJs = `
mp = new MercadoPago('${paymentToken.dev}');
document.querySelector('#transactionAmmount').value = 0.00;
true;
`;

const Wallet = () => {
  const dispatch = useDispatch();
  const [cardBottomSheeVisible, setCardBottomSheeVisible] = useState(false);
  const [webCheckouVisible, setWebCheckouVisible] = useState(false);
  const [removeCardAlertVisible, setRemoveCardAlertVisible] = useState(false);
  const {customer, loading, defaultCard} = useSelector(
    (state: RootStateProps) => state.checkout,
  );
  const [cardOnEdition, setCardOnEdition] =
    useState<CustomCardResponse | null>();
  const {
    data: {...profile},
  } = useSelector((state: RootStateProps) => state.profile);

  const onEditCard = (card: CheckoutCustomerCardResponse) => {
    setCardOnEdition(card);
    setCardBottomSheeVisible(true);
  };

  const handleRemoveCard = () => {
    if (customer?.id && cardOnEdition?.id) {
      setCardBottomSheeVisible(false);
      dispatch(removeCustomerCardRequest(customer?.id, cardOnEdition?.id));
      setCardOnEdition(null);
    }
  };

  const checkoutWebViewCb = (e: WebViewMessageEvent) => {
    const dataParse = JSON.parse(e.nativeEvent.data);
    const cardTokenPayload: CardTokenResponse = dataParse.payload;

    if (dataParse.message === 'ok' && customer !== null) {
      dispatch(addCustomerCardRequest(cardTokenPayload.id, customer?.id));
      setWebCheckouVisible(false);
    } else {
      Toast.show({
        text1: 'Dados do cartão incorretos, verifique.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (profile?.user.customerId && !customer) {
      dispatch(getCustomerRequest(profile?.user.customerId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer?.cards]);

  return (
    <Page showHeader={false}>
      <PageContainer isScrollable={false} bgColor="white">
        <Header>
          <RowGroup justify="space-between" align="center">
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
                alignItems: 'center',
              }}>
              <Text.Title alignment="center">Carteira</Text.Title>
            </View>
          </RowGroup>
        </Header>
        <AnimationContent
          animationJson={cardsAnimation}
          height={140}
          align="center"
        />
        <SimpleList isHorizontal={false}>
          {customer?.cards.map((cardItem) => (
            <TouchableOpacity
              key={cardItem.id}
              onPress={() => onEditCard(cardItem)}>
              <Card
                marginHorizontal={4}
                contentStyle={{
                  borderColor:
                    defaultCard?.id === cardItem.id
                      ? theme.colors.green
                      : undefined,
                  borderWidth: defaultCard?.id === cardItem.id ? 2 : undefined,
                  borderStyle:
                    defaultCard?.id === cardItem.id ? 'solid' : undefined,
                }}>
                <RowGroup>
                  <View>
                    <Text maxLines={1} limitter={20} textWeight="bold">
                      {cardItem.cardholder.name.toUpperCase()}
                    </Text>
                    <Text.Paragraph textWeight="bold">
                      **** **** **** {cardItem.last_four_digits} {'  '}
                    </Text.Paragraph>
                    <Text textWeight="light">
                      {cardItem.expiration_month}/{cardItem.expiration_year}
                    </Text>
                  </View>
                  <AwesomeIcons
                    name={cardIconName?.[cardItem.issuer.name]}
                    size={40}
                    color={theme.colors.blue}
                  />
                </RowGroup>
              </Card>
            </TouchableOpacity>
          ))}
          <Card
            marginHorizontal={4}
            contentStyle={{
              borderWidth: 2,
              borderColor: '#CFCFCF',
              borderStyle: 'dashed',
              backgroundColor: '#CFCFCF09',
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
        </SimpleList>
      </PageContainer>
      <BottomSheet
        topMargin={40}
        title={`Cartão: **** **** **** ${cardOnEdition?.last_four_digits}`}
        visible={cardBottomSheeVisible}
        onRequestClose={() => setCardBottomSheeVisible(false)}>
        <Button
          bgColor="redTransparent"
          onPress={() => {
            setCardBottomSheeVisible(false);
            setRemoveCardAlertVisible(true);
          }}
          sizePadding={0}
          sizeMargin="1.6rem 0 0 0"
          customContent>
          <RowGroup isFlex={false} align="center">
            <Icon name="credit-card-off" size={24} color={theme.colors.red} />
            <Text.Paragraph textColor="red" textWeight="bold">
              {' '}
              Remover
            </Text.Paragraph>
          </RowGroup>
        </Button>
        <Button
          bgColor="blueTransparent"
          onPress={() => {
            dispatch(
              setDefaultCard(cardOnEdition as CheckoutCustomerCardResponse),
            );
            setCardBottomSheeVisible(false);
          }}
          sizePadding={0}
          sizeMargin="1.6rem 0 0 0"
          customContent>
          <RowGroup isFlex={false} align="center">
            <Text.Paragraph textColor="blue" textWeight="bold">
              Definir como principal
            </Text.Paragraph>
          </RowGroup>
        </Button>
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
      <SplashScreen visible={loading} />
      <Alert
        title="Remover Cartão"
        message={'você deseja realmente remover este cartão?'}
        icon="credit-card-off"
        iconColor="#3dc77b"
        visible={removeCardAlertVisible}
        onRequestClose={() => setRemoveCardAlertVisible(false)}
        onConfirm={handleRemoveCard}
      />
    </Page>
  );
};

export default Wallet;
