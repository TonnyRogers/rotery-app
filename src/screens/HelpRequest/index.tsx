/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useCallback, useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import * as RootNavigation from '../../RootNavigation';
import {Header, Content} from './styles';
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
  MemberWithPaymentResponse,
} from '../../utils/types';
import {formatPrice} from '../../lib/utils';
import Toast from 'react-native-toast-message';
import SplashScreen from '../../components/SplashScreen';
import {YupValidationMessages} from '../../utils/enums';
import {HelpRevenue} from './revenue';
import {PageContainer} from '../../components/PageContainer';

const validationSchema = yup.object().shape({
  reportMessage: yup
    .string()
    .required(YupValidationMessages.REQUIRED)
    .max(255, 'limite de caracteres 255'),
});

interface formData {
  reportMessage: string;
}

export interface CustomRevenue extends Revenue {
  itinerary: ItineraryProps;
}
interface CustomMemberWithPaymentResponse
  extends Omit<MemberWithPaymentResponse, 'itinerary'> {
  itinerary: ItineraryProps;
}

export interface HelpRequestRouteParamsProps {
  item: CustomRevenue | CustomMemberWithPaymentResponse | null;
  type: EmailHelpRequestTypeTypes;
}

export interface HelpRequestProps {
  route: {
    params: HelpRequestRouteParamsProps;
  };
}

const HelpRequest = ({route}: HelpRequestProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<formData>({resolver: yupResolver(validationSchema)});

  useEffect(() => {
    register('reportMessage');
  }, [register, setValue]);

  const watchReportMessage = watch('reportMessage');
  const [isLoading, setIsLoading] = useState(false);
  const {
    params: {item, type},
  } = route;

  const handleRequestHelp = useCallback(
    async (data: formData) => {
      try {
        setIsLoading(true);

        if (type === 'revenue') {
          await api.post('/communications/help', {
            data: {
              Tipo: 'Faturamento',
            },
            message: data.reportMessage,
            type,
          });
        } else if (type === 'itinerary' && item) {
          await api.post('/communications/help', {
            data: {
              Tipo: 'Roteiro',
              Nome: item.itinerary.name,
              Id_membro: item?.id,
              Id_roteiro: item.itinerary.id,
              Status_pagamento: item?.paymentStatus,
              Valor:
                'amount' in item
                  ? formatPrice(item?.amount * 100)
                  : formatPrice(item?.payment.transaction_amount * 100),
            },
            message: data.reportMessage,
            type,
          });
        }

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
    },
    [item, type],
  );

  return (
    <Page showHeader={false}>
      <PageContainer isScrollable>
        <Header>
          <RowGroup justify="space-between" align="center">
            <Button
              bgColor="greenTransparent"
              onPress={() => RootNavigation.goBack()}
              sizeHeight={4}
              sizeWidth={4}
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
        <Card marginHorizontal={0}>
          <DismissKeyboad>
            <Content>
              <Divider />
              <Tag align="flex-start" color="orange">
                <Text textColor="white" textWeight="bold">
                  Aviso:
                </Text>
              </Tag>
              <Text alignment="start" textWeight="light">
                você será respondido por uma pessoa da equipe que entrará em
                contato por e-mail ou telefone para dar continuidade ao
                atendimento.
              </Text>
              <Divider />
              <Text.Title alignment="start">Detalhes</Text.Title>
              <Divider />
              {type === 'revenue' && <HelpRevenue />}
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
        <Divider />
      </PageContainer>
      <SplashScreen visible={isLoading} />
    </Page>
  );
};

export default HelpRequest;
