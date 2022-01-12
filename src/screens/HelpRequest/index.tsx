/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as RootNavigation from '../../RootNavigation';
import {Container, Header, Content} from './styles';
import Text from '../../components/Text';
import RowGroup from '../../components/RowGroup';
import Button from '../../components/Button';
import Page from '../../components/Page';
import {theme} from '../../utils/theme';
import Card from '../../components/Card';
import DismissKeyboad from '../../components/DismissKeyboad';
import Divider from '../../components/Divider';
import TextArea from '../../components/TextArea';
import Tag from '../../components/Tag';
import api from '../../services/api';
import {
  EmailHelpRequestTypeTypes,
  Revenue,
  ItineraryProps,
} from '../../utils/types';
import ImageContainer from '../../components/ImageContainer';
import {formatPrice} from '../../lib/utils';
import formatLocale from '../../providers/dayjs-format-locale';
import Toast from 'react-native-toast-message';
import SplashScreen from '../../components/SplashScreen';

const validationSchema = yup.object().shape({
  reportMessage: yup.string().required('campo obrigatório'),
});

interface formData {
  reportMessage: string;
}

interface CustomRevenue extends Revenue {
  itinerary: ItineraryProps;
}

interface HelpRequestProps {
  route: {
    params: {
      item: CustomRevenue;
      type: EmailHelpRequestTypeTypes;
    };
  };
}

const HelpRequest = ({route}: HelpRequestProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    register('reportMessage');
  }, [register, setValue]);

  const watchReportMessage = watch('reportMessage');
  const [isLoading, setIsLoading] = useState(false);
  const {
    params: {item, type},
  } = route;

  const formattedDated = useMemo(() => {
    const begin = formatLocale(
      String(item.itinerary?.begin),
      'DD MMM YY HH:mm',
    );
    const paymentDateCreated = formatLocale(item.createdAt, 'DD MMM YY HH:mm');

    return {begin, paymentDateCreated};
  }, [item.createdAt, item.itinerary]);

  const handleRequestHelp = async (data: formData) => {
    try {
      setIsLoading(true);
      await api.post('/communications/help', {
        data: {
          Tipo: 'Roteiro',
          Nome: item.itinerary.name,
          Id_membro: item.id,
          Id_roteiro: item.itinerary.id,
          Status_pagamento: item.paymentStatus,
          Valor: formatPrice(item.amount * 100),
        },
        message: data.reportMessage,
        type,
      });

      setIsLoading(false);
      Toast.show({
        text1: 'Solicitação envida, aguarde o contato.',
        position: 'bottom',
        type: 'success',
      });
      RootNavigation.goBack();
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        text1: 'Erro ao enviar solicitação, tente novamente.',
        position: 'bottom',
        type: 'error',
      });
    }
  };

  const renderHelpTitle = useCallback(() => {
    let titleText = '';
    switch (type) {
      case 'itinerary':
        titleText = 'Roteiro';
        break;
      case 'payment':
        titleText = 'Pagamento';
        break;
      case 'revenue':
        titleText = 'Faturamento';
        break;
      case 'itinerary':
        break;

      default:
        break;
    }
    return <Text.Title>{titleText}</Text.Title>;
  }, [type]);

  return (
    <Page showHeader={false}>
      <Container>
        <Header>
          <RowGroup justify="space-between" align="center">
            <Button
              bgColor="greenTransparent"
              onPress={() => RootNavigation.goBack()}
              sizeHeight={40}
              sizeWidth={40}
              sizeBorderRadius={20}
              sizePadding={0}
              customContent>
              <Icon name="chevron-left" size={24} color={theme.colors.green} />
            </Button>
            <View
              style={{
                flex: 1,
              }}>
              <Text.Title alignment="center">Solicitar Ajuda</Text.Title>
            </View>
          </RowGroup>
        </Header>
        <Card>
          <DismissKeyboad>
            <Content>
              <Divider />
              <Tag align="flex-start" color="orange">
                Aviso:
              </Tag>
              <Text alignment="start">
                Você será respondido por uma pessoa da equipe que entrara em
                contato por e-mail ou telefone para dar continuidade ao
                atendimento.
              </Text>
              <Divider />
              <Text.Title alignment="start">Detalhes</Text.Title>
              <Divider />
              {renderHelpTitle()}
              <RowGroup>
                <View>
                  <Text
                    textColor="primaryText"
                    textWeight="bold"
                    limitter={14}
                    maxLines={1}>
                    {item.itinerary.name}
                  </Text>
                  <Text limitter={14} maxLines={1} textWeight="light">
                    {item.itinerary.location}
                  </Text>
                  <Text textWeight="light">{formattedDated.begin}</Text>
                </View>
                <View>
                  <RowGroup>
                    <ImageContainer size="small" url={item.member.avatar} />
                    <View>
                      <Text
                        limitter={12}
                        maxLines={1}
                        textColor="primaryText"
                        textWeight="bold">
                        {'Viajante'}
                      </Text>
                      <Text
                        limitter={12}
                        maxLines={1}
                        textColor="secondaryText"
                        textWeight="light">
                        {item.member.username}
                      </Text>
                    </View>
                  </RowGroup>
                  <Text textWeight="light">
                    {formattedDated.paymentDateCreated}
                  </Text>
                  <Divider />
                  <RowGroup justify="flex-start">
                    <Text textColor="primaryText">Total</Text>
                    <Text.Title>{formatPrice(item.amount * 100)}</Text.Title>
                  </RowGroup>
                </View>
              </RowGroup>
              <TextArea
                value={watchReportMessage}
                error={errors.reportMessage?.message}
                onChange={(value: string) => setValue('reportMessage', value)}
                placeholder="Descreva como podemos ajudar..."
              />
              <Button onPress={handleSubmit(handleRequestHelp)} bgColor="blue">
                Enviar
              </Button>
            </Content>
          </DismissKeyboad>
        </Card>
      </Container>
      <SplashScreen visible={isLoading} />
    </Page>
  );
};

export default HelpRequest;
