/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
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
// import api from '../../services/api';
// import {formatPrice} from '../../lib/utils';
import {theme} from '../../utils/theme';
import Input from '../../components/Input';
import PickerInput from '../../components/PickerInput';
import Card from '../../components/Card';
import DismissKeyboad from '../../components/DismissKeyboad';
import {AccountOptions, bankList} from '../../utils/constants';
import Divider from '../../components/Divider';
import {useSelector, useDispatch} from 'react-redux';
import {RootStateProps} from '../../store/modules/rootReducer';
import SplashScreen from '../../components/SplashScreen';
import {
  createBankAccountRequest,
  updateBankAccountRequest,
} from '../../store/modules/bankAccount/actions';

const validationSchema = yup.object().shape({
  bank: yup.string().required('campo obrigatório'),
  agency: yup.string().required('campo obrigatório'),
  account: yup.string().required('campo obrigatório'),
  accountType: yup.string().required('campo obrigatório'),
  payDay: yup
    .number()
    .min(1, 'o dia deve ser no minimo 1')
    .max(31, 'o dia deve ser no máximo 31')
    .required('campo obrigatório'),
});

interface formData {
  bank: string;
  agency: string;
  account: string;
  accountType: string;
  payDay: string;
}

const RevenuesConfig = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});
  const [bankIsOpen, setBankIsOpen] = useState(false);
  const [accountTypeIsOpen, setAccountTypeIsOpen] = useState(false);
  const {data, loading} = useSelector(
    (state: RootStateProps) => state.bankAccount,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    register('bank');
    register('agency');
    register('account');
    register('accountType');
    register('payDay');

    if (data) {
      setValue('bank', data.bankCode);
      setValue('agency', data.agency);
      setValue('account', data.account);
      setValue('accountType', data.accountType);
      setValue('payDay', String(data.payDay));
    }
  }, [register, setValue, data]);

  const watchBank = watch('bank');
  const watchAgency = watch('agency');
  const watchAccount = watch('account');
  const watchAccountType = watch('accountType');
  const watchPayDay = watch('payDay');

  const handleUpdate = (dataForm: formData) => {
    const bankPayload = {
      account: dataForm.account,
      accountType: dataForm.accountType,
      agency: dataForm.agency,
      bankCode: dataForm.bank,
      bankName: '*',
      payDay: Number(dataForm.payDay),
    };
    if (!data) {
      dispatch(createBankAccountRequest(bankPayload));
    } else {
      dispatch(updateBankAccountRequest(bankPayload));
    }
  };

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
              <Text.Title alignment="center">
                Configuração de Faturamento
              </Text.Title>
            </View>
          </RowGroup>
        </Header>
        <Card>
          <DismissKeyboad>
            <Content>
              <Divider />
              <Text.Title alignment="start">Conta Bancária</Text.Title>
              <PickerInput
                label="Banco"
                value={watchBank}
                onChange={(value: string) => setValue('bank', value)}
                options={bankList}
                byValue={true}
                error={errors.bank?.message}
                categorySelectable={true}
                setOpen={setBankIsOpen}
                onOpen={() => accountTypeIsOpen && setAccountTypeIsOpen(false)}
                zIndex={200}
                open={bankIsOpen}
                zIndexInverse={100}
                listMode="SCROLLVIEW"
              />
              <RowGroup justify="space-between">
                <Input
                  icon="credit-card-outline"
                  label="Agência"
                  placeholder="00000-0"
                  value={watchAgency}
                  onChange={(value: string) => setValue('agency', value)}
                  error={errors.agency?.message}
                  keyboardType="number-pad"
                />
                <Input
                  icon="card-bulleted-outline"
                  label="Conta"
                  placeholder="00000-0"
                  value={watchAccount}
                  onChange={(value: string) => setValue('account', value)}
                  keyboardType="number-pad"
                  error={errors.account?.message}
                />
              </RowGroup>
              <PickerInput
                label="Tipo de Conta"
                value={watchAccountType}
                onChange={(value: string) => setValue('accountType', value)}
                options={AccountOptions}
                byValue={true}
                error={errors.accountType?.message}
                categorySelectable={true}
                setOpen={setAccountTypeIsOpen}
                onOpen={() => bankIsOpen && setBankIsOpen(false)}
                zIndex={200}
                open={accountTypeIsOpen}
                zIndexInverse={100}
                listMode="SCROLLVIEW"
              />

              <Divider />
              <Text.Title alignment="start">Pagamento</Text.Title>
              <Input
                icon="calendar-clock"
                label="Dia de pagamento"
                placeholder="Escolha um dia para receber"
                value={watchPayDay}
                onChange={(value: string) => setValue('payDay', value)}
                keyboardType="number-pad"
                maxLength={2}
                error={errors.payDay?.message}
              />
              <Divider />
              <Button onPress={handleSubmit(handleUpdate)} bgColor="blue">
                Salvar
              </Button>
            </Content>
          </DismissKeyboad>
        </Card>
      </Container>
      <SplashScreen visible={loading} />
    </Page>
  );
};

export default RevenuesConfig;
