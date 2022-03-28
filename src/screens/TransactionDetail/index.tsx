/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FIcons from 'react-native-vector-icons/FontAwesome';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';

import {
  BackButton,
  Header,
  Container,
  ItemsContent,
  IconHolder,
  ItemsDetailContent,
} from './styles';
import Text from '../../components/Text';
import Page from '../../components/Page';
import Card from '../../components/Card';
import ImageContainer from '../../components/ImageContainer';
import StarRate from '../../components/StarRate';
import RowGroup from '../../components/RowGroup';
import * as RootNavigation from '../../RootNavigation';
import {theme, ColorsType} from '../../utils/theme';
import {
  MemberWithPaymentResponse,
  ItineraryProps,
  PaymentRefundResponse,
} from '../../utils/types';
import SplashScreen from '../../components/SplashScreen';
import formatLocale from '../../providers/dayjs-format-locale';
import {formatBRL} from '../../lib/mask';
import Button from '../../components/Button';
import ColumnGroup from '../../components/ColumnGroup';
import Alert from '../../components/Alert';
import {formatPrice} from '../../lib/utils';
import api from '../../services/api';
import Tag from '../../components/Tag';
import {HelpRequestRouteParamsProps} from '../HelpRequest';

const cardIconName: Record<string, string> = {
  Mastercard: 'cc-mastercard',
  'American Express': 'cc-amex',
  Visa: 'cc-visa',
};

interface CheckoutProps {
  route: {
    params: {
      memberPayment: MemberWithPaymentResponse;
      paymentType: 'itinerary' | 'subscription';
    };
  };
}

const TransactionDetail = ({route}: CheckoutProps) => {
  const [isShowRefundAlert, setIsShowRefundAlert] = useState(false);
  const [isLoadign, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryProps>();
  const {
    params: {memberPayment},
  } = route;

  const showPaymentRefund = () => {
    if (itinerary?.status === 'active') {
      setIsShowRefundAlert(true);
    }
  };

  useEffect(() => {
    const getTransacionHistory = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<ItineraryProps>(
          `/itineraries/${memberPayment.itinerary}/details`,
        );

        setItinerary(response.data);
        setIsLoading(false);
      } catch (error) {
        Toast.show({
          text1: 'Erro ao buscar roteiro, tente novamente.',
          position: 'bottom',
          type: 'error',
        });
        setIsLoading(false);
      }
    };

    getTransacionHistory();
  }, [memberPayment.itinerary]);

  const handleRefund = async () => {
    try {
      setIsLoading(true);
      await api.post<PaymentRefundResponse>(
        `/itineraries/member/${memberPayment.id}/refund`,
      );
    } catch (error) {
      Toast.show({
        text1: 'Erro ao estornar, tente novamente.',
        position: 'bottom',
        type: 'error',
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setIsShowRefundAlert(false);
      RootNavigation.goBack();
    }
  };

  const hasInstallments = useMemo(
    () =>
      memberPayment.payment.installments > 1 &&
      memberPayment.payment.installments,
    [memberPayment.payment.installments],
  );

  const isRefunded = useMemo(
    () =>
      memberPayment.payment.status === 'refunded' ||
      memberPayment.payment.status_detail === 'partially_refunded',
    [memberPayment.payment.status, memberPayment.payment.status_detail],
  );

  const paymentStatusTag = useCallback(() => {
    let tagColor: ColorsType = 'disabled';
    let tagText;

    switch (memberPayment.payment.status) {
      case 'approved':
        tagText = 'aprovado';
        tagColor = 'green';

        if (
          memberPayment.payment.status_detail === 'partially_refunded' ||
          memberPayment.payment.status_detail === 'refunded'
        ) {
          tagText = 'estornado';
          tagColor = 'orange';
        }

        break;
      case 'in_process':
        tagText = 'processando';
        tagColor = 'orange';
        break;
      case 'rejected':
        tagText = 'recusado';
        tagColor = 'red';
        break;
      case 'refunded':
        tagText = 'estornado';
        tagColor = 'orange';
        break;
      case 'cancelled':
        tagText = 'estornado';
        tagColor = 'orange';
        break;

      default:
        break;
    }
    return (
      <Tag color={tagColor}>
        <Text textColor="white" textWeight="bold">
          {tagText}
        </Text>
      </Tag>
    );
  }, [memberPayment.payment.status, memberPayment.payment.status_detail]);

  return (
    <Page showHeader={false}>
      <Container renderToHardwareTextureAndroid>
        <Header>
          <RowGroup>
            <BackButton onPress={() => RootNavigation.goBack()}>
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </BackButton>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text.Title alignment="center">Detalhes da Compra</Text.Title>
            </View>
          </RowGroup>
        </Header>
        <Card>
          <View style={{marginBottom: 10}}>
            <Text.Title textColor="primaryText">Roteiro</Text.Title>
          </View>
          <RowGroup>
            <View>
              <Text
                textColor="primaryText"
                textWeight="bold"
                limitter={14}
                maxLines={1}>
                {itinerary?.name}
              </Text>
              <Text limitter={14} maxLines={1} textWeight="light">
                {itinerary?.location}
              </Text>
              <Text textWeight="light">
                {formatLocale(String(itinerary?.begin), 'DD MMM YY HH:mm')}
              </Text>
            </View>
            <View>
              <RowGroup>
                <ImageContainer
                  size="small"
                  url={itinerary?.owner.profile.file?.url || ''}
                />
                <View>
                  <Text
                    limitter={12}
                    maxLines={1}
                    textColor="primaryText"
                    textWeight="bold">
                    {formatLocale(String(itinerary?.end), 'DD MMM YY HH:mm')}
                  </Text>
                  <StarRate rate={1} size="small" />
                </View>
              </RowGroup>
              <Text textWeight="light">
                {formatLocale(
                  memberPayment.payment.date_created,
                  'DD MMM YY HH:mm',
                )}
              </Text>
            </View>
          </RowGroup>
          <ItemsContent>
            <IconHolder>
              <Icon name="car" color="#FFF" size={24} />
            </IconHolder>
            <Text.Paragraph textColor="primaryText" textWeight="bold">
              Transporte
            </Text.Paragraph>
          </ItemsContent>
          {itinerary?.transports?.map((item, index) => (
            <ItemsDetailContent key={'transports' + index}>
              <RowGroup>
                <Text>{item.transport.name}</Text>
                <Text>{formatBRL(String(item.price))}</Text>
              </RowGroup>
            </ItemsDetailContent>
          ))}
          <ItemsContent>
            <IconHolder>
              <Icon name="bed" color="#FFF" size={24} />
            </IconHolder>
            <Text.Paragraph textColor="primaryText" textWeight="bold">
              Hospedagem
            </Text.Paragraph>
          </ItemsContent>
          {itinerary?.lodgings?.map((item, index) => (
            <ItemsDetailContent key={'lodgings' + index}>
              <RowGroup>
                <Text>{item.lodging.name}</Text>
                <Text>{formatBRL(String(item.price))}</Text>
              </RowGroup>
            </ItemsDetailContent>
          ))}
          <ItemsContent>
            <IconHolder>
              <Icon name="lightning-bolt" color="#FFF" size={24} />
            </IconHolder>
            <Text.Paragraph textColor="primaryText" textWeight="bold">
              Atividades
            </Text.Paragraph>
          </ItemsContent>
          {itinerary?.activities?.map((item, index) => (
            <ItemsDetailContent key={'activities' + index}>
              <RowGroup>
                <Text>{item.activity.name}</Text>
                <Text>{formatBRL(String(item.price))}</Text>
              </RowGroup>
            </ItemsDetailContent>
          ))}
          <View
            style={{
              flex: 1,
              alignSelf: 'flex-end',
              marginRight: 16,
              marginTop: 10,
            }}>
            {hasInstallments && (
              <Text alignment="end">
                em {hasInstallments}x{' '}
                {formatPrice(
                  (memberPayment.payment.transaction_amount * 100) /
                    hasInstallments,
                )}
              </Text>
            )}

            <RowGroup justify="flex-start">
              <Text textColor="primaryText">Total</Text>
              <Text.Title>
                {formatPrice(memberPayment.payment.transaction_amount * 100)}
              </Text.Title>
            </RowGroup>
            {paymentStatusTag()}
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Card
              contentStyle={{
                borderWidth: 2,
                borderColor: theme.colors.green,
                borderStyle: 'solid',
              }}>
              <View>
                <RowGroup>
                  <View style={{flex: 1}}>
                    <Text textWeight="bold">ANTONIEL AMARAL </Text>
                    <Text.Paragraph textWeight="bold">
                      **** **** **** 4865 {'  '}
                    </Text.Paragraph>
                    <Text textWeight="light">11/25</Text>
                  </View>
                  <FIcons
                    name={cardIconName?.['American Express']}
                    size={40}
                    color={theme.colors.blue}
                  />
                </RowGroup>
              </View>
            </Card>
          </View>
        </Card>
        {itinerary?.status === 'active' && (
          <Button
            isEnabled={!isRefunded}
            bgColor="blueTransparent"
            onPress={() => showPaymentRefund()}
            customContent
            sizeHeight={60}
            sizeWidth={60}
            sizeMargin="2rem 1rem"
            isFlex>
            <ColumnGroup>
              <Icon
                name="cash-refund"
                size={24}
                color={
                  isRefunded ? theme.colors.disabledText : theme.colors.blue
                }
              />
              <Text.Small
                textColor={isRefunded ? 'disabledText' : 'blue'}
                textWeight="bold">
                Estorno
              </Text.Small>
            </ColumnGroup>
          </Button>
        )}
        <Button
          bgColor="blueTransparent"
          onPress={() =>
            itinerary &&
            RootNavigation.navigate<HelpRequestRouteParamsProps>(
              'HelpRequest',
              {
                type: 'itinerary',
                item: {...memberPayment, itinerary},
              },
            )
          }
          customContent
          sizeHeight={60}
          sizeWidth={60}
          sizeMargin="2rem 1rem"
          isFlex>
          <ColumnGroup>
            <Icon name="hand-left" size={24} color={theme.colors.blue} />
            <Text.Small textColor={'blue'} textWeight="bold">
              Ajuda
            </Text.Small>
          </ColumnGroup>
        </Button>
      </Container>
      <Alert
        icon="cash-refund"
        title="Estornar pagamento!"
        visible={isShowRefundAlert}
        onRequestClose={() => setIsShowRefundAlert(false)}
        onConfirm={() => handleRefund()}
        message="Voce deseja realmente estornar este pagamento?"
      />
      <SplashScreen visible={isLoadign} />
    </Page>
  );
};

export default TransactionDetail;
