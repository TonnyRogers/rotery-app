import React, {useMemo} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import ShadowBox from '../ShadowBox';
import RowGroup from '../RowGroup';
import Text from '../Text';
import ImageContainer from '../ImageContainer';
import StarRate from '../StarRate';

import {UserButton} from './styles';
import {LocationRating} from '../../utils/types';
import {formatLocale} from '../../providers/dayjs-format-locale';

interface LocationRatingItemProps {
  rating: LocationRating;
}

export function LocationRatingItem({rating}: LocationRatingItemProps) {
  const navigation = useNavigation();
  const postDate = useMemo(
    () => formatLocale(rating.createdAt, 'DD MMM YYYY'),
    [rating.createdAt],
  );

  function viewProfile(userId: number) {
    navigation.navigate('UserDetails', {
      userId,
    });
  }

  return (
    <ShadowBox>
      <RowGroup align="center">
        <RowGroup justify="flex-start">
          <UserButton onPress={() => viewProfile(rating.owner.id)}>
            <ImageContainer url={rating.owner.profile.file?.url || ''} />
          </UserButton>
          <View>
            <Text.Paragraph textColor="primaryText" textWeight="bold">
              {rating.owner.username}
            </Text.Paragraph>
            <Text textColor="secondaryText" textWeight="light">
              {postDate}
            </Text>
          </View>
        </RowGroup>
        <StarRate rate={rating.rate} />
      </RowGroup>
      <Text textColor="secondaryText" textWeight="light">
        {rating.description}
      </Text>
    </ShadowBox>
  );
}
