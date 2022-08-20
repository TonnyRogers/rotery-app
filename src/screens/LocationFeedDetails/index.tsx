/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

import * as RootNavigation from '../../RootNavigation';
import api from '../../services/api';

import Page from '../../components/Page';
import {PageContainer} from '../../components/PageContainer';
import {View} from 'react-native';
import Card from '../../components/Card';
import ImageCarousel from '../../components/ImageCarousel';
import RowGroup from '../../components/RowGroup';
import Text from '../../components/Text';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import {Location, GuideLocation} from '../../utils/types';

import {
  CardHeader,
  ItemsContent,
  IconHolder,
  LocationDetailing,
} from './styles';
import StarRate from '../../components/StarRate';
import {LocationGuide} from '../../components/LocationGuide';
import {LocationRatingItem} from '../../components/LocationRatingItem';
import ShadowBox from '../../components/ShadowBox';
import {theme} from '../../utils/theme';
import formatLocale from '../../providers/dayjs-format-locale';
import {useSelector} from 'react-redux';
import {RootStateProps} from '../../store/modules/rootReducer';
import Toast from 'react-native-toast-message';

interface LocationFeedDetailsProps {
  route: {
    params: {
      location: Location;
    };
  };
}

export function LocationFeedDetails({
  route: {
    params: {location},
  },
}: LocationFeedDetailsProps) {
  const {user} = useSelector((state: RootStateProps) => state.auth);

  const updatedAtFormatted = useMemo(() => {
    return formatLocale(location.updatedAt, 'DD MMM YYYY');
  }, [location.updatedAt]);
  const [locationGuides, setLocationGuides] = useState<GuideLocation[] | null>(
    null,
  );

  const renderTransports = useMemo(() => {
    return location.transports.map((item, index) => (
      <ShadowBox key={'transport' + index}>
        <RowGroup align="flex-end">
          <Text.Paragraph textColor="primaryText" textWeight="bold">
            {item.transport.name}
          </Text.Paragraph>
          <View>
            <Text textWeight="light" alignment="end">
              Preço
            </Text>
            <Text textWeight="bold">{item.isFree ? 'Gratis' : item.price}</Text>
          </View>
        </RowGroup>
        <Divider />
        <Text textWeight="light">{item.description}</Text>
      </ShadowBox>
    ));
  }, [location.transports]);

  const renderLodgings = useMemo(() => {
    return location.lodgings.map((item, index) => (
      <ShadowBox key={'lodging' + index}>
        <RowGroup align="flex-start">
          <Text.Paragraph textColor="primaryText" textWeight="bold">
            {item.lodging.name}
          </Text.Paragraph>
          <View>
            <Text textWeight="light" alignment="end">
              Preço
            </Text>
            <Text textWeight="bold">{item.isFree ? 'Gratis' : item.price}</Text>
          </View>
        </RowGroup>
        <Divider />
        <Text textWeight="light">{item.description}</Text>
      </ShadowBox>
    ));
  }, [location.lodgings]);

  const renderActivities = useMemo(() => {
    return location.activities.map((item, index) => (
      <ShadowBox key={'activity' + index}>
        <RowGroup align="flex-start">
          <Text.Paragraph textColor="primaryText" textWeight="bold">
            {item.activity.name}
          </Text.Paragraph>
          <View>
            <Text textWeight="light" alignment="end">
              Preço
            </Text>
            <Text textWeight="bold">{item.isFree ? 'Gratis' : item.price}</Text>
          </View>
        </RowGroup>
        <Divider />
        <Text textWeight="light">{item.description}</Text>
      </ShadowBox>
    ));
  }, [location.activities]);

  const renderDetailings = () =>
    location.detailings.map((detailing, index) => {
      if ('icon' in detailing) {
        return (
          <LocationDetailing key={'detailing' + index}>
            {detailing.iconType === 'default' ? (
              <Icon name={detailing.icon} size={30} color="#3dc77b" />
            ) : (
              <IconMaterial name={detailing.icon} size={30} color="#3dc77b" />
            )}
            <Text.SemiSmall alignment="center" textColor="primaryText">
              {detailing.text}
            </Text.SemiSmall>
          </LocationDetailing>
        );
      }
    });

  function goBack() {
    RootNavigation.goBack();
  }

  async function joinLocation() {
    try {
      await api.post<GuideLocation[]>(`/guide-locations/join/${location.id}`);
      Toast.show({
        text1: 'Local vinculado a você 🤝',
        position: 'bottom',
        type: 'success',
      });
    } catch (error) {
      Toast.show({
        text1: 'Erro ao vincular local.',
        position: 'bottom',
        type: 'error',
      });
    }
  }

  useEffect(() => {
    async function getGuides() {
      const response = await api.get<GuideLocation[]>(
        `/guide-locations/${location.id}`,
      );

      if (response.data.length) {
        setLocationGuides(response.data);
      }
    }

    getGuides();
  }, [location.id]);

  return (
    <Page showHeader={false}>
      <PageContainer isScrollable>
        <Card marginHorizontal={0} marginVertical={8}>
          <CardHeader>
            <Button
              onPress={goBack}
              customContent
              sizeHeight={4}
              sizeWidth={4}
              sizeBorderRadius={20}
              sizePadding={0}
              bgColor="greenTransparent"
              textColor="white">
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </Button>
          </CardHeader>
          <Divider />
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
              sizeMargin="0px"
              sizePadding={0}
              bgColor="transparent"
              textColor="white">
              <Icon name="book-outline" size={24} color="#3dc77b" />
            </Button>
          </RowGroup>
          <Text textWeight="light" maxLines={1}>
            {location.location}
          </Text>
          <Text textWeight="light">{updatedAtFormatted}</Text>
          <ImageCarousel data={location.photos.map((photo) => photo.file)} />
          <View>
            <Divider />
            <Text textWeight="light">{location.description}</Text>
            <Divider />
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <StarRate rate={location.ratingAvg || 0} />
              <Text textColor="primaryText">
                {location.ratings.length} Avaliações
              </Text>
            </View>
            <Divider />
            <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'row'}}>
              {renderDetailings()}
            </View>
            <Divider />
            <ItemsContent>
              <IconHolder>
                <Icon name="car" color="#FFF" size={24} />
              </IconHolder>
              <Text.Title>Transporte</Text.Title>
            </ItemsContent>
            {renderTransports}
            <ItemsContent>
              <IconHolder>
                <Icon name="bed" color="#FFF" size={24} />
              </IconHolder>
              <Text.Title>Hospedagem</Text.Title>
            </ItemsContent>
            {renderLodgings}
            <ItemsContent>
              <IconHolder>
                <Icon name="lightning-bolt" color="#FFF" size={24} />
              </IconHolder>
              <Text.Title>Atividades</Text.Title>
            </ItemsContent>
            {renderActivities}
          </View>
        </Card>
        <Card marginHorizontal={0} marginVertical={8}>
          <ItemsContent>
            <IconHolder>
              <IconMaterial name="person-pin-circle" color="#FFF" size={24} />
            </IconHolder>
            <Text.Title>Guias relacionados</Text.Title>
          </ItemsContent>
          {locationGuides?.map((guide) => (
            <LocationGuide
              key={guide.user.id}
              guide={guide.user}
              location={location}
            />
          ))}

          {user?.isHost &&
            !locationGuides?.find(
              (guideItem) => guideItem.user.id === user.id,
            ) && (
              <Button
                onPress={joinLocation}
                customContent
                sizeHeight={4.4}
                sizeMargin="1rem 0"
                bgColor="blue">
                <Text.Paragraph textWeight="bold" textColor="white">
                  Vincular Local a Você
                </Text.Paragraph>
              </Button>
            )}
        </Card>
        <Card marginHorizontal={0} marginVertical={8}>
          <ItemsContent>
            <IconHolder>
              <Icon
                name="thumbs-up-down"
                size={20}
                color={theme.colors.white}
              />
            </IconHolder>
            <Text.Title>Avaliações</Text.Title>
          </ItemsContent>
          {location.ratings.map((rating, index) => (
            <LocationRatingItem key={index} rating={rating} />
          ))}
        </Card>
      </PageContainer>
    </Page>
  );
}
