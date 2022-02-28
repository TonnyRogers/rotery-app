/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
import {ItineraryProps, Revenue, PaymentStatus} from '../../utils/types';
import SplashScreen from '../../components/SplashScreen';
import formatLocale from '../../providers/dayjs-format-locale';
import {formatBRL} from '../../lib/mask';
import Button from '../../components/Button';
import ColumnGroup from '../../components/ColumnGroup';
import {formatPrice} from '../../lib/utils';
import api from '../../services/api';
import Tag from '../../components/Tag';

interface RevenueDetailProps {
  route: {
    params: {
      revenue: Revenue;
      paymentType: 'itinerary' | 'subscription';
    };
  };
}

const RevenueDetail = ({route}: RevenueDetailProps) => {
  const [isLoadign, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState<ItineraryProps>();
  const {
    params: {revenue},
  } = route;

  useEffect(() => {
    const getTransacionHistory = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<ItineraryProps>(
          `/itineraries/${revenue.itinerary.id}/details`,
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
  }, [revenue.itinerary.id]);

  const formattedDated = useMemo(() => {
    const begin = formatLocale(String(itinerary?.begin), 'DD MMM YY HH:mm');
    const paymentDateCreated = formatLocale(
      revenue.createdAt,
      'DD MMM YY HH:mm',
    );

    return {begin, paymentDateCreated};
  }, [itinerary, revenue.createdAt]);

  const itineraryAmount = useMemo(() => {
    let amount = 0;
    itinerary?.lodgings.forEach((item) => (amount += Number(item.price)));
    itinerary?.transports.forEach((item) => (amount += Number(item.price)));
    itinerary?.activities.forEach((item) => (amount += Number(item.price)));
    return amount;
  }, [itinerary]);

  const paymentStatusTag = useCallback(() => {
    let tagColor: ColorsType = 'disabled';
    let tagText;

    switch (revenue.paymentStatus) {
      case PaymentStatus.PAID:
        tagText = 'aprovado';
        tagColor = 'green';
        break;
      case PaymentStatus.PENDING:
        tagText = 'processando';
        tagColor = 'orange';
        break;
      case PaymentStatus.REFUSED:
        tagText = 'recusado';
        tagColor = 'red';
        break;
      case PaymentStatus.REFUNDED:
        tagText = 'estornado';
        tagColor = 'orange';
        break;

      default:
        break;
    }
    return <Tag color={tagColor}>{tagText}</Tag>;
  }, [revenue.paymentStatus]);

  return (
    <Page showHeader={false}>
      <Container renderToHardwareTextureAndroid>
        <Header>
          <RowGroup>
            <BackButton onPress={() => RootNavigation.goBack()}>
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </BackButton>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text.Title alignment="center">
                Detalhes do Faturamento
              </Text.Title>
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
              <Text textWeight="light">{formattedDated.begin}</Text>
            </View>
            <View>
              <RowGroup>
                <ImageContainer
                  size="small"
                  url="https://media.motociclismoonline.com.br/uploads/2020/05/P90327721_highRes_the-new-bmw-f-850-gs-copy-1-e1590182850170.jpg"
                />
                <View>
                  <Text
                    limitter={12}
                    maxLines={1}
                    textColor="primaryText"
                    textWeight="bold">
                    {itinerary?.owner.username}
                  </Text>
                  <StarRate rate={1} size="small" />
                </View>
              </RowGroup>
              <Text textWeight="light">
                {formattedDated.paymentDateCreated}
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
          {itinerary?.transports?.map((item) => (
            <ItemsDetailContent key={item.id}>
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
          {itinerary?.lodgings?.map((item) => (
            <ItemsDetailContent key={item.id}>
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
          {itinerary?.activities?.map((item) => (
            <ItemsDetailContent key={item.id}>
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
            <RowGroup justify="flex-start">
              <Text textColor="primaryText" textWeight="light">
                Total
              </Text>
              <Text.Title>{formatPrice(itineraryAmount * 100)}</Text.Title>
            </RowGroup>
            {paymentStatusTag()}
          </View>
        </Card>
        <Card>
          <RowGroup justify="flex-start">
            <ImageContainer size="small" url={revenue.member.avatar} />
            <View>
              <Text
                limitter={12}
                maxLines={1}
                textColor="primaryText"
                textWeight="bold">
                Viajante
              </Text>
              <Text limitter={24} maxLines={1} textColor="primaryText">
                {revenue.member.username}
              </Text>
            </View>
          </RowGroup>
          <Text limitter={24} maxLines={1}>
            {formattedDated.paymentDateCreated}
          </Text>
        </Card>
        <Button
          bgColor="blueTransparent"
          onPress={() =>
            RootNavigation.navigate('HelpRequest', {
              type: 'revenue',
              item: {...revenue, itinerary},
            })
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
      <SplashScreen visible={isLoadign} />
    </Page>
  );
};

export default RevenueDetail;
