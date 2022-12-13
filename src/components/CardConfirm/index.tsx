import React, {useRef} from 'react';
import WebView from '../WebView';
import {useSelector} from 'react-redux';
import {WebViewMessageEvent} from 'react-native-webview';
import {
  CardTokenResponse,
  CheckoutCustomerCardResponse,
} from '../../utils/types';
import Toast from 'react-native-toast-message';
import {paymentToken} from '../../providers/payment';
import {RootState} from '../../providers/store';

interface CardConfirmProps {
  amount: number;
  card?: CheckoutCustomerCardResponse;
  onValidateCard: (card: CardTokenResponse) => void;
  onRequestClose: () => void;
  visible: boolean;
}

export function CardConfirm({
  amount,
  card,
  onValidateCard,
  visible,
  onRequestClose,
}: CardConfirmProps) {
  const injectCardconfirmJs = useRef('');
  const {defaultCard} = useSelector((state: RootState) => state.checkout);

  if (!card && defaultCard?.id) {
    injectCardconfirmJs.current = `
      mp = new MercadoPago('${paymentToken}');
      document.querySelector('#cardId').value = ${defaultCard.id};
      document.querySelector('#transactionAmmount').value = ${amount.toFixed(
        2,
      )};
      cardSixDigits = '${defaultCard.first_six_digits}';
      true;
    `;
  } else if (visible && !defaultCard) {
    Toast.show({
      text1: 'Nenhum cartão selecionado.',
      position: 'bottom',
      type: 'error',
    });
  }

  const cardConfirmWebViewCb = (e: WebViewMessageEvent) => {
    const dataParse = JSON.parse(e.nativeEvent.data);
    const cardTokenPayload: CardTokenResponse = dataParse.payload;
    if (dataParse.message === 'ok') {
      if (cardTokenPayload.id) {
        onRequestClose();
        onValidateCard(cardTokenPayload);
        // setSubmitButtonActive(true);
      }
    } else {
      Toast.show({
        text1: 'Erro ao validar cartão, tente novamente.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

  return (
    <WebView
      key="confirm_card"
      url="https://www.rotery.com.br/mobile-cardconfirm"
      injectScript={injectCardconfirmJs.current}
      onRequestClose={() => onRequestClose()}
      visible={visible}
      onMessageCallback={(event) => cardConfirmWebViewCb(event)}
      title={`Confirmar Cartão: final ${defaultCard?.last_four_digits}`}
    />
  );
}
