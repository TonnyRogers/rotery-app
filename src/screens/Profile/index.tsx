/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState, useMemo, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {phoneBR, cpfCnpj, clearValue} from '../../lib/mask';
import {
  updateProfileRequest,
  updateProfileImageRequest,
} from '../../store/modules/profile/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {removeUserRequest} from '../../store/modules/profile/actions';

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
import {hideProfileGuide} from '../../store/modules/guides/actions';
import SplashScreen from '../../components/SplashScreen';
import LocationPickerInput from '../../components/LocationPickerInput';
import {
  sexOptions,
  travelerProfileGuideImages,
  hostProfileGuideImages,
} from '../../utils/constants';
import {
  TomTomApiResponse,
  ProfileLocationJson,
  LocationPickerInputSetItem,
  FileProps,
} from '../../utils/types';
import formatLocale from '../../providers/dayjs-format-locale';
import Button from '../../components/Button';
import ColumnGroup from '../../components/ColumnGroup';
import {useUserIsHost} from '../../hooks/useUserIsHost';
import {YupValidationMessages} from '../../utils/enums';
import RowGroup from '../../components/RowGroup';
import {SimpleList} from '../../components/SimpleList';

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
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {isHost, conditionalRender} = useUserIsHost();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});
  const {data, loading} = useSelector((state: RootStateProps) => state.profile);
  const {profileGuide} = useSelector((state: RootStateProps) => state.guides);

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
    setValue('document', cpfCnpj(String(data?.document)) || '1');
    setValue('profission', data?.profission || '');
    setValue('birthDate', data?.birth);
    setValue('city', data?.location || '');
  }, [data, register, setValue]);

  const watchBirthDate = watch('birthDate');
  const watchGender = watch('gender');
  const watchCity = watch('city', '');
  const watchName = watch('name');
  const watchEmail = watch('email');
  const watchPhone = watch('phone', '');
  const watchCpf = watch('document', '');
  const watchProfission = watch('profission');

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

  const useSinceDate = useMemo(
    () =>
      data?.user.createdAt &&
      formatLocale(
        new Date(Date.parse(data?.user.createdAt)),
        'MMMM [de] YYYY',
      ),
    [data],
  );

  function alertToggle() {
    setAlertVisible(!alertVisible);
  }

  function financialNavigation() {
    if (isHost) {
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
      updateProfileRequest(
        profileData.name,
        profileData.gender,
        profileData.birthDate.toDateString(),
        String(clearValue(profileData.document)),
        profileData.profission,
        String(clearValue(profileData.phone)),
        profileData.city,
        locationJson.current ? jsonContent : undefined,
      ),
    );
  };

  function handleDeleteUser() {
    dispatch(removeUserRequest());
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
      dispatch(updateProfileImageRequest(image.id));
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
              {!isHost && (
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
              sizeHeight={4.4}
              textColor="white">
              <RowGroup>
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
          data={isHost ? hostProfileGuideImages : travelerProfileGuideImages}
          onClose={() => dispatch(hideProfileGuide())}
        />
      </Ads>
      <SplashScreen visible={loading} />
    </Page>
  );
};

export default Profile;
