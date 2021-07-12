import React, {useState, useRef, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {formatBRL, clearValue} from '../../lib/mask';
import {createItineraryRequest} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {
  getActivitiesRequest,
  getLodgingsRequest,
  getTransportsRequest,
} from '../../store/modules/options/actions';
import {InitialStateProps} from '../../store/modules/options/reducer';
import {LodgingProps, TransportProps, ActivityProps} from '../../utils/types';
import {showNewItineraryGuide} from '../../store/modules/guides/actions';

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
  DataContent,
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

const NewItinerary: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getActivitiesRequest());
    dispatch(getLodgingsRequest());
    dispatch(getTransportsRequest());
    dispatch(showNewItineraryGuide());
  }, [dispatch]);

  const options: InitialStateProps = useSelector(
    (state: RootStateProps) => state.options,
  );

  const [name, setName] = useState('');
  const [dateOut, setDateOut] = useState(new Date());
  const [dateReturn, setDateReturn] = useState(new Date());
  const [dateLimit, setDateLimit] = useState(new Date());
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [transports, setTransports] = useState([] as any);
  const [transportType, setTransportType] = useState('');
  const [transportPrice, setTransportPrice] = useState('');
  const [transportCapacity, setTransportCapacity] = useState('');
  const [transportDescription, setTransportDescription] = useState('');
  const [lodgings, setLodgings] = useState([] as any);
  const [lodgingType, setLodgingType] = useState('');
  const [lodgingPrice, setLodgingPrice] = useState('');
  const [lodgingCapacity, setLodgingCapacity] = useState('');
  const [lodgingDescription, setLodgingDescription] = useState('');
  const [activities, setActivities] = useState([] as any);
  const [activityType, setActivityType] = useState('');
  const [activityPrice, setActivityPrice] = useState('');
  const [activityCapacity, setActivityCapacity] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [images, setImages] = useState([] as any);
  const [privateItinerary, setPrivateItinerary] = useState(false);
  const [addTransportVisible, setAddTransportVisible] = useState(false);
  const [addLodgingVisible, setAddLodgingVisible] = useState(false);
  const [addActivityVisible, setAddActivityVisible] = useState(false);

  const descriptionRef = useRef() as any;
  const nameRef = useRef() as any;
  const locationRef = useRef() as any;
  const locationDescriptionRef = useRef() as any;
  const vacanciesRef = useRef() as any;
  const transportTypeRef = useRef() as any;
  const transportPriceRef = useRef() as any;
  const transportCapacityRef = useRef() as any;
  const transportDescriptionRef = useRef() as any;
  const lodgingTypeRef = useRef() as any;
  const lodgingPriceRef = useRef() as any;
  const lodgingCapacityRef = useRef() as any;
  const lodgingDescriptionRef = useRef() as any;
  const activityTypeRef = useRef() as any;
  const activityPriceRef = useRef() as any;
  const activityCapacityRef = useRef() as any;
  const activityDescriptionRef = useRef() as any;

  function addImages(imageList: []) {
    setImages([...images, ...imageList]);
  }

  function addLodgingItem() {
    if (!lodgingType || !lodgingPrice) {
      return;
    }

    const optionItem = options.lodgings?.find(
      (option) => option.id === Number(lodgingType),
    );

    const newItem: LodgingProps = {
      id: Number(lodgingType),
      price: Number(clearValue(lodgingPrice)),
      capacity: Number(lodgingCapacity),
      description: lodgingDescription,
      name: optionItem?.name,
    };

    lodgings.push(newItem);

    setLodgings(lodgings);
    setLodgingType('');
    setLodgingPrice('');
    setLodgingCapacity('');
    setLodgingDescription('');
    setAddLodgingVisible(false);
  }

  function addTransportItem() {
    if (!transportType || !transportPrice) {
      return;
    }

    const optionItem = options.transports?.find(
      (option) => option.id === Number(transportType),
    );

    const newItem: TransportProps = {
      id: Number(transportType),
      price: Number(clearValue(transportPrice)),
      capacity: Number(transportCapacity),
      description: transportDescription,
      name: optionItem?.name,
    };

    transports.push(newItem);

    setTransports(transports);
    setTransportType('');
    setTransportPrice('');
    setTransportCapacity('');
    setTransportDescription('');
    setAddTransportVisible(false);
  }

  function addActivityItem() {
    if (!activityType || !activityPrice) {
      return;
    }

    const optionItem = options.activities?.find(
      (option) => option.id === Number(activityType),
    );

    const newItem: ActivityProps = {
      id: Number(activityType),
      price: Number(clearValue(activityPrice)),
      capacity: Number(activityCapacity),
      description: activityDescription,
      name: optionItem?.name,
    };

    activities.push(newItem);

    setActivities(activities);
    setActivityType('');
    setActivityPrice('');
    setActivityCapacity('');
    setActivityDescription('');
    setAddActivityVisible(false);
  }

  function handleSubmit() {
    if (
      !name ||
      !vacancies ||
      !dateOut ||
      !dateReturn ||
      !dateLimit ||
      !location ||
      !description
    ) {
      return;
    }

    dispatch(
      createItineraryRequest(
        name,
        Number(vacancies),
        description,
        dateOut,
        dateReturn,
        dateLimit,
        location,
        privateItinerary,
        images,
        activities,
        lodgings,
        transports,
      ),
    );

    setName('');
    setVacancies('');
    setDescription('');
    setLocation('');
    setImages([]);
    setActivities([]);
    setLodgings([]);
    setTransports([]);
  }

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
    return transports.map((item: TransportProps, index: number) => (
      <DataContent key={index}>
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
      </DataContent>
    ));
  }, [transports]);

  const renderLodgings = useCallback(() => {
    function removeLodgingItem(index: number) {
      lodgings.splice(index, 1);

      setLodgings([...lodgings]);
    }
    return lodgings.map((item: LodgingProps, index: number) => (
      <DataContent key={index}>
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
      </DataContent>
    ));
  }, [lodgings]);

  const renderActivities = useCallback(() => {
    function removeActivityItem(index: number) {
      activities.splice(index, 1);

      setActivities([...activities]);
    }

    return activities.map((item: ActivityProps, index: number) => (
      <DataContent key={index}>
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
      </DataContent>
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
                value={name}
                ref={nameRef}
                onChange={setName}
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
                value={vacancies}
                ref={vacanciesRef}
                onChange={setVacancies}
                keyboardType="number-pad"
              />
              <TextArea
                label="Descrição"
                placeholder="infomações adicionais sobre o roteiro"
                value={description}
                ref={descriptionRef}
                onChange={setDescription}
              />
              <DataContent>
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
                  date={dateOut}
                  onChange={setDateOut}
                />
                <DateTimeInput
                  label="Retorno"
                  date={dateReturn}
                  onChange={setDateReturn}
                />
                <DateTimeInput
                  label="Limite para inscrição"
                  date={dateLimit}
                  onChange={setDateLimit}
                />
              </DataContent>
              <DataContent>
                <DataContentHeader>
                  <Icon name="map-check-outline" color="#4885FD" size={24} />
                  <ContentTitle>Destino</ContentTitle>
                </DataContentHeader>
                <Input
                  label="Endereço"
                  placeholder="endereço/cidade/local"
                  value={location}
                  ref={locationRef}
                  onChange={setLocation}
                />
                <TextArea
                  label="Informações"
                  placeholder="infomações adicionais..."
                  value={locationDescription}
                  ref={locationDescriptionRef}
                  onChange={setLocationDescription}
                />
              </DataContent>
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
              <SubmitButton onPress={handleSubmit}>
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
            label="Tipo"
            value={transportType}
            ref={transportTypeRef}
            onChange={setTransportType}
            options={options.transports}
          />
          <Input
            label="Preço"
            placeholder="preço por pessoa"
            value={formatBRL(transportPrice)}
            ref={transportPriceRef}
            onChange={setTransportPrice}
            keyboardType="number-pad"
          />
          <Input
            label="Capacidade (lugares)"
            placeholder="quantidade máxima de pessoas"
            value={transportCapacity}
            ref={transportCapacityRef}
            onChange={setTransportCapacity}
            keyboardType="number-pad"
          />
          <TextArea
            label="Descrição"
            placeholder="infomações adicionais.."
            value={transportDescription}
            ref={transportDescriptionRef}
            onChange={setTransportDescription}
          />
          <AddButton onPress={() => addTransportItem()}>
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
            label="Tipo"
            value={lodgingType}
            ref={lodgingTypeRef}
            onChange={setLodgingType}
            options={options.lodgings}
          />
          <Input
            label="Preço"
            placeholder="preço por pessoa"
            value={formatBRL(lodgingPrice)}
            ref={lodgingPriceRef}
            onChange={setLodgingPrice}
            keyboardType="number-pad"
          />
          <Input
            label="Capacidade (lugares)"
            placeholder="quantidade máxima de pessoas"
            value={lodgingCapacity}
            ref={lodgingCapacityRef}
            onChange={setLodgingCapacity}
            keyboardType="number-pad"
          />
          <TextArea
            label="Descrição"
            placeholder="infomações adicionais.."
            value={lodgingDescription}
            ref={lodgingDescriptionRef}
            onChange={setLodgingDescription}
          />
          <AddButton onPress={() => addLodgingItem()}>
            <AddButtonText>Adicionar</AddButtonText>
          </AddButton>
        </ModalContent>
      </Modal>
      <Modal
        title="Adicionar Atividade"
        visible={addActivityVisible}
        onCloseRequest={async () => setAddActivityVisible(false)}
        key="activity-modal">
        <ModalContent>
          <PickerInput
            label="Tipo"
            value={activityType}
            ref={activityTypeRef}
            onChange={setActivityType}
            options={options.activities}
          />
          <Input
            label="Preço"
            placeholder="preço por pessoa"
            value={formatBRL(activityPrice)}
            ref={activityPriceRef}
            onChange={setActivityPrice}
            keyboardType="number-pad"
          />
          <Input
            label="Capacidade (lugares)"
            placeholder="quantidade máxima de pessoas"
            value={activityCapacity}
            ref={activityCapacityRef}
            onChange={setActivityCapacity}
            keyboardType="number-pad"
          />
          <TextArea
            label="Descrição"
            placeholder="infomações adicionais.."
            value={activityDescription}
            ref={activityDescriptionRef}
            onChange={setActivityDescription}
          />
          <AddButton onPress={() => addActivityItem()}>
            <AddButtonText>Adicionar</AddButtonText>
          </AddButton>
        </ModalContent>
      </Modal>
    </Page>
  );
};

export default NewItinerary;
