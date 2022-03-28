import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import * as RootNavigation from '../../RootNavigation';
import {Container, Header, Content} from './styles';
import Page from '../../components/Page';
import Text from '../../components/Text';
import Button from '../../components/Button';
import {theme} from '../../utils/theme';
import {useIsAndroid} from '../../hooks/useIsAndroid';
import ImageContainer from '../../components/ImageContainer';
import Divider from '../../components/Divider';

interface DisclaimerProps {}

export const Disclaimer = ({}: DisclaimerProps) => {
  const {isAndroid, isIOs} = useIsAndroid();

  return (
    <Page showHeader={false}>
      <Container
        renderToHardwareTextureAndroid={isAndroid}
        shouldRasterizeIOS={isIOs}
        scrollEventThrottle={16}
        decelerationRate="normal">
        <Header>
          <Button
            bgColor="greenTransparent"
            onPress={() => RootNavigation.goBack()}
            sizeHeight={40}
            sizeWidth={40}
            sizeBorderRadius={20}
            sizePadding={0}
            containerAlignSelf="flex-end"
            customContent>
            <Icon name="close" size={24} color={theme.colors.green} />
          </Button>
        </Header>
        <Content>
          <Text.Title>Você atingiu o limite de roteiros</Text.Title>
          <Text.Paragraph textWeight="light">
            Uau!🤩 isso mostra que você esta mandando bem com seu trabalho como
            Guia de Turismo e por isso trazemos algumas funcionalidades para
            usuários como você.
          </Text.Paragraph>
          <Divider />
          <Text.Paragraph textWeight="light">
            Para criar roteiros sem limites e ter outras vantagens assine o
            plano para guias.
          </Text.Paragraph>
          <ImageContainer.Hero
            sizeStyle="square"
            fit="center"
            url="https://rotery-filestore.nyc3.digitaloceanspaces.com/hero-gestao-no-app-square.webp"
          />
          <Divider />
          <Text.Paragraph textWeight="light">
            Com a assinatura além de roteiros ilimitados você pode oferecer
            pagamento dentro do app para seus viajantes e ter o controle
            financeiro integrado, tudo isso aqui.
          </Text.Paragraph>
          <Divider />
          <Text.Title>E não para por ai 🎁</Text.Title>
          <Text.Paragraph textWeight="light">
            Temos trabalhado para trazer muitas outras vantagens para nossos
            assinantes e elas vão surgir aqui em breve, mas não se preoculpe,
            vamos ter manter informado.
          </Text.Paragraph>
          <Divider />
          <Text.Paragraph textWeight="light">
            Você pode conhecer mais sobre o plano, ou assinar, clicando no botão
            abaixo, não perde tempo!
          </Text.Paragraph>
          <Divider />
          <Button
            bgColor="green"
            onPress={() => RootNavigation.replace('HostSubscription')}
            sizePadding={0}
            customContent>
            <Text.Title textColor="white">Mais sobre o plano</Text.Title>
          </Button>
        </Content>
      </Container>
    </Page>
  );
};
