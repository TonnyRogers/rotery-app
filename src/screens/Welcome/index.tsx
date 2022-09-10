/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {AxiosResponse} from 'axios';

import api from '../../services/api';
import * as RootNavigation from '../../RootNavigation';
const confirmAnimation = require('../../../assets/animations/animation_confirm.json');

import Page from '../../components/Page';
import {PageContainer} from '../../components/PageContainer';
import Text from '../../components/Text';
import Divider from '../../components/Divider';
import Card from '../../components/Card';
import {
  StepItemCircle,
  StepItemCircleContainer,
  StepItemContainer,
} from './styles';
import {SimpleList} from '../../components/SimpleList';
import Tag from '../../components/Tag';
import {useSelector, useDispatch} from 'react-redux';
import {RootStateProps} from '../../store/modules/rootReducer';
import RowGroup from '../../components/RowGroup';
import ImageContainer from '../../components/ImageContainer';
import {
  WelcomeBackpackerMetadata,
  WelcomeGuideMetadata,
} from '../../utils/types';
import {AppRoutes} from '../../utils/enums';
import {AnimationContent} from '../../components/AnimationContent';
import {getFirstStepsRequest} from '../../store/modules/metadata/actions';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
import {hideWelcomeGuide} from '../../store/modules/guides/actions';
import {
  guideWelcomeGuideImages,
  backpackerWelcomeGuideImages,
} from '../../utils/constants';
import ColumnGroup from '../../components/ColumnGroup';

export function Welcome() {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootStateProps) => state.auth);
  const {firstStep} = useSelector((state: RootStateProps) => state.metadata);
  const {welcomeGuide} = useSelector((state: RootStateProps) => state.guides);
  const [welcomeMeta, setWelcomeMeta] = useState<
    WelcomeBackpackerMetadata | WelcomeGuideMetadata
  >();

  useEffect(() => {
    async function getWelcomeMetadata() {
      const response: AxiosResponse<
        WelcomeBackpackerMetadata | WelcomeGuideMetadata
      > = await api.get(
        `metadata/${user?.isHost ? 'guide' : 'backpacker'}-welcome`,
      );

      setWelcomeMeta(response.data);
    }

    getWelcomeMetadata();
  }, [user]);

  useEffect(() => {
    dispatch(getFirstStepsRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStepNavigation(target: AppRoutes) {
    if (target === AppRoutes.EXPLORE_LOCATIONS) {
      RootNavigation.replace(target);
    } else {
      RootNavigation.navigate(target);
    }
  }

  function renderStepList() {
    return (
      <SimpleList isHorizontal={false}>
        {firstStep?.stepList.map((item, index) => (
          <StepItemContainer
            key={index}
            active={item.done}
            isLast={firstStep.stepList.length - 1 === index}>
            <StepItemCircleContainer active={item.done}>
              <StepItemCircle />
            </StepItemCircleContainer>
            <TouchableOpacity
              onPress={() => handleStepNavigation(item.appNavigationTarget)}
              disabled={item.done}>
              <Text textWeight="bold" textColor="primaryText">
                {item.title}
              </Text>
              <Text>{item.text}</Text>
              {!item.done && (
                <Tag align="flex-start">
                  <Text.Small textWeight="bold">clique aqui</Text.Small>
                </Tag>
              )}
            </TouchableOpacity>
          </StepItemContainer>
        ))}
      </SimpleList>
    );
  }

  return (
    <Page>
      <PageContainer isScrollable={false}>
        <Text textWeight="bold" textColor="secondaryText">
          OLÁ, {user && user.username.toLocaleUpperCase()} 🤙
        </Text>
        <Divider />
        {!user?.isHost ? (
          <>
            <Text textWeight="bold" textColor="primaryText">
              Contribuições
            </Text>
            <RowGroup isFlex={false} justify="flex-start">
              <Card
                containerStyle={{
                  height: 105,
                  width: 105,
                  flex: undefined,
                  marginRight: 10,
                }}
                marginHorizontal={0}
                marginVertical={4}
                bgColor="green">
                <Text textWeight="bold" textColor="white">
                  Locais Avaliados
                </Text>
                <Text.Big textWeight="bold" textColor="white">
                  {welcomeMeta &&
                    'ratedLocations' in welcomeMeta &&
                    welcomeMeta.ratedLocations}
                </Text.Big>
              </Card>
              <Card
                containerStyle={{
                  height: 105,
                  width: 105,
                  flex: undefined,
                  marginRight: 10,
                }}
                marginHorizontal={0}
                marginVertical={4}
                bgColor="blue">
                <Text textWeight="bold" textColor="white">
                  Guias Avaliados
                </Text>
                <Text.Big textWeight="bold" textColor="white">
                  {welcomeMeta &&
                    'ratedGuides' in welcomeMeta &&
                    welcomeMeta.ratedGuides}
                </Text.Big>
              </Card>
            </RowGroup>
          </>
        ) : (
          <>
            <Text textWeight="bold" textColor="primaryText">
              Contribuições
            </Text>
            <RowGroup isFlex={false} justify="flex-start">
              <Card
                containerStyle={{
                  height: 105,
                  width: 105,
                  flex: undefined,
                  marginRight: 10,
                }}
                marginHorizontal={0}
                marginVertical={4}
                bgColor="green">
                <Text textWeight="bold" textColor="white">
                  Mochileiros Ajudados
                </Text>
                <Text.Big textWeight="bold" textColor="white">
                  {welcomeMeta &&
                    'helpedBackpackers' in welcomeMeta &&
                    welcomeMeta.helpedBackpackers}
                </Text.Big>
              </Card>
            </RowGroup>
          </>
        )}
        <Card
          marginHorizontal={0}
          containerStyle={{height: 250, flex: undefined}}>
          <Text.Title>Primeiros Passos</Text.Title>
          <Text>
            Antes de mais nada existem algumas tarefas que preparamos, elas nos
            auxiliam a saber um pouco mais sobre você.
          </Text>
          <Divider />
          {!firstStep?.allDone ? (
            renderStepList()
          ) : (
            <ColumnGroup>
              <AnimationContent
                duration={3000}
                align="center"
                animationJson={confirmAnimation}
                height={120}
                loop={false}
              />
              <Text.Paragraph
                textWeight="bold"
                textColor="primaryText"
                alignment="center">
                Tudo Certo!
              </Text.Paragraph>
            </ColumnGroup>
          )}
        </Card>
        <ImageContainer.Overlayed
          height={110}
          url="https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg">
          <>
            <Text.Title textWeight="bold" textColor="white">
              Principais Destinos de Inverno
            </Text.Title>
            <Text textWeight="regular" textColor="white">
              Confira os locais mais procurados nesta estação do ano...
            </Text>
            <Text textWeight="bold" textColor="white">
              🚧 Indisponivel no momento 🚧
            </Text>
          </>
        </ImageContainer.Overlayed>
      </PageContainer>
      <Ads visible={welcomeGuide} onRequestClose={() => {}} key="guide-welcome">
        <GuideCarousel
          data={
            user?.isHost
              ? guideWelcomeGuideImages
              : backpackerWelcomeGuideImages
          }
          onClose={() => dispatch(hideWelcomeGuide())}
        />
      </Ads>
    </Page>
  );
}
