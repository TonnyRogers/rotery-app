/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

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
import {useSelector} from 'react-redux';
import {RootStateProps} from '../../store/modules/rootReducer';
import RowGroup from '../../components/RowGroup';
import ImageContainer from '../../components/ImageContainer';
import {
  WelcomeBackpackerMetadata,
  WelcomeGuideMetadata,
} from '../../utils/types';
import api from '../../services/api';
import {AxiosResponse} from 'axios';

const stepList = [
  {
    title: 'Foto do perfil 📸',
    text: 'saber com quem estamos interagindo tras muito mais segurança que tal mostrar seu rostinho ?',
    navigationTarget: '',
    done: true,
  },
  {
    title: ' Um pouco mais sobre você 🙈',
    text: 'preencha seus dados do perfil e assim todos vão saber mais sobre quem você é.',
    navigationTarget: '',
    done: false,
  },
  {
    title: 'Primeiro contato 🤝',
    text: 'entre num chat com um guia, vai que o primeiro é de graça.',
    navigationTarget: '',
    done: false,
  },
];

export function Welcome() {
  const {user} = useSelector((state: RootStateProps) => state.auth);
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

  return (
    <Page>
      <PageContainer isScrollable={false}>
        <Text textWeight="bold" textColor="secondaryText">
          OLÁ, {user && user.username.toLocaleUpperCase()} 🤙
        </Text>
        <Divider />
        <Card
          containerStyle={{flex: undefined, height: 270}}
          marginHorizontal={0}>
          <Text.Title>Primeiros Passos</Text.Title>
          <Text>
            Antes de mais nada existem algumas tarefas que preparamos, elas nos
            auxiliam a saber um pouco mais sobre você.
          </Text>
          <Divider />
          <SimpleList isHorizontal={false}>
            {stepList.map((item, index) => (
              <StepItemContainer
                key={index}
                active={item.done}
                isLast={stepList.length - 1 === index}>
                <StepItemCircleContainer active={item.done}>
                  <StepItemCircle />
                </StepItemCircleContainer>
                <TouchableOpacity>
                  <Text textWeight="bold" textColor="primaryText">
                    {item.title}
                  </Text>
                  <Text>{item.text}</Text>
                  <Tag align="flex-start">
                    <Text.Small textWeight="bold">clique aqui</Text.Small>
                  </Tag>
                </TouchableOpacity>
              </StepItemContainer>
            ))}
          </SimpleList>
        </Card>
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
            <ImageContainer.Overlayed
              height={100}
              url="https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg">
              <>
                <Text.Title textWeight="bold" textColor="white">
                  Principais Destinos de Inverno
                </Text.Title>
                <Text textColor="white">
                  Confira os locais mais procurados nesta estação do ano
                </Text>
              </>
            </ImageContainer.Overlayed>
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
      </PageContainer>
    </Page>
  );
}
