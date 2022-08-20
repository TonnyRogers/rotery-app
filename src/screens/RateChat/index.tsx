import React, {useState} from 'react';

import api from '../../services/api';
import NetInfo from '../../services/netinfo';
import * as RootNavigation from '../../RootNavigation';

import Page from '../../components/Page';
import {PageContainer} from '../../components/PageContainer';
import Card from '../../components/Card';
import ImageContainer from '../../components/ImageContainer';
import RowGroup from '../../components/RowGroup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../../components/Text';
import ColumnGroup from '../../components/ColumnGroup';
import {StarPicker} from '../../components/StarPicker';
import TextArea from '../../components/TextArea';
import Button from '../../components/Button';
import {RateChatNotificationJsonData} from '../../utils/types';
import formatLocale from '../../providers/dayjs-format-locale';
import Toast from 'react-native-toast-message';
import SplashScreen from '../../components/SplashScreen';

export interface RateChatRouteParams extends RateChatNotificationJsonData {}

interface RateChatProps {
  route: {
    params: RateChatRouteParams;
  };
}

export function RateChat({
  route: {
    params: {guide, location},
  },
}: RateChatProps) {
  const [guideRating, setGuideRating] = useState(0);
  const [guideReview, setGuideReview] = useState('');
  const [locationRating, setLocationRating] = useState(0);
  const [locationReview, setLocationReview] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSendRatings() {
    if (guideRating === 0 || locationRating === 0) {
      return;
    }

    const info = await NetInfo();

    if (!info.status) {
      return;
    }

    setLoading(true);

    try {
      await api.post(`/user-ratings/${guide.id}`, {
        rate: guideRating,
        description: guideReview,
      });
    } catch (error) {
      Toast.show({
        text1: 'Erro ao avaliar guia.',
        text2: 'tente novamente',
        position: 'bottom',
        type: 'error',
      });
      setLoading(false);
      return;
    }

    try {
      await api.post(`/location-ratings/${location.id}`, {
        rate: locationRating,
        description: locationReview,
      });
    } catch (error) {
      Toast.show({
        text1: 'Erro ao avaliar local.',
        text2: 'tente novamente',
        position: 'bottom',
        type: 'error',
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    RootNavigation.goBack();
  }

  return (
    <Page showHeader={false}>
      <PageContainer isScrollable>
        <Card marginHorizontal={0}>
          <ColumnGroup isFlex={false}>
            <RowGroup isFlex={false} justify="center">
              <Icon name="compass-outline" size={30} color="#3dc77b" />
              <Text.Title textColor="blue">Guia</Text.Title>
            </RowGroup>
            <ImageContainer size="big" url={guide.profile.file?.url || ''} />
            <Text.Title textColor="primaryText">{guide.username}</Text.Title>
            <Text>Ativo {formatLocale(guide.createdAt, 'DD MMM YYYY')}</Text>
            <StarPicker
              value={guideRating}
              onSelect={(rate) => setGuideRating(rate)}
            />
          </ColumnGroup>
          <TextArea
            isFlex={false}
            label="Avaliação"
            placeholder="Escreva o que achou do guia..."
            value={guideReview}
            onChange={(review: string) => setGuideReview(review)}
          />
        </Card>
        <Card marginHorizontal={0}>
          <ColumnGroup isFlex={false}>
            <RowGroup isFlex={false} justify="center">
              <Icon name="map-outline" size={30} color="#3dc77b" />
              <Text.Title textColor="blue">Local</Text.Title>
            </RowGroup>
            <Text.Title maxLines={2} textColor="primaryText">
              {location.name}
            </Text.Title>
            <Text>{location.state}</Text>
            <StarPicker
              value={locationRating}
              onSelect={(rate) => setLocationRating(rate)}
            />
          </ColumnGroup>
          <TextArea
            isFlex={false}
            label="Avaliação"
            placeholder="Escreva o que achou deste lugar..."
            value={locationReview}
            onChange={(review: string) => setLocationReview(review)}
          />
        </Card>
        <Button
          onPress={handleSendRatings}
          customContent
          sizeBorderRadius={10}
          sizePadding={0}
          sizeMargin="1rem 0"
          bgColor="blue"
          textColor="white">
          <Text.Paragraph textWeight="bold" textColor="white">
            Avaliar
          </Text.Paragraph>
        </Button>
      </PageContainer>
      <SplashScreen visible={loading} />
    </Page>
  );
}
