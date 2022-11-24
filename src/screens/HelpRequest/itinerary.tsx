import React, {useMemo} from 'react';
import {View} from 'react-native';

import RowGroup from '../../components/RowGroup';
import Text from '../../components/Text';
import ImageContainer from '../../components/ImageContainer';
import Divider from '../../components/Divider';
import {formatPrice} from '../../lib/utils';
import {formatLocale} from '../../providers/dayjs-format-locale';
import {CustomRevenue} from '.';

interface HelpItineraryProps {
  item: CustomRevenue;
}

export function HelpItinerary({item}: HelpItineraryProps) {
  const formattedDated = useMemo(() => {
    const begin = formatLocale(
      String(item.itinerary?.begin),
      'DD MMM YY HH:mm',
    );
    const paymentDateCreated =
      formatLocale(item?.createdAt, 'DD MMM YY HH:mm') || null;

    return {begin, paymentDateCreated};
  }, [item]);

  return (
    <>
      <Text.Title>Roteiro</Text.Title>
      <RowGroup>
        <View>
          <Text
            textColor="primaryText"
            textWeight="bold"
            limitter={14}
            maxLines={1}>
            {item.itinerary.name}
          </Text>
          <Text limitter={14} maxLines={1} textWeight="light">
            {item.itinerary.location}
          </Text>
          <Text textWeight="light">{formattedDated.begin}</Text>
        </View>
        <View>
          <RowGroup justify="flex-start">
            <ImageContainer
              size="small"
              url={('member' in item && item.member.avatar) || ''}
            />
            <View>
              <Text
                limitter={12}
                maxLines={1}
                alignment="start"
                textColor="primaryText"
                textWeight="bold">
                {'member' in item ? 'Viajante' : 'Host'}
              </Text>
              <Text
                limitter={12}
                maxLines={1}
                textColor="secondaryText"
                textWeight="light">
                {'member' in item
                  ? item.member.username
                  : item.itinerary.owner.username}
              </Text>
            </View>
          </RowGroup>
          <Text textWeight="light">{formattedDated.paymentDateCreated}</Text>
          <Divider />
          <RowGroup justify="flex-start">
            <Text textColor="primaryText" textWeight="light">
              Total
            </Text>
            <Text.Title>
              {'amount' in item
                ? formatPrice(item?.amount * 100)
                : formatPrice(item?.payment.transaction_amount * 100)}
            </Text.Title>
          </RowGroup>
        </View>
      </RowGroup>
    </>
  );
}
