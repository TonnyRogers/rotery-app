/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useRef} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import RowGroup from '../../components/RowGroup';
import Text from '../../components/Text';
import ImageContainer from '../../components/ImageContainer';
import StarRate from '../../components/StarRate';
import {formatPrice} from '../../lib/utils';

import {
  ItemsContent,
  IconHolder,
  ItemsDetailContent,
  FlexContainer,
} from './styles';
import {formatBRL} from '../../lib/mask';
import {ItineraryProps} from '../../utils/types';
import {formatLocale} from '../../providers/dayjs-format-locale';

interface CheckoutItineraryProps {
  itinerary: ItineraryProps;
  itineraryAmount: {
    tax: number;
    amount: number;
    total: number;
  };
}

const CheckoutItinerary = ({
  itinerary,
  itineraryAmount,
}: CheckoutItineraryProps) => {
  const beginDateFormated = useRef('');
  const endDateFormated = useRef('');
  const limitDateFormated = useRef('');

  useMemo(() => {
    beginDateFormated.current = formatLocale(
      String(itinerary?.begin),
      ' DD MMM YYYY H:mm',
    );
    endDateFormated.current = formatLocale(
      String(itinerary?.end),
      ' DD MMM YYYY H:mm',
    );
    limitDateFormated.current = formatLocale(
      String(itinerary?.deadlineForJoin),
      ' DD MMM YYYY H:mm',
    );
  }, [itinerary]);

  return (
    <FlexContainer>
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
          <Text textWeight="light">{beginDateFormated.current}</Text>
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
          <Text textWeight="light">{endDateFormated.current}</Text>
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
      {itinerary?.transports.map((item, index) => (
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
      {itinerary?.lodgings.map((item, index) => (
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
      {itinerary?.activities.map((item, index) => (
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
        <Text alignment="end" textWeight="light">
          taxa {formatPrice(itineraryAmount.tax * 100)}
        </Text>
        <Text alignment="end" textWeight="light">
          subtotal {formatPrice(itineraryAmount.amount * 100)}
        </Text>
        <RowGroup justify="flex-start">
          <Text textColor="primaryText" textWeight="light">
            Total(a vista){' '}
          </Text>
          <Text.Title>{formatPrice(itineraryAmount.total * 100)}</Text.Title>
        </RowGroup>
      </View>
    </FlexContainer>
  );
};

export default CheckoutItinerary;
