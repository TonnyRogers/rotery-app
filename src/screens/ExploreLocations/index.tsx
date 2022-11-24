/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as RootNavigation from '../../RootNavigation';

import Text from '../../components/Text';
import Page from '../../components/Page';
import ColumnGroup from '../../components/ColumnGroup';
import Button from '../../components/Button';

import {
  ActivityList,
  LocationCardList,
  LocationButton,
  LocationImage,
  LocationButtonTextContainer,
  BackgroundOverlay,
  BackButton,
  Header,
} from './styles';
import CustomIcon from '../../components/CustomIcon';
import {PageContainer} from '../../components/PageContainer';
import {LocationFeedFilterParams} from '../LocationFeed';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
import {useDispatch, useSelector} from 'react-redux';
import {viewedGuide} from '../../store2/guides';
import {getActivities} from '../../store2/options';
import {RootState} from '../../providers/store';
import {GuideEnum} from '../../utils/enums';

const exploreBrazilRegions = [
  {
    title: 'Norte',
    imageUrl:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/region-norte.jpeg',
  },
  {
    title: 'Nordeste',
    imageUrl:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/region-nordeste.jpeg',
  },
  {
    title: 'Centro Oeste',
    imageUrl:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/region-centroeste.jpeg',
  },
  {
    title: 'Sul',
    imageUrl:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/region-sul.jpeg',
  },
  {
    title: 'Sudeste',
    imageUrl:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/region-suldeste.jpeg',
  },
  ,
];

export function ExploreLocations() {
  const dispatch = useDispatch();
  const {
    exploreLocationsGuide,
    data: {exploreLocationsContent},
  } = useSelector((state: RootState) => state.guides);
  const {activities} = useSelector((state: RootState) => state.options);

  useEffect(() => {
    dispatch(getActivities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const guideContent = exploreLocationsContent.map((content) => ({
    isAnimation: content.isAnimation,
    url: content.externalUrl ?? '',
    message: content.content ?? '',
    title: content.title ?? '',
    withInfo: content.withInfo,
  }));

  return (
    <Page showHeader={false}>
      <PageContainer isScrollable>
        <Header>
          <BackButton onPress={() => RootNavigation.replace('Welcome')}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
        </Header>
        <Text.Subtitle textWeight="bold" textColor="primaryText">
          Encontre seu próximo destino 🗺
        </Text.Subtitle>
        <Text.Title>Atividades em destaque</Text.Title>
        <ActivityList horizontal showsHorizontalScrollIndicator={false}>
          {activities.map((val, index) => (
            <Button
              key={index}
              onPress={() => {
                RootNavigation.replace<LocationFeedFilterParams>(
                  'LocationFeed',
                  {
                    activity: {id: val.id, name: val.name},
                  },
                );
              }}
              customContent
              sizeHeight={7}
              sizeWidth={7}
              sizeMargin="0 1.5rem 0 0"
              bgColor="green"
              textColor="white">
              <ColumnGroup>
                <CustomIcon name={val.icon} size={30} color="#FFF" />
                <Text.Small
                  alignment="center"
                  textColor="white"
                  textWeight="bold">
                  {val.name}
                </Text.Small>
              </ColumnGroup>
            </Button>
          ))}
        </ActivityList>

        <Text.Subtitle textColor="blue" textWeight="bold">
          Regiões do Brasil
        </Text.Subtitle>
        <LocationCardList>
          {exploreBrazilRegions.map((val, index) => (
            <LocationButton
              key={index}
              onPress={() => {
                if (val?.title) {
                  RootNavigation.replace<LocationFeedFilterParams>(
                    'LocationFeed',
                    {
                      region: val?.title,
                    },
                  );
                }
              }}>
              <LocationImage
                blurRadius={4}
                source={{
                  uri: val?.imageUrl,
                }}
              />
              <BackgroundOverlay />
              <LocationButtonTextContainer>
                <Text textColor="white" textWeight="bold">
                  {val?.title}
                </Text>
              </LocationButtonTextContainer>
            </LocationButton>
          ))}
        </LocationCardList>
      </PageContainer>
      <Ads
        visible={exploreLocationsGuide}
        onRequestClose={() => {}}
        key="guide-welcome">
        <GuideCarousel
          data={guideContent}
          onClose={() =>
            dispatch(viewedGuide({key: GuideEnum.EXPLORE_LOCATIONS}))
          }
        />
      </Ads>
    </Page>
  );
}
