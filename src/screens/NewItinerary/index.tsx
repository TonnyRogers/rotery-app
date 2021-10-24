import React, {useState, useRef, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {formatBRL, clearValue} from '../../lib/mask';
import {createItineraryRequest} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {
  getActivitiesRequest,
  getLodgingsRequest,
  getTransportsRequest,
} from '../../store/modules/options/actions';
import {InitialStateProps} from '../../store/modules/options/reducer';
import {
  LocationJson,
  LocationPickerInputSetItem,
  TomTomApiResponse,
  CreateItineraryLodgingItemProps,
  CreateItineraryTransportItemProps,
  CreateItineraryActivityItemProps,
  ItineraryTransportItemProps,
  ItineraryLodgingItemProps,
  ItineraryActivityItemProps,
} from '../../utils/types';
import {
  showNewItineraryGuide,
  hideNewItineraryGuide,
} from '../../store/modules/guides/actions';

import {
  Container,
  Content,
  CardContent,
  CardActions,
  SubmitButton,
  SubmitButtonText,
  ImageList,
  ImageButton,
  Background,
  BackgroundCover,
  SIcon,
  Title,
  DataContentHeader,
  RowGroup,
  RowGroupSpaced,
  ContentTitle,
  IconHolder,
  AddButton,
  AddButtonText,
  TransportList,
  ColumnGroup,
  FieldTitle,
  FieldValue,
  RemoveButton,
  HeaderActions,
  LodgingList,
  ActivityList,
  AddImageButton,
  CardHeader,
  BackButton,
  PublicButton,
  PublicButtonText,
  PrivateButton,
  PrivateButtonText,
  NewTransportButton,
  NewLodginButton,
  NewActivityButton,
  ModalContent,
} from './styles';

import Input from '../../components/Input';
import Card from '../../components/Card';
import TextArea from '../../components/TextArea';
import DateTimeInput from '../../components/DateTimeInput';
import FileInput from '../../components/FileInput';
import PickerInput from '../../components/PickerInput';
import Modal from '../../components/Modal';
import Page from '../../components/Page';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
import ShadowBox from '../../components/ShadowBox';
import SplashScreen from '../../components/SplashScreen';
import {newGuideImages} from '../../utils/constants';
import LocationPickerInput from '../../components/LocationPickerInput';

const validationSchema = yup.object().shape({
  name: yup.string().required('campo obrigatório'),
  vacancies: yup.number().required('campo obrigatório'),
  location: yup.string().required('campo obrigatório'),
  description: yup.string().required('campo obrigatório'),
  dateOut: yup.date().required('campo obrigatório'),
  dateReturn: yup.date().required('campo obrigatório'),
  dateLimit: yup.date().required('campo obrigatório'),
});

const validationOptionsSchema = yup.object().shape({
  type: yup.string().required('campo obrigatório'),
  price: yup.string().required('campo obrigatório'),
  capacity: yup.string().required('campo obrigatório'),
  description: yup.string(),
});

const NewItinerary: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});

  const {
    register: optionRegister,
    handleSubmit: optionHandleSubmit,
    setValue: optionSetValue,
    watch: optionWatch,
    formState: {errors: optionErrors},
  } = useForm({resolver: yupResolver(validationOptionsSchema)});

  useEffect(() => {
    register('name');
    register('vacancies');
    register('dateOut', {value: new Date(), valueAsDate: true});
    register('dateReturn', {value: new Date(), valueAsDate: true});
    register('dateLimit', {value: new Date(), valueAsDate: true});
    register('location');
    register('description');

    optionRegister('type');
    optionRegister('price');
    optionRegister('capacity');
    optionRegister('description');
  }, [getValues, optionRegister, register]);

  useEffect(() => {
    dispatch(getActivitiesRequest());
    dispatch(getLodgingsRequest());
    dispatch(getTransportsRequest());
    dispatch(showNewItineraryGuide());
  }, [dispatch]);

  const options: InitialStateProps = useSelector(
    (state: RootStateProps) => state.options,
  );

  const {newItineraryGuide} = useSelector(
    (state: RootStateProps) => state.guides,
  );

  const {loading} = useSelector((state: RootStateProps) => state.itineraries);

  const watchDateOut = watch('dateOut', new Date());
  const watchDateReturn = watch('dateReturn', new Date());
  const watchDateLimit = watch('dateLimit', new Date());
  const watchOptionType = optionWatch('type');
  const watchOptionPrice = optionWatch('price');
  const watchLocation = watch('location');
  const [transports, setTransports] = useState([] as any);
  const [lodgings, setLodgings] = useState([] as any);
  const [activities, setActivities] = useState([] as any);
  const [images, setImages] = useState([] as any);
  const [privateItinerary, setPrivateItinerary] = useState(false);
  const [addTransportVisible, setAddTransportVisible] = useState(false);
  const [transportsOptionIsOpen, setTransportsOptionIsOpen] = useState(false);
  const [addLodgingVisible, setAddLodgingVisible] = useState(false);
  const [lodgingOptionIsOpen, setLodgingOptionIsOpen] = useState(false);
  const [addActivityVisible, setAddActivityVisible] = useState(false);
  const [activityOptionIsOpen, setActivityOptionIsOpen] = useState(false);
  const [locationIsOpen, setLocationIsOpen] = useState(false);

  const descriptionRef = useRef() as any;
  const nameRef = useRef() as any;
  const vacanciesRef = useRef() as any;
  const transportPriceRef = useRef() as any;
  const transportCapacityRef = useRef() as any;
  const transportDescriptionRef = useRef() as any;
  const locationJson = useRef<LocationPickerInputSetItem<TomTomApiResponse>>();

  const handleCloseNewGuide = () => {
    dispatch(hideNewItineraryGuide());
  };

  function addImages(imageList: []) {
    setImages([...images, ...imageList]);
  }

  const addLodgingItem = (data: any) => {
    const newItem: CreateItineraryLodgingItemProps = {
      lodging: Number(data.type),
      price: String(clearValue(data.price)),
      capacity: Number(data.capacity),
      description: data.description,
      isFree: Number(clearValue(data.price)) > 0 ? false : true,
    };

    lodgings.push(newItem);
    setLodgings(lodgings);

    optionSetValue('type', '');
    optionSetValue('price', '');
    optionSetValue('capacity', '');
    optionSetValue('description', '');
    setAddLodgingVisible(false);
  };

  const addTransportItem = (data: any) => {
    const newItem: CreateItineraryTransportItemProps = {
      transport: Number(data.type),
      price: String(clearValue(data.price)),
      capacity: Number(data.capacity),
      description: data.description,
      isFree: Number(clearValue(data.price)) > 0 ? false : true,
    };

    transports.push(newItem);
    setTransports(transports);

    optionSetValue('type', '');
    optionSetValue('price', '');
    optionSetValue('capacity', '');
    optionSetValue('description', '');
    setAddTransportVisible(false);
  };

  const addActivityItem = (data: any) => {
    const newItem: CreateItineraryActivityItemProps = {
      activity: Number(data.type),
      price: String(clearValue(data.price)),
      capacity: Number(data.capacity),
      description: data.description,
      isFree: Number(clearValue(data.price)) > 0 ? false : true,
    };

    activities.push(newItem);
    setActivities(activities);

    optionSetValue('type', '');
    optionSetValue('price', '');
    optionSetValue('capacity', '');
    optionSetValue('description', '');
    setAddActivityVisible(false);
  };

  const handleNewLocation = (value: any) => {
    locationJson.current = value;
  };

  const onSubmit = (data: any) => {
    const jsonContent: LocationJson = {
      city: locationJson.current?.value.address.municipality,
      country: locationJson.current?.value.address.country,
      countryCode: locationJson.current?.value.address.countryCode,
      position: locationJson.current?.value.position,
      state: locationJson.current?.value.address.countrySubdivision,
      address: locationJson.current?.value.address.freeformAddress,
    };

    dispatch(
      createItineraryRequest(
        data.name,
        Number(data.vacancies),
        data.description,
        data.dateOut,
        data.dateReturn,
        data.dateLimit,
        data.location,
        privateItinerary,
        images,
        activities,
        lodgings,
        transports,
        locationJson.current ? jsonContent : undefined,
      ),
    );

    setImages([]);
    setActivities([]);
    setLodgings([]);
    setTransports([]);
  };

  const renderImages = useCallback(() => {
    function removeImages(index: number) {
      images.splice(index, 1);
      setImages([...images]);
    }

    return images.map((item: {url: string}, index: number) => (
      <ImageButton key={index} onPress={() => removeImages(index)}>
        <Background
          resizeMode="cover"
          source={{
            uri: item.url || undefined,
          }}
        />
        <BackgroundCover>
          <SIcon name="delete-forever-outline" color="#F57373" size={30} />
        </BackgroundCover>
      </ImageButton>
    ));
  }, [images]);

  const renderTransports = useCallback(() => {
    function removeTransportItem(index: number) {
      transports.splice(index, 1);

      setTransports([...transports]);
    }
    return transports.map(
      (item: ItineraryTransportItemProps, index: number) => (
        <ShadowBox key={index}>
          <HeaderActions>
            <RemoveButton onPress={() => removeTransportItem(index)}>
              <Icon name="delete-forever-outline" color="#F57373" size={24} />
            </RemoveButton>
          </HeaderActions>
          <FieldTitle>{item.transport.name}</FieldTitle>
          <FieldValue>{item.description}</FieldValue>
          <RowGroupSpaced>
            <ColumnGroup>
              <FieldTitle>Capacidade</FieldTitle>
              <FieldValue>{item.capacity}</FieldValue>
            </ColumnGroup>
            <ColumnGroup>
              <FieldTitle>Preço</FieldTitle>
              <FieldValue>{formatBRL(String(item.price))}</FieldValue>
            </ColumnGroup>
          </RowGroupSpaced>
        </ShadowBox>
      ),
    );
  }, [transports]);

  const renderLodgings = useCallback(() => {
    function removeLodgingItem(index: number) {
      lodgings.splice(index, 1);

      setLodgings([...lodgings]);
    }
    return lodgings.map((item: ItineraryLodgingItemProps, index: number) => (
      <ShadowBox key={index}>
        <HeaderActions>
          <RemoveButton onPress={() => removeLodgingItem(index)}>
            <Icon name="delete-forever-outline" color="#F57373" size={24} />
          </RemoveButton>
        </HeaderActions>
        <FieldTitle>{item.lodging.name}</FieldTitle>
        <FieldValue>{item.description}</FieldValue>
        <RowGroupSpaced>
          <ColumnGroup>
            <FieldTitle>Capacidade</FieldTitle>
            <FieldValue>{item.capacity}</FieldValue>
          </ColumnGroup>
          <ColumnGroup>
            <FieldTitle>Preço</FieldTitle>
            <FieldValue>{formatBRL(String(item.price))}</FieldValue>
          </ColumnGroup>
        </RowGroupSpaced>
      </ShadowBox>
    ));
  }, [lodgings]);

  const renderActivities = useCallback(() => {
    function removeActivityItem(index: number) {
      activities.splice(index, 1);

      setActivities([...activities]);
    }

    return activities.map((item: ItineraryActivityItemProps, index: number) => (
      <ShadowBox key={index}>
        <HeaderActions>
          <RemoveButton onPress={() => removeActivityItem(index)}>
            <Icon name="delete-forever-outline" color="#F57373" size={24} />
          </RemoveButton>
        </HeaderActions>
        <FieldTitle>{item.activity.name}</FieldTitle>
        <FieldValue>{item.description}</FieldValue>
        <RowGroupSpaced>
          <ColumnGroup>
            <FieldTitle>Capacidade</FieldTitle>
            <FieldValue>{item.capacity}</FieldValue>
          </ColumnGroup>
          <ColumnGroup>
            <FieldTitle>Preço</FieldTitle>
            <FieldValue>{formatBRL(String(item.price))}</FieldValue>
          </ColumnGroup>
        </RowGroupSpaced>
      </ShadowBox>
    ));
  }, [activities]);

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Page showHeader={false}>
      <Container>
        <Content>
          <Card>
            <CardHeader>
              <BackButton onPress={goBack}>
                <Icon name="chevron-left" size={24} color="#3dc77b" />
              </BackButton>
            </CardHeader>
            <CardContent>
              <Title>Visibilidade</Title>
              <RowGroup>
                <PublicButton
                  selected={privateItinerary}
                  onPress={() => setPrivateItinerary(false)}>
                  <PublicButtonText selected={privateItinerary}>
                    Público
                  </PublicButtonText>
                </PublicButton>
                <PrivateButton
                  selected={privateItinerary}
                  onPress={() => setPrivateItinerary(true)}>
                  <PrivateButtonText selected={privateItinerary}>
                    Privado
                  </PrivateButtonText>
                </PrivateButton>
              </RowGroup>
              <Input
                label="Nome do Roteiro"
                placeholder="dê um nome para este roteiro."
                ref={nameRef}
                onChange={(value: string) => setValue('name', value)}
                error={errors.name?.message}
              />
              <Title>Imagens</Title>
              <ImageList>
                {renderImages()}
                <FileInput onSelect={addImages}>
                  <AddImageButton>
                    <SIcon name="image-plus" color="#D9D8D8" size={30} />
                  </AddImageButton>
                </FileInput>
              </ImageList>
              <Input
                label="Limite de Vagas"
                placeholder="numero máximo de vagas"
                ref={vacanciesRef}
                onChange={(value: string) => setValue('vacancies', value)}
                error={errors.vacancies?.message}
                keyboardType="number-pad"
              />
              <TextArea
                label="Descrição"
                placeholder="infomações adicionais sobre o roteiro"
                onChange={(value: string) => setValue('description', value)}
                error={errors.description?.message}
                ref={descriptionRef}
              />
              <ShadowBox>
                <DataContentHeader>
                  <Icon
                    name="calendar-blank-outline"
                    color="#4885FD"
                    size={24}
                  />
                  <ContentTitle>Datas</ContentTitle>
                </DataContentHeader>
                <DateTimeInput
                  label="Saida"
                  date={watchDateOut}
                  onChange={(value: Date) => setValue('dateOut', value)}
                  error={errors.dateOut?.message}
                />
                <DateTimeInput
                  label="Retorno"
                  date={watchDateReturn}
                  onChange={(value: Date) => setValue('dateReturn', value)}
                  error={errors.dateReturn?.message}
                />
                <DateTimeInput
                  label="Limite para inscrição"
                  date={watchDateLimit}
                  onChange={(value: Date) => setValue('dateLimit', value)}
                  error={errors.dateLimit?.message}
                />
              </ShadowBox>
              <ShadowBox>
                <DataContentHeader>
                  <Icon name="map-check-outline" color="#4885FD" size={24} />
                  <ContentTitle>Destino</ContentTitle>
                </DataContentHeader>
                <LocationPickerInput.Button
                  title="Endereço"
                  value={watchLocation}
                  onPress={() => setLocationIsOpen(true)}
                  error={errors.location?.message}
                />
              </ShadowBox>
              <RowGroup>
                <IconHolder>
                  <Icon name="car" color="#FFF" size={24} />
                </IconHolder>
                <ContentTitle>Transporte</ContentTitle>
              </RowGroup>
              <TransportList>{renderTransports()}</TransportList>
              <NewTransportButton onPress={() => setAddTransportVisible(true)}>
                <Icon name="plus-box-outline" color="#3dc77b" size={30} />
              </NewTransportButton>
              <RowGroup>
                <IconHolder>
                  <Icon name="bed" color="#FFF" size={24} />
                </IconHolder>
                <ContentTitle>Hospedagem</ContentTitle>
              </RowGroup>
              <LodgingList>{renderLodgings()}</LodgingList>
              <NewLodginButton onPress={() => setAddLodgingVisible(true)}>
                <Icon name="plus-box-outline" color="#3dc77b" size={30} />
              </NewLodginButton>
              <RowGroup>
                <IconHolder>
                  <Icon name="lightning-bolt" color="#FFF" size={24} />
                </IconHolder>
                <ContentTitle>Atividades</ContentTitle>
              </RowGroup>
              <ActivityList>{renderActivities()}</ActivityList>
              <NewActivityButton onPress={() => setAddActivityVisible(true)}>
                <Icon name="plus-box-outline" color="#3dc77b" size={30} />
              </NewActivityButton>
            </CardContent>
            <CardActions>
              <SubmitButton onPress={handleSubmit(onSubmit)}>
                <SubmitButtonText>Salvar</SubmitButtonText>
              </SubmitButton>
            </CardActions>
          </Card>
        </Content>
      </Container>
      <Modal
        title="Adicionar Transporte"
        visible={addTransportVisible}
        onCloseRequest={async () => setAddTransportVisible(false)}
        key="transport-modal">
        <ModalContent>
          <PickerInput
            open={transportsOptionIsOpen}
            setOpen={setTransportsOptionIsOpen}
            label="Tipo"
            value={watchOptionType}
            onChange={(value: string) => optionSetValue('type', value)}
            options={options.transports}
            listMode="SCROLLVIEW"
            onOpen={() => {}}
            byValue={false}
            error={optionErrors.type?.message}
          />
          <Input
            label="Preço"
            placeholder="preço por pessoa"
            value={formatBRL(watchOptionPrice)}
            ref={transportPriceRef}
            onChange={(value: string) =>
              optionSetValue('price', formatBRL(value))
            }
            keyboardType="number-pad"
            error={optionErrors.price?.message}
          />
          <Input
            label="Capacidade (lugares)"
            placeholder="quantidade máxima de pessoas"
            ref={transportCapacityRef}
            onChange={(value: string) => optionSetValue('capacity', value)}
            error={optionErrors.capacity?.message}
            keyboardType="number-pad"
          />
          <TextArea
            label="Descrição"
            placeholder="infomações adicionais.."
            ref={transportDescriptionRef}
            onChange={(value: string) => optionSetValue('description', value)}
            error={optionErrors.description?.message}
          />
          <AddButton onPress={optionHandleSubmit(addTransportItem)}>
            <AddButtonText>Adicionar</AddButtonText>
          </AddButton>
        </ModalContent>
      </Modal>
      <Modal
        title="Adicionar Hospedagem"
        visible={addLodgingVisible}
        onCloseRequest={async () => setAddLodgingVisible(false)}
        key="lodging-modal">
        <ModalContent>
          <PickerInput
            open={lodgingOptionIsOpen}
            setOpen={setLodgingOptionIsOpen}
            label="Tipo"
            value={watchOptionType}
            onChange={(value: string) => optionSetValue('type', value)}
            options={options.lodgings}
            listMode="SCROLLVIEW"
            onOpen={() => {}}
            byValue={false}
            error={optionErrors.type?.message}
          />
          <Input
            label="Preço"
            placeholder="preço por pessoa"
            value={formatBRL(watchOptionPrice)}
            ref={transportPriceRef}
            onChange={(value: string) =>
              optionSetValue('price', formatBRL(value))
            }
            keyboardType="number-pad"
            error={optionErrors.price?.message}
          />
          <Input
            label="Capacidade (lugares)"
            placeholder="quantidade máxima de pessoas"
            ref={transportCapacityRef}
            onChange={(value: string) => optionSetValue('capacity', value)}
            error={optionErrors.capacity?.message}
            keyboardType="number-pad"
          />
          <TextArea
            label="Descrição"
            placeholder="infomações adicionais.."
            ref={transportDescriptionRef}
            onChange={(value: string) => optionSetValue('description', value)}
            error={optionErrors.description?.message}
          />
          <AddButton onPress={optionHandleSubmit(addLodgingItem)}>
            <AddButtonText>Adicionar</AddButtonText>
          </AddButton>
        </ModalContent>
      </Modal>
      <Modal
        title="Adicionar Atividades"
        visible={addActivityVisible}
        onCloseRequest={async () => setAddActivityVisible(false)}
        key="activities-modal">
        <ModalContent>
          <PickerInput
            open={activityOptionIsOpen}
            setOpen={setActivityOptionIsOpen}
            label="Tipo"
            value={watchOptionType}
            onChange={(value: string) => optionSetValue('type', value)}
            options={options.activities}
            listMode="SCROLLVIEW"
            onOpen={() => {}}
            byValue={false}
            error={optionErrors.type?.message}
          />
          <Input
            label="Preço"
            placeholder="preço por pessoa"
            value={formatBRL(watchOptionPrice)}
            ref={transportPriceRef}
            onChange={(value: string) =>
              optionSetValue('price', formatBRL(value))
            }
            keyboardType="number-pad"
            error={optionErrors.price?.message}
          />
          <Input
            label="Capacidade (lugares)"
            placeholder="quantidade máxima de pessoas"
            ref={transportCapacityRef}
            onChange={(value: string) => optionSetValue('capacity', value)}
            error={optionErrors.capacity?.message}
            keyboardType="number-pad"
          />
          <TextArea
            label="Descrição"
            placeholder="infomações adicionais.."
            ref={transportDescriptionRef}
            onChange={(value: string) => optionSetValue('description', value)}
            error={optionErrors.description?.message}
          />
          <AddButton onPress={optionHandleSubmit(addActivityItem)}>
            <AddButtonText>Adicionar</AddButtonText>
          </AddButton>
        </ModalContent>
      </Modal>
      <Ads visible={newItineraryGuide} onRequestClose={() => {}}>
        <GuideCarousel
          data={newGuideImages}
          onClose={() => handleCloseNewGuide()}
        />
      </Ads>
      <SplashScreen visible={loading} />
      <LocationPickerInput
        visible={locationIsOpen}
        setLocationJson={(json) => handleNewLocation(json)}
        placeholder="Digite o endereço/local/cidade para buscar"
        onCloseRequest={() => setLocationIsOpen(false)}
        onSelectItem={(value: string) => setValue('location', value)}
        nameFormatType="general"
      />
    </Page>
  );
};

export default NewItinerary;
