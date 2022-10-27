/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {AxiosResponse} from 'axios';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';

import api from '../../providers/api';
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
import {
  AppRoutes,
  WelcomeStepListType,
  YupValidationMessages,
} from '../../utils/enums';
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
import BottomSheet from '../../components/BottomSheet';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {phoneBR} from '../../lib/mask';
import DismissKeyboad from '../../components/DismissKeyboad';
import Toast from 'react-native-toast-message';

const validationSchema = yup.object().shape({
  phone: yup
    .string()
    .required(YupValidationMessages.REQUIRED)
    .min(11, 'telefone incompleto'),
});

export function Welcome() {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootStateProps) => state.auth);
  const {firstStep} = useSelector((state: RootStateProps) => state.metadata);
  const {welcomeGuide} = useSelector((state: RootStateProps) => state.guides);
  const [isGuideActivateVisible, setIsGuideActivateVisible] = useState(false);
  const [welcomeMeta, setWelcomeMeta] = useState<
    WelcomeBackpackerMetadata | WelcomeGuideMetadata
  >();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});

  const watchPhone = watch('phone', '');

  useEffect(() => {
    async function getWelcomeMetadata() {
      const response: AxiosResponse<
        WelcomeBackpackerMetadata | WelcomeGuideMetadata
      > = await api.get(
        `metadata/${user?.isGuide ? 'guide' : 'backpacker'}-welcome`,
      );

      setWelcomeMeta(response.data);
    }

    getWelcomeMetadata();
  }, [user]);

  useEffect(() => {
    dispatch(getFirstStepsRequest());
    register('phone');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleStepNavigation(target: AppRoutes) {
    if (target === AppRoutes.EXPLORE_LOCATIONS) {
      RootNavigation.replace(target);
    } else {
      RootNavigation.navigate(target);
    }
  }

  function handleStepClickSideAction(type: WelcomeStepListType) {
    if (type === WelcomeStepListType.GUIDE_LOCATION_RELATE_VALIDATION) {
      setIsGuideActivateVisible(true);
    }
  }

  async function handleRequestGuideValidation() {
    try {
      await api.post('/communications/help', {
        data: {
          Tipo: 'Ativação de Guia',
          'Solicitado Em': new Date(),
          Contato: watchPhone,
          UserId: user?.id,
        },
        message: 'gostaria de solicitar minha ativação como guia',
        type: 'guideActivation',
      });

      Toast.show({
        text1: 'Verificação solicitada !',
        text2: 'entraremos em contato.',
        position: 'bottom',
        type: 'success',
        visibilityTime: 3000,
      });
    } catch (error) {
      Toast.show({
        text1: 'Erro ao solicitar verificação',
        text2: 'tente mais tarde.',
        position: 'bottom',
        type: 'error',
      });
    }

    setIsGuideActivateVisible(false);
    setValue('phone', '');
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
              onPress={() =>
                item.appNavigationTarget
                  ? handleStepNavigation(item.appNavigationTarget)
                  : handleStepClickSideAction(item.type)
              }
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
        {!user?.isGuide ? (
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
            user?.isGuide
              ? guideWelcomeGuideImages
              : backpackerWelcomeGuideImages
          }
          onClose={() => dispatch(hideWelcomeGuide())}
        />
      </Ads>
      <BottomSheet
        visible={isGuideActivateVisible}
        title="Verificar usuário"
        onRequestClose={() => setIsGuideActivateVisible(false)}>
        <DismissKeyboad>
          <SimpleList>
            <Divider />
            <Text.Title textColor="primaryText">
              Solicite sua ativação e comece a ajudar mochileiros
            </Text.Title>
            <Text.Paragraph textWeight="regular" textColor="secondaryText">
              Neste processo vamos entrar em contato com você (por mensagem ou
              vídeo) para explicar nossa visão, diretrizes da comunidade e
              conhecer mais sobre você.
            </Text.Paragraph>
            <Divider />
            <Text.Paragraph textWeight="regular" textColor="secondaryText">
              Se tudo der certo você será verificado e poderá ajudar mochileiros
              se vinculando a locais onde podem te achar, esse é um contato
              muito importante para nós, buscamos esse tipo de proximidade com
              os usuários do app.
            </Text.Paragraph>
            <Divider />
            <Text textWeight="regular" textColor="secondaryText">
              Obs: sem essa etapa você não poderá se vincular a locais.
            </Text>

            <Input
              icon="cellphone-iphone"
              label="Telefone"
              placeholder="Digite o telefone (Whatsapp)"
              maxLength={14}
              value={watchPhone}
              onChange={(value: string) => setValue('phone', phoneBR(value))}
              returnKeyType="done"
              error={errors.phone?.message}
              keyboardType="number-pad"
              onSubmitEditing={handleSubmit(handleRequestGuideValidation)}
            />
            <Button
              bgColor="green"
              onPress={handleSubmit(handleRequestGuideValidation)}>
              Solicitar Verificação
            </Button>
          </SimpleList>
        </DismissKeyboad>
      </BottomSheet>
    </Page>
  );
}
