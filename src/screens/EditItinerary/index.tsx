import React, {useState, useRef, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {formatBRL, clearValue} from '../../lib/mask';
import {
  getActivitiesRequest,
  getLodgingsRequest,
  getTransportsRequest,
} from '../../store/modules/options/actions';
import {updateItineraryRequest} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {TransportProps, LodgingProps, ActivityProps} from '../../utils/types';

import {
  Container,
  Content,
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
  TransportList,
  HeaderActions,
  RemoveButton,
  FieldTitle,
  FieldValue,
  ColumnGroup,
  AddTransportButton,
  LodgingList,
  AddLodginButton,
  ActivityList,
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
      setValue('dateLimit', itinerary.deadline_for_join);
      setValue('description', itinerary.description);
      setValue('location', itinerary.location);
      setValue('vacancies', String(itinerary.capacity));
      setLodgings([...itinerary.lodgings]);
      setActivities([...itinerary.activities]);
      setTransports([...itinerary.transports]);
      setImages([...itinerary.photos]);
      setPrivateItinerary(itinerary.is_private);
    }
  }, [dispatch, itinerary, setValue]);

  const options = useSelector((state: RootStateProps) => state.options);

  const navigation = useNavigation();
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
  const locationRef = useRef() as any;
  const transportPriceRef = useRef() as any;
  const transportCapacityRef = useRef() as any;
  const transportDescriptionRef = useRef() as any;

  function addImages(imageList: []) {
    setImages([...images, ...imageList]);
  }

  const removeImages = useCallback(
    (index: number) => {
      images.splice(index, 1);
      setImages([...images]);
    },
    [images],
  );

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  const addLodgingItem = (data: any) => {
    const optionItem = options.lodgings?.find(
      (option) => option.id === Number(data.type),
    );

    const newItem = {
      id: data.type,
      name: optionItem?.name,
      pivot: {
        price: clearValue(data.price),
        capacity: data.capacity,
        description: data.description,
      },
    };

    setLodgings([...lodgings, newItem]);

    optionSetValue('type', '');
    optionSetValue('price', '');
    optionSetValue('capacity', '');
    optionSetValue('description', '');
    setAddLodgingVisible(false);
  };

  const removeLodgingItem = useCallback(
    (index: number) => {
      lodgings.splice(index, 1);

      setLodgings([...lodgings]);
    },
    [lodgings],
  );

  const addTransportItem = (data: any) => {
    const optionItem = options.transports?.find(
      (option) => option.id === Number(data.type),
    );

    const newItem = {
      id: data.type,
      name: optionItem?.name,
      pivot: {
        price: clearValue(data.price),
        capacity: data.capacity,
        description: data.description,
      },
    };

    setTransports([...transports, newItem]);
    optionSetValue('type', '');
    optionSetValue('price', '');
    optionSetValue('capacity', '');
    optionSetValue('description', '');
    setAddTransportVisible(false);
  };

  const removeTransportItem = useCallback(
    (index: number) => {
      transports.splice(index, 1);

      setTransports([...transports]);
    },
    [transports],
  );

  const addActivityItem = (data: any) => {
    const optionItem = options.activities?.find(
      (option) => option.id === Number(data.type),
    );

    const newItem = {
      id: data.type,
      name: optionItem?.name,
      pivot: {
        price: clearValue(data.price),
        capacity: data.capacity,
        description: data.description,
      },
    };

    setActivities([...activities, newItem]);
    optionSetValue('type', '');
    optionSetValue('price', '');
    optionSetValue('capacity', '');
    optionSetValue('description', '');
    setAddActivityVisible(false);
  };

  const removeActivityItem = useCallback(
    (index: number) => {
      activities.splice(index, 1);

      setActivities([...activities]);
    },
    [activities],
  );

  const onSubmit = (data: any) => {
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
      ),
    );
  };

  const renderImages = useCallback(
    () =>
      images.map((item: {url: string}, index: number) => (
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
      )),
    [images, removeImages],
  );

  const renderTransports = useCallback(
    () =>
      transports?.map((item: TransportProps, index: number) => (
        <ShadowBox key={'transports-' + index}>
          <HeaderActions>
            <RemoveButton onPress={() => removeTransportItem(index)}>
              <Icon name="delete-forever-outline" color="#F57373" size={24} />
            </RemoveButton>
          </HeaderActions>
          <FieldTitle>{item.name}</FieldTitle>
          <FieldValue>{item.pivot?.description}</FieldValue>
          <RowGroupSpaced>
            <ColumnGroup>
              <FieldTitle>Capacidade</FieldTitle>
              <FieldValue>{item.pivot?.capacity}</FieldValue>
            </ColumnGroup>
            <ColumnGroup>
              <FieldTitle>Preço</FieldTitle>
              <FieldValue>{formatBRL(String(item.pivot?.price))}</FieldValue>
            </ColumnGroup>
          </RowGroupSpaced>
        </ShadowBox>
      )),
    [removeTransportItem, transports],
  );

  const renderLodgings = useCallback(
    () =>
      lodgings.map((item: LodgingProps, index: number) => (
        <ShadowBox key={'lodgings-' + index}>
          <HeaderActions>
            <RemoveButton onPress={() => removeLodgingItem(index)}>
              <Icon name="delete-forever-outline" color="#F57373" size={24} />
            </RemoveButton>
          </HeaderActions>
          <FieldTitle>{item.name}</FieldTitle>
          <FieldValue>{item.pivot?.description}</FieldValue>
          <RowGroupSpaced>
            <ColumnGroup>
              <FieldTitle>Capacidade</FieldTitle>
              <FieldValue>{item.pivot?.capacity}</FieldValue>
            </ColumnGroup>
            <ColumnGroup>
              <FieldTitle>Preço</FieldTitle>
              <FieldValue>{formatBRL(String(item.pivot?.price))}</FieldValue>
            </ColumnGroup>
          </RowGroupSpaced>
        </ShadowBox>
      )),
    [lodgings, removeLodgingItem],
  );

  const renderActivities = useCallback(
    () =>
      activities.map((item: ActivityProps, index: number) => (
        <ShadowBox key={'activities-' + index}>
          <HeaderActions>
            <RemoveButton onPress={() => removeActivityItem(index)}>
              <Icon name="delete-forever-outline" color="#F57373" size={24} />
            </RemoveButton>
          </HeaderActions>
          <FieldTitle>{item.name}</FieldTitle>
          <FieldValue>{item.pivot?.description}</FieldValue>
          <RowGroupSpaced>
            <ColumnGroup>
              <FieldTitle>Capacidade</FieldTitle>
              <FieldValue>{item.pivot?.capacity}</FieldValue>
            </ColumnGroup>
            <ColumnGroup>
              <FieldTitle>Preço</FieldTitle>
              <FieldValue>{formatBRL(String(item.pivot?.price))}</FieldValue>
            </ColumnGroup>
          </RowGroupSpaced>
        </ShadowBox>
      )),
    [activities, removeActivityItem],
  );

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
                value={watchName}
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
                <Input
                  label="Endereço"
                  placeholder="endereço completo"
                  value={watchLocation}
                  ref={locationRef}
                  onChange={(value: string) => setValue('location', value)}
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
              <AddTransportButton onPress={() => setAddTransportVisible(true)}>
                <Icon name="plus-box-outline" color="#3dc77b" size={30} />
              </AddTransportButton>
              <RowGroup>
                <IconHolder>
                  <Icon name="bed" color="#FFF" size={24} />
                </IconHolder>
                <ContentTitle>Hospedagem</ContentTitle>
              </RowGroup>
              <LodgingList>{renderLodgings()}</LodgingList>
              <AddLodginButton onPress={() => setAddLodgingVisible(true)}>
                <Icon name="plus-box-outline" color="#3dc77b" size={30} />
              </AddLodginButton>
              <RowGroup>
                <IconHolder>
                  <Icon name="lightning-bolt" color="#FFF" size={24} />
                </IconHolder>
                <ContentTitle>Atividades</ContentTitle>
              </RowGroup>
              <ActivityList>{renderActivities()}</ActivityList>
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
      <SplashScreen visible={loading} />
    </Page>
  );
};

export default EditItinerary;
