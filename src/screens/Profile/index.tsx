/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useMemo, useEffect, useContext} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {phoneBR, cpfCnpj, clearValue} from '../../lib/mask';
import {
  updateProfile,
  updateProfileImage,
  deleteUser,
} from '../../store2/profile';

import {
  Container,
  User,
  Avatar,
  Reputation,
  InputContent,
  ActionContent,
  CardHeader,
  BackButton,
  ChangeImageView,
} from './styles';

import Card from '../../components/Card';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import DateInput from '../../components/DateInput';
import PickerInput from '../../components/PickerInput';
import Page from '../../components/Page';
import Text from '../../components/Text';
import FileInput from '../../components/FileInput';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
import {viewedGuide} from '../../store2/guides';
import LocationPickerInput from '../../components/LocationPickerInput';
import {sexOptions} from '../../utils/constants';
import {
  TomTomApiResponse,
  ProfileLocationJson,
  LocationPickerInputSetItem,
  FileProps,
} from '../../utils/types';
import {formatLocale} from '../../providers/dayjs-format-locale';
import Button from '../../components/Button';
import ColumnGroup from '../../components/ColumnGroup';
import {useUserIsGuide} from '../../hooks/useUserIsGuide';
import {YupValidationMessages, GuideEnum} from '../../utils/enums';
import RowGroup from '../../components/RowGroup';
import {SimpleList} from '../../components/SimpleList';
import {LoadingContext} from '../../context/loading/context';
import {RootState} from '../../providers/store';

const validationSchema = yup.object().shape({
  name: yup.string().required(YupValidationMessages.REQUIRED),
  gender: yup.string(),
  email: yup.string().required(YupValidationMessages.REQUIRED),
  phone: yup.string().min(11, 'telefone incompleto'),
  document: yup
    .string()
    .required(YupValidationMessages.REQUIRED)
    .min(14, 'cpf incompleto'),
  state: yup.string(),
  city: yup.string(),
  profission: yup.string(),
  birthDate: yup.date().required(YupValidationMessages.REQUIRED),
});

const Profile: React.FC = () => {
  const {setLoading, isLoading} = useContext(LoadingContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isGuide, conditionalRender} = useUserIsGuide();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});
  const {data, loading} = useSelector((state: RootState) => state.profile);
  const {
    profileGuide,
    data: {profileContent},
  } = useSelector((state: RootState) => state.guides);

  const [alertVisible, setAlertVisible] = useState(false);
  const [genderIsOpen, setGenderIsOpen] = useState(false);
  const [cityIsOpen, setCityIsOpen] = useState(false);
  const locationJson = useRef<LocationPickerInputSetItem<TomTomApiResponse>>();
  const [profileImage, setProfileImage] = useState<{uri: string | undefined}>({
    uri: undefined,
  });

  const nameRef = useRef<any>();
  const emailRef = useRef<any>();
  const phoneRef = useRef<any>();
  const cpfRef = useRef<any>();
  const stateRef = useRef<any>();
  const profissionRef = useRef<any>();

  useEffect(() => {
    if (data?.file && data.file?.url) {
      setProfileImage({uri: data.file.url});
    }
  }, [data]);

  useEffect(() => {
    register('name');
    register('gender');
    register('email');
    register('phone');
    register('document');
    register('state');
    register('city');
    register('profission');
    register('birthDate', {valueAsDate: true});

    setValue('name', data?.name || '');
    setValue('gender', data?.gender || '');
    setValue('email', data?.user?.email || '');
    setValue('phone', data?.phone || '');
    setValue('document', cpfCnpj(String(data?.document)) || '');
    setValue('profission', data?.profission || '');
    setValue('birthDate', data?.birth);
    setValue('city', data?.location || '');
  }, [data, register, setValue]);

  useEffect(() => {
    if (loading !== isLoading) {
      setLoading(loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const watchBirthDate = watch('birthDate');
  const watchGender = watch('gender');
  const watchCity = watch('city', '');
  const watchName = watch('name');
  const watchEmail = watch('email');
  const watchPhone = watch('phone', '');
  const watchCpf = watch('document', '');
  const watchProfission = watch('profission');

  const guideContent = profileContent.map((content) => ({
    isAnimation: content.isAnimation,
    url: content.externalUrl ?? '',
    message: content.content ?? '',
    title: content.title ?? '',
    withInfo: content.withInfo,
  }));

  const useSinceDate = useMemo(
    () =>
      data?.user.createdAt &&
      formatLocale(new Date(Date.parse(data?.user.createdAt)), 'MMM [de] YYYY'),
    [data],
  );

  function alertToggle() {
    setAlertVisible(!alertVisible);
  }

  function financialNavigation() {
    if (isGuide) {
      navigation.navigate('Revenues');
    } else {
      navigation.navigate('Wallet');
    }
  }

  const updateProfileHandle = (profileData: any) => {
    const jsonContent: ProfileLocationJson = {
      city: locationJson.current?.value.address.municipality,
      country: locationJson.current?.value.address.country,
      countryCode: locationJson.current?.value.address.countryCode,
      position: locationJson.current?.value.position,
      state: locationJson.current?.value.address.countrySubdivision,
    };

    dispatch(
      updateProfile({
        name: profileData.name,
        gender: profileData.gender,
        birth: profileData.birthDate.toDateString(),
        document: String(clearValue(profileData.document)),
        profission: profileData.profission,
        phone: String(clearValue(profileData.phone)),
        location: profileData.city,
        location_json: locationJson.current ? jsonContent : undefined,
      }),
    );
  };

  function handleDeleteUser() {
    dispatch(deleteUser());
    setAlertVisible(false);
  }

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  function handleProfileImage(image: FileProps) {
    if (image.id) {
      setProfileImage({uri: image.url});
      dispatch(updateProfileImage(image.id));
    }
  }

  const handleNew = (value: any) => {
    locationJson.current = value;
  };

  return (
    <Page showHeader={false}>
      <Container
        data={[{id: '1', name: 'Profile'}]}
        renderItem={() => (
          <>
            <Card>
              <BackButton onPress={goBack}>
                <Icon name="chevron-left" size={24} color="#3dc77b" />
              </BackButton>
              <CardHeader />
              <User>
                <Avatar
                  source={{uri: profileImage.uri}}
                  resizeMode="cover"
                  style={{borderColor: '#e1e1e1'}}
                />
                <FileInput onSelect={handleProfileImage}>
                  <ChangeImageView>
                    <Text textWeight="bold" textColor="white">
                      Alterar imagem
                    </Text>
                  </ChangeImageView>
                </FileInput>
                <Text.Title alignment="center">
                  {data?.user.username}
                </Text.Title>
                <Reputation>
                  <Icon name="star" size={24} color="#3dc77b" />
                  <Icon name="star" size={24} color="#3dc77b" />
                  <Icon name="star" size={24} color="#3dc77b" />
                  <Icon name="star" size={24} color="#3dc77b" />
                  <Icon name="star-outline" size={24} color="#3dc77b" />
                </Reputation>
                <Text textWeight="light" alignment="center">
                  Ativo desde {useSinceDate}
                </Text>
              </User>
            </Card>
            <SimpleList isHorizontal>
              {conditionalRender(
                <Button
                  onPress={() => financialNavigation()}
                  customContent
                  sizeHeight={7}
                  sizeWidth={7}
                  sizeMargin="0 2rem 0 0"
                  bgColor="blueTransparent"
                  textColor="white">
                  <ColumnGroup>
                    <Icon name="wallet-outline" size={24} color="#4885fd" />
                    <Text.Small textColor="blue" textWeight="bold">
                      Ganhos
                    </Text.Small>
                  </ColumnGroup>
                </Button>,
                <Button
                  onPress={() => financialNavigation()}
                  customContent
                  sizeHeight={7}
                  sizeWidth={7}
                  sizeMargin="0 2rem 0 0"
                  bgColor="blueTransparent"
                  textColor="white">
                  <ColumnGroup>
                    <Icon name="wallet-outline" size={24} color="#4885fd" />
                    <Text.Small textColor="blue" textWeight="bold">
                      Carteira
                    </Text.Small>
                  </ColumnGroup>
                </Button>,
              )}
              {!isGuide && (
                <Button
                  onPress={() => navigation.navigate('BackpackerSubscription')}
                  customContent
                  sizeHeight={7}
                  sizeWidth={7}
                  bgColor="blueTransparent"
                  sizeMargin="0 2rem 0 0"
                  textColor="white">
                  <ColumnGroup>
                    <Icon name="book-open-outline" size={24} color="#4885fd" />
                    <Text.Small textColor="blue" textWeight="bold">
                      Assinatura
                    </Text.Small>
                  </ColumnGroup>
                </Button>
              )}
            </SimpleList>
            <Card>
              <InputContent>
                <Input
                  icon="face-recognition"
                  label="Nome"
                  placeholder="Digite seu nome completo"
                  ref={nameRef}
                  value={watchName}
                  onChange={(value: string) => setValue('name', value)}
                  returnKeyType="next"
                  error={errors.name?.message}
                  onSubmitEditing={() => emailRef.current?.focus()}
                />
                <PickerInput
                  label="Sexo"
                  value={watchGender}
                  onChange={(value: string) => setValue('gender', value)}
                  options={sexOptions}
                  byValue={true}
                  error={errors.gender?.message}
                  open={genderIsOpen}
                  setOpen={setGenderIsOpen}
                  key="gender"
                />
                <Input
                  icon="email-outline"
                  label="Email"
                  placeholder="Digite seu e-mail"
                  ref={emailRef}
                  value={watchEmail}
                  onChange={(value: string) =>
                    setValue('email', value.trim().toLocaleLowerCase())
                  }
                  readOnly
                  editable={false}
                  returnKeyType="next"
                  onSubmitEditing={() => phoneRef.current?.focus()}
                  error={errors.email?.message}
                  keyboardType="email-address"
                />
                <Input
                  icon="cellphone-iphone"
                  label="Telefone"
                  placeholder="Digite seu telefone"
                  ref={phoneRef}
                  maxLength={14}
                  value={phoneBR(watchPhone)}
                  onChange={(value: string) =>
                    setValue('phone', phoneBR(value))
                  }
                  returnKeyType="next"
                  onSubmitEditing={() => cpfRef.current?.focus()}
                  error={errors.phone?.message}
                  keyboardType="number-pad"
                />
                <Input
                  icon="fingerprint"
                  label="CPF"
                  placeholder="Digite seu CPF"
                  ref={cpfRef}
                  maxLength={14}
                  value={cpfCnpj(watchCpf)}
                  onChange={(value: string) =>
                    setValue('document', cpfCnpj(value))
                  }
                  returnKeyType="next"
                  onSubmitEditing={() => stateRef.current?.focus()}
                  error={errors.document?.message}
                  keyboardType="number-pad"
                />
                <LocationPickerInput.Button
                  title="Localização (Cidade)"
                  value={watchCity}
                  onPress={() => setCityIsOpen(true)}
                  error={errors.city?.message}
                />
                <Input
                  icon="purse-outline"
                  label="Profissão"
                  placeholder="Digite sua profissão"
                  value={watchProfission}
                  ref={profissionRef}
                  onChange={(value: string) => setValue('profission', value)}
                  error={errors.profission?.message}
                  returnKeyType="next"
                />
                <DateInput
                  label="Nascimento"
                  date={watchBirthDate || new Date()}
                  onChange={(value: Date) => setValue('birthDate', value)}
                />
              </InputContent>
              <ActionContent>
                <Button
                  onPress={handleSubmit(updateProfileHandle)}
                  textColor="white"
                  bgColor="green"
                  sizeHeight={4.4}
                  customContent
                  sizePadding={0}
                  sizeWidth={12}
                  cornerRadius={{
                    bottomL: 12,
                    bottomR: 12,
                    topL: 12,
                    topR: 0,
                  }}>
                  <Text.Paragraph textWeight="bold" textColor="white">
                    Atualizar
                  </Text.Paragraph>
                </Button>
              </ActionContent>
            </Card>
            <Button
              onPress={alertToggle}
              sizeMargin="1rem"
              customContent
              bgColor="red"
              sizePadding={10}
              sizeHeight={4.4}
              textColor="white">
              <RowGroup align="center">
                <Icon name="delete-forever-outline" size={24} color="#FFF" />
                <Text.Paragraph textWeight="bold" textColor="white">
                  Desativar Conta
                </Text.Paragraph>
              </RowGroup>
            </Button>
          </>
        )}
      />
      <LocationPickerInput
        visible={cityIsOpen}
        setLocationJson={(json: any) => handleNew(json)}
        onCloseRequest={() => setCityIsOpen(false)}
        onSelectItem={(value: string) => setValue('city', value)}
        placeholder="Digite sua cidade"
        searchType="Geo"
        nameFormatType="city"
      />
      <Alert
        title="Opá!"
        message={'você deseja realmente excluir sua conta?'}
        icon="clipboard-alert-outline"
        iconColor="#3dc77b"
        visible={alertVisible}
        onRequestClose={() => setAlertVisible(false)}
        onConfirm={handleDeleteUser}
      />
      <Ads visible={profileGuide} onRequestClose={() => {}} key="guide-feed">
        <GuideCarousel
          data={guideContent}
          onClose={() => dispatch(viewedGuide({key: GuideEnum.PROFILE}))}
        />
      </Ads>
    </Page>
  );
};

export default Profile;
