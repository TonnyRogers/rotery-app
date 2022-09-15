import React, {useState, useRef, useContext} from 'react';

import api from '../../providers/api';
import NetInfo from '../../providers/netinfo';
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
import {
  RateChatNotificationJsonData,
  CardTokenResponse,
} from '../../utils/types';
import formatLocale from '../../providers/dayjs-format-locale';
import Toast from 'react-native-toast-message';
import Input from '../../components/Input';
import {formatBRL, realToUSCash} from '../../lib/mask';
import {CardConfirm} from '../../components/CardConfirm';
import {useDispatch, useSelector} from 'react-redux';
import {processTipRequest} from '../../store/modules/checkout/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {LoadingContext} from '../../context/loading/context';

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
  const {setLoading} = useContext(LoadingContext);
  const dispatch = useDispatch();
  const [guideRating, setGuideRating] = useState(0);
  const [guideReview, setGuideReview] = useState('');
  const [locationRating, setLocationRating] = useState(0);
  const [locationReview, setLocationReview] = useState('');
  const [webCardConfirmVisible, setWebCardConfirmVisible] = useState(false);
  const [tipValue, setTipValue] = useState('');
  const validatedCard = useRef<CardTokenResponse>();
  const {defaultCard} = useSelector((state: RootStateProps) => state.checkout);
  const {user} = useSelector((state: RootStateProps) => state.auth);

  function handleTipProcess() {
    if (Number(realToUSCash(tipValue)) > 0) {
      setWebCardConfirmVisible(true);
    } else {
      handleSendRatings();
    }
  }

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

    if (
      Number(realToUSCash(tipValue)) > 0 &&
      validatedCard.current &&
      defaultCard &&
      user
    ) {
      dispatch(
        processTipRequest({
          cardInfo: {
            issuerId: String(defaultCard?.issuer.id),
            paymentMethod: defaultCard?.payment_method.id,
            token: validatedCard.current.id,
          },
          paymentAmount: String(realToUSCash(tipValue)),
          user: {id: guide.id},
        }),
      );
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
        <Card marginHorizontal={0}>
          <ColumnGroup isFlex={false}>
            <Text.Title>Contribuir</Text.Title>
            <Text alignment="center">
              Mostre seu apoio a guias como {guide.username}, contribua com
              algum valor que vai direto para ele.
            </Text>
            <Input
              placeholder="R$0,00"
              keyboardType="number-pad"
              value={tipValue}
              onChange={(value: string) =>
                setTipValue(String(formatBRL(value)))
              }
            />
            <RowGroup justify="center">
              <Button
                onPress={() => setTipValue(String(formatBRL('500')))}
                customContent
                sizeBorderRadius={10}
                sizeWidth={8}
                sizeHeight={4}
                sizePadding={0}
                sizeMargin="0 1rem 0 0"
                bgColor="blue"
                textColor="white">
                <Text.Paragraph textWeight="bold" textColor="white">
                  5,00
                </Text.Paragraph>
              </Button>
              <Button
                onPress={() => setTipValue(String(formatBRL('1500')))}
                customContent
                sizeBorderRadius={10}
                sizeWidth={8}
                sizeHeight={4}
                sizePadding={0}
                sizeMargin="0 1rem 0 0"
                bgColor="blue"
                textColor="white">
                <Text.Paragraph textWeight="bold" textColor="white">
                  15,00
                </Text.Paragraph>
              </Button>
              <Button
                onPress={() => setTipValue(String(formatBRL('2500')))}
                customContent
                sizeBorderRadius={10}
                sizeWidth={8}
                sizeHeight={4}
                sizePadding={0}
                bgColor="blue"
                textColor="white">
                <Text.Paragraph textWeight="bold" textColor="white">
                  25,00
                </Text.Paragraph>
              </Button>
            </RowGroup>
            <Text>sugestão rápida de valores</Text>
          </ColumnGroup>
        </Card>
        <Button
          onPress={handleTipProcess}
          customContent
          sizeBorderRadius={10}
          sizePadding={0}
          sizeMargin="1rem 0 2rem 0"
          bgColor="blue"
          textColor="white">
          <Text.Paragraph textWeight="bold" textColor="white">
            Avaliar
          </Text.Paragraph>
        </Button>
      </PageContainer>
      <CardConfirm
        visible={webCardConfirmVisible}
        amount={Number(realToUSCash(tipValue))}
        onValidateCard={(card) => {
          validatedCard.current = card;
          handleSendRatings();
        }}
        onRequestClose={() => {
          setWebCardConfirmVisible(false);
        }}
      />
    </Page>
  );
}
