/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
import {hideExploreLocationsGuide} from '../../store/modules/guides/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {exploreLocationsGuideImages} from '../../utils/constants';

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
    title: 'Suldeste',
    imageUrl:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/region-suldeste.jpeg',
  },
  ,
];

const activitiesFilter = [
  {title: 'Trilha', icon: 'trekking-pole'},
  {title: 'Camping', icon: 'tent'},
  {title: 'Off Road', icon: 'jeep'},
  {title: 'Quadriciclo', icon: 'offroad'},
  {title: 'Mergulho', icon: 'scuba-diving'},
  {title: 'Caminhada', icon: 'hiking'},
  {title: 'Escalada', icon: 'climbing'},
  {title: 'Rafting', icon: 'raft'},
  {title: 'Surf', icon: 'surfboard'},
  {title: 'Stake', icon: 'skateboard'},
  {title: 'Pedalada', icon: 'bicycle'},
  {title: 'Tirolesa', icon: 'zipline'},
  {title: 'Passeio de Barco', icon: 'boat'},
  {title: 'Salto de Paraquedas', icon: 'skydiving'},
  {title: 'Asa Delta', icon: 'hang-gliding'},
  {title: 'Montanhismo', icon: 'mountain-flag'},
  {title: 'Bungee Jump', icon: 'bungee-jumping'},
  {title: 'Rappel', icon: 'rappel'},
];

export function ExploreLocations() {
  const dispatch = useDispatch();
  const {exploreLocationsGuide} = useSelector(
    (state: RootStateProps) => state.guides,
  );

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
          {activitiesFilter.map((val, index) => (
            <Button
              key={index}
              onPress={() => {}}
              customContent
              sizeHeight={7}
              sizeWidth={7}
              sizeMargin="0 1.5rem 0 0"
              bgColor="green"
              textColor="white">
              <ColumnGroup>
                {/* <Icon name="menu" size={24} color={theme.colors.white} /> */}
                <CustomIcon name={val.icon} size={25} color="#FFF" />
                <Text.Small
                  alignment="center"
                  textColor="white"
                  textWeight="bold">
                  {val.title}
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
              onPress={() =>
                RootNavigation.replace<LocationFeedFilterParams>(
                  'LocationFeed',
                  {
                    activity: val?.title,
                  },
                )
              }>
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
          data={exploreLocationsGuideImages}
          onClose={() => dispatch(hideExploreLocationsGuide())}
        />
      </Ads>
    </Page>
  );
}
