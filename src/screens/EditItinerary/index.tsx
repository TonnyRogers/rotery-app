import React, {useState, useRef, useEffect, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {formatBRL, clearValue, realToUSCash} from '../../lib/mask';
import {
  getActivitiesRequest,
  getLodgingsRequest,
  getTransportsRequest,
} from '../../store/modules/options/actions';
import {updateItineraryRequest} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {
  LocationPickerInputSetItem,
  TomTomApiResponse,
  LocationJson,
  CreateItineraryLodgingItemProps,
  CreateItineraryTransportItemProps,
  CreateItineraryActivityItemProps,
  FileProps,
} from '../../utils/types';

import {
  Container,
  RowGroup,
  RowGroupSpaced,
  IconHolder,
  CardHeader,
  BackButton,
  CardContent,
  Title,
  ImageList,
  ImageButton,
  Background,
  BackgroundCover,
  SIcon,
  AddImageButton,
  DataContentHeader,
  ContentTitle,
  HeaderActions,
  RemoveButton,
  FieldTitle,
  FieldValue,
  ColumnGroup,
  AddTransportButton,
  AddLodginButton,
  AddActivityButton,
  CardActions,
  SubmitButton,
  SubmitButtonText,
  PublicButton,
  PublicButtonText,
  PrivateButton,
  PrivateButtonText,
  AddButton,
  AddButtonText,
  ModalContent,
} from './styles';
import Card from '../../components/Card';
import DateTimeInput from '../../components/DateTimeInput';
import FileInput from '../../components/FileInput';
import Input from '../../components/Input';
import PickerInput from '../../components/PickerInput';
import TextArea from '../../components/TextArea';
import Modal from '../../components/Modal';
import Page from '../../components/Page';
import SplashScreen from '../../components/SplashScreen';
import ShadowBox from '../../components/ShadowBox';
import LocationPickerInput from '../../components/LocationPickerInput';
import {useIsAndroid} from '../../hooks/useIsAndroid';

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

interface EditItineraryProps {
  route: {
    params: {
      id: number;
    };
  };
}

const EditItinerary: React.FC<EditItineraryProps> = ({route}) => {
  const dispatch = useDispatch();
  const {isAndroid, isIOs} = useIsAndroid();
  const {id} = route.params;
  const {
    register,
    handleSubmit,
    setValue,
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

  const {itineraries, loading} = useSelector(
    (state: RootStateProps) => state.itineraries,
  );

  const itinerary = itineraries.find((item) => item.id === id);

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
  }, [optionRegister, register]);

  useEffect(() => {
    dispatch(getActivitiesRequest());
    dispatch(getLodgingsRequest());
    dispatch(getTransportsRequest());

    if (itinerary) {
      setValue('name', itinerary?.name);
      setValue('dateOut', itinerary.begin);
      setValue('dateReturn', itinerary.end);
      setValue('dateLimit', itinerary.deadlineForJoin);
      setValue('description', itinerary.description);
      setValue('location', itinerary.location);
      setValue('vacancies', String(itinerary.capacity));

      if (itinerary.lodgings) {
        const formatedLodigngs: CreateItineraryLodgingItemProps[] =
          itinerary.lodgings.map(
            ({
              capacity,
              itinerary: itineraryId,
              price,
              description,
              isFree,
              lodging: {id: lodgingId, name},
            }) => ({
              lodging: Number(lodgingId),
              name,
              itinerary: itineraryId,
              price,
              description,
              isFree,
              capacity,
            }),
          );

        setLodgings([...formatedLodigngs]);
      }

      if (itinerary.transports) {
        const formatedTransports: CreateItineraryTransportItemProps[] =
          itinerary.transports.map(
            ({
              capacity,
              itinerary: itineraryId,
              price,
              description,
              isFree,
              transport: {id: tranportId, name},
            }) => ({
              transport: Number(tranportId),
              name,
              itinerary: itineraryId,
              price,
              description,
              isFree,
              capacity,
            }),
          );

        setTransports([...formatedTransports]);
      }

      if (itinerary.activities) {
        const formatedActivities: CreateItineraryActivityItemProps[] =
          itinerary.activities.map(
            ({
              capacity,
              itinerary: itineraryId,
              price,
              description,
              isFree,
              activity: {id: activityId, name},
            }) => ({
              activity: Number(activityId),
              name,
              itinerary: itineraryId,
              price,
              description,
              isFree,
              capacity,
            }),
          );

        setActivities([...formatedActivities]);
      }

      const formatedPhotos: FileProps[] = itinerary.photos.map(({file}) => ({
        ...file,
      }));

      setImages([...formatedPhotos]);
      setPrivateItinerary(itinerary.isPrivate);
    }
  }, [dispatch, itinerary, setValue]);

  const options = useSelector((state: RootStateProps) => state.options);

  const navigation = useNavigation();
  const [transports, setTransports] = useState<
    CreateItineraryTransportItemProps[]
  >([]);
  const [lodgings, setLodgings] = useState<CreateItineraryLodgingItemProps[]>(
    [],
  );
  const [activities, setActivities] = useState<
    CreateItineraryActivityItemProps[]
  >([]);
  const optionTypeJson = useRef('');
  const [images, setImages] = useState<FileProps[]>([]);
  const [privateItinerary, setPrivateItinerary] = useState(false);
  const [addTransportVisible, setAddTransportVisible] = useState(false);
  const [transportsOptionIsOpen, setTransportsOptionIsOpen] = useState(false);
  const [addLodgingVisible, setAddLodgingVisible] = useState(false);
  const [lodgingOptionIsOpen, setLodgingOptionIsOpen] = useState(false);
  const [addActivityVisible, setAddActivityVisible] = useState(false);
  const [activityOptionIsOpen, setActivityOptionIsOpen] = useState(false);
  const [locationIsOpen, setLocationIsOpen] = useState(false);

  const watchDateOut = watch('dateOut', new Date());
  const watchDateReturn = watch('dateReturn', new Date());
  const watchDateLimit = watch('dateLimit', new Date());
  const watchName = watch('name');
  const watchVacancies = watch('vacancies');
  const watchLocation = watch('location');
  const watchDescription = watch('description');
  const watchOptionType = optionWatch('type');
  const watchOptionPrice = optionWatch('price');

  const descriptionRef = useRef() as any;
  const transportPriceRef = useRef() as any;
  const transportCapacityRef = useRef() as any;
  const transportDescriptionRef = useRef() as any;
  const locationJson = useRef<LocationPickerInputSetItem<TomTomApiResponse>>();

  function addImages(imageList: FileProps) {
    setImages([...images, imageList]);
  }

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  const addLodgingItem = (data: any) => {
    const typeData = JSON.parse(optionTypeJson.current);

    const newItem: CreateItineraryLodgingItemProps = {
      lodging: Number(typeData.id),
      price: String(realToUSCash(data.price)),
      capacity: data.capacity,
      description: data.description,
      isFree: Number(clearValue(data.price)) > 0 ? false : true,
      name: typeData.name,
    };

    setLodgings([...lodgings, newItem]);

    optionSetValue('type', '');
    optionSetValue('price', '');
    optionSetValue('capacity', '');
    optionSetValue('description', '');
    setAddLodgingVisible(false);
  };

  const addTransportItem = (data: any) => {
    const typeData = JSON.parse(optionTypeJson.current);

    const newItem: CreateItineraryTransportItemProps = {
      transport: Number(typeData.id),
      price: String(realToUSCash(data.price)),
      capacity: Number(data.capacity),
      description: data.description,
      isFree: Number(clearValue(data.price)) > 0 ? false : true,
      name: typeData.name,
    };

    setTransports([...transports, newItem]);
    optionSetValue('type', '');
    optionSetValue('price', '');
    optionSetValue('capacity', '');
    optionSetValue('description', '');
    setAddTransportVisible(false);
  };

  const addActivityItem = (data: any) => {
    const typeData = JSON.parse(optionTypeJson.current);

    const newItem: CreateItineraryActivityItemProps = {
      activity: Number(typeData.id),
      price: String(realToUSCash(data.price)),
      capacity: data.capacity,
      description: data.description,
      isFree: Number(clearValue(data.price)) > 0 ? false : true,
      name: typeData.name,
    };

    setActivities([...activities, newItem]);
    optionSetValue('type', '');
    optionSetValue('price', '');
    optionSetValue('capacity', '');
    optionSetValue('description', '');
    setAddActivityVisible(false);
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
      updateItineraryRequest(
        id,
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
  };

  const handleNewLocation = (value: any) => {
    locationJson.current = value;
  };

  const renderImages = useMemo(() => {
    function removeImages(index: number) {
      images.splice(index, 1);
      setImages([...images]);
    }

    return images.map((item, index: number) => (
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

  const renderTransports = useMemo(() => {
    function removeTransportItem(index: number) {
      transports.splice(index, 1);

      setTransports([...transports]);
    }

    return transports?.map((item, index: number) => (
      <ShadowBox key={'transports-' + index}>
        <HeaderActions>
          <RemoveButton onPress={() => removeTransportItem(index)}>
            <Icon name="delete-forever-outline" color="#F57373" size={24} />
          </RemoveButton>
        </HeaderActions>
        <FieldTitle>{item.name}</FieldTitle>
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
  }, [transports]);

  const renderLodgings = useMemo(() => {
    function removeLodgingItem(index: number) {
      lodgings.splice(index, 1);

      setLodgings([...lodgings]);
    }

    return lodgings.map((item, index: number) => (
      <ShadowBox key={'lodgings-' + index}>
        <HeaderActions>
          <RemoveButton onPress={() => removeLodgingItem(index)}>
            <Icon name="delete-forever-outline" color="#F57373" size={24} />
          </RemoveButton>
        </HeaderActions>
        <FieldTitle>{item.name}</FieldTitle>
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

  const renderActivities = useMemo(() => {
    function removeActivityItem(index: number) {
      activities.splice(index, 1);

      setActivities([...activities]);
    }

    return activities.map((item, index: number) => (
      <ShadowBox key={'activities-' + index}>
        <HeaderActions>
          <RemoveButton onPress={() => removeActivityItem(index)}>
            <Icon name="delete-forever-outline" color="#F57373" size={24} />
          </RemoveButton>
        </HeaderActions>
        <FieldTitle>{item.name}</FieldTitle>
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

  const handleChangeOptionTypeJson = (data: string) => {
    optionTypeJson.current = data;
  };

  return (
    <Page showHeader={false}>
      <Container
        showsVerticalScrollIndicator={true}
        renderToHardwareTextureAndroid={isAndroid}
        shouldRasterizeIOS={isIOs}
        scrollEventThrottle={16}
        decelerationRate="normal">
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
              value={watchName}
              onChange={(value: string) => setValue('name', value)}
              error={errors.name?.message}
            />
            <Title>Imagens</Title>
            <ImageList>
              {renderImages}
              <FileInput onSelect={addImages}>
                <AddImageButton>
                  <SIcon name="image-plus" color="#D9D8D8" size={30} />
                </AddImageButton>
              </FileInput>
            </ImageList>
            <Input
              label="Limite de Vagas"
              placeholder="numero máximo de vagas"
              value={watchVacancies}
              onChange={(value: string) => setValue('vacancies', value)}
              error={errors.vacancies?.message}
              keyboardType="number-pad"
            />
            <TextArea
              label="Descrição"
              placeholder="infomações adicionais sobre o roteiro"
              value={watchDescription}
              onChange={(value: string) => setValue('description', value)}
              error={errors.description?.message}
              ref={descriptionRef}
            />
            <ShadowBox>
              <DataContentHeader>
                <Icon name="calendar-blank-outline" color="#4885FD" size={24} />
                <ContentTitle>Datas</ContentTitle>
              </DataContentHeader>
              <DateTimeInput
                label="Saida"
                date={watchDateOut}
                onChange={(value: Date) => setValue('dateOut', value)}
                error={errors.dateOut?.message}
                isEdition={true}
              />
              <DateTimeInput
                label="Retorno"
                date={watchDateReturn}
                onChange={(value: Date) => setValue('dateReturn', value)}
                error={errors.dateReturn?.message}
                isEdition={true}
              />
              <DateTimeInput
                label="Limite para inscrição"
                date={watchDateLimit}
                onChange={(value: Date) => setValue('dateLimit', value)}
                error={errors.dateLimit?.message}
                isEdition={true}
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
            {renderTransports}
            <AddTransportButton onPress={() => setAddTransportVisible(true)}>
              <Icon name="plus-box-outline" color="#3dc77b" size={30} />
            </AddTransportButton>
            <RowGroup>
              <IconHolder>
                <Icon name="bed" color="#FFF" size={24} />
              </IconHolder>
              <ContentTitle>Hospedagem</ContentTitle>
            </RowGroup>
            {renderLodgings}
            <AddLodginButton onPress={() => setAddLodgingVisible(true)}>
              <Icon name="plus-box-outline" color="#3dc77b" size={30} />
            </AddLodginButton>
            <RowGroup>
              <IconHolder>
                <Icon name="lightning-bolt" color="#FFF" size={24} />
              </IconHolder>
              <ContentTitle>Atividades</ContentTitle>
            </RowGroup>
            {renderActivities}
            <AddActivityButton onPress={() => setAddActivityVisible(true)}>
              <Icon name="plus-box-outline" color="#3dc77b" size={30} />
            </AddActivityButton>
          </CardContent>
          <CardActions>
            <SubmitButton onPress={handleSubmit(onSubmit)}>
              <SubmitButtonText>Atualizar</SubmitButtonText>
            </SubmitButton>
          </CardActions>
        </Card>
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
            setValueJson={({name, value}) =>
              handleChangeOptionTypeJson(JSON.stringify({id: value, name}))
            }
            onChange={(value) => optionSetValue('type', value)}
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
            setValueJson={({name, value}) =>
              handleChangeOptionTypeJson(JSON.stringify({id: value, name}))
            }
            onChange={(value) => optionSetValue('type', value)}
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
            setValueJson={({name, value}) =>
              handleChangeOptionTypeJson(JSON.stringify({id: value, name}))
            }
            onChange={(value) => optionSetValue('type', value)}
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
      <SplashScreen visible={loading} />
      <LocationPickerInput
        visible={locationIsOpen}
        placeholder="Digite o endereço/local/cidade para buscar"
        setLocationJson={(json: any) => handleNewLocation(json)}
        onCloseRequest={() => setLocationIsOpen(false)}
        nameFormatType="general"
        onSelectItem={(value: string) => setValue('location', value)}
      />
    </Page>
  );
};

export default EditItinerary;
