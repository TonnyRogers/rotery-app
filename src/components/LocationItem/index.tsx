import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import * as RootNavigation from '../../RootNavigation';

import Card from '../Card';
import ImageCarousel from '../ImageCarousel';
import {Location} from '../../utils/types';
import {CardHeader, Badge, Badges} from './styles';
import Text from '../Text';
import RowGroup from '../RowGroup';
import Button from '../Button';
import Divider from '../Divider';

interface LocationItemProps {
  location: Location;
}

export function LocationItem({location}: LocationItemProps) {
  function formatIndicators(comparable: number) {
    return comparable > 9 ? '9' + '+' : comparable;
  }

  return (
    <Card marginHorizontal={0} marginVertical={8}>
      <ImageCarousel data={location.photos.map((photo) => photo.file)} />
      <CardHeader>
        <RowGroup align="flex-end">
          <Text.Paragraph textColor="primaryText" textWeight="bold">
            {location.name}
          </Text.Paragraph>
          <Button
            onPress={() => {}}
            customContent
            sizeHeight={2.5}
            sizeWidth={2.5}
            sizeBorderRadius={0}
            sizePadding={0}
            bgColor="transparent"
            textColor="white">
            <Icon name="book-outline" size={24} color="#3dc77b" />
          </Button>
        </RowGroup>
        <Text textWeight="light" maxLines={1}>
          {location.location}
        </Text>

        <Divider />
        <Text textWeight="light" maxLines={2}>
          {location.description}
        </Text>
        <Divider />
        <RowGroup justify="space-between">
          <Badges>
            <Badge>
              <IconMaterial name="category" size={20} color="#FFF" />
              <Text textColor="white">
                {formatIndicators(location.activities.length)}
              </Text>
            </Badge>
            <Badge>
              <Icon name="bed" size={20} color="#FFF" />
              <Text textColor="white">
                {formatIndicators(location.lodgings.length)}
              </Text>
            </Badge>
            <Badge>
              <IconMaterial name="person-pin-circle" size={20} color="#FFF" />
              <Text textColor="white">
                {formatIndicators(location.guides.length)}
              </Text>
            </Badge>
            <Badge>
              <Icon name="thumbs-up-down" size={20} color="#FFF" />
              <Text textColor="white">
                {' ' + formatIndicators(location.ratings.length)}
              </Text>
            </Badge>
          </Badges>
          <Button
            isFlex
            onPress={() =>
              RootNavigation.navigate<{location: Location}>(
                'LocationFeedDetails',
                {location},
              )
            }
            customContent
            sizeHeight={4}
            sizeBorderRadius={0}
            cornerRadius={{bottomL: 8, bottomR: 8, topL: 8, topR: 0}}
            sizePadding={0}
            bgColor="green"
            textColor="white">
            <Text.Paragraph textWeight="bold" textColor="white">
              Detalhes
            </Text.Paragraph>
          </Button>
        </RowGroup>
      </CardHeader>
    </Card>
  );
}
