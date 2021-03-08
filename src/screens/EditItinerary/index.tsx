import React, {useState, useRef, useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {formatBRL, clearValue} from '../../lib/mask';
import {
  getActivitiesRequest,
  getLodgingsRequest,
  getTransportsRequest,
} from '../../store/modules/options/actions';
import {updateItineraryRequest} from '../../store/modules/itineraries/actions';
import {InitialStateProps as OptionsProps} from '../../store/modules/options/reducer';
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
  DataContent,
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

  const {itinerary} = useSelector(
    (state: RootStateProps) => state.dynamicItinerary,
  );

  useEffect(() => {
    dispatch(getActivitiesRequest());
    dispatch(getLodgingsRequest());
    dispatch(getTransportsRequest());

    if (itinerary) {
      setName(itinerary?.name);
      setDateOut(new Date(itinerary.begin));
      setDateReturn(new Date(itinerary.end));
      setDateLimit(new Date(itinerary.deadline_for_join));
      setDescription(itinerary.description);
      setLocation(itinerary.location);
      setVacancies(String(itinerary.capacity));
      setLodgings([...itinerary.lodgings]);
      setActivities([...itinerary.activities]);
      setTransports([...itinerary.transports]);
      setImages([...itinerary.photos]);
      setPrivateItinerary(itinerary.is_private);
    }
  }, [dispatch, itinerary]);

  const options: OptionsProps = useSelector(
    (state: RootStateProps) => state.options,
  );

  const navigation = useNavigation();
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

  const descriptionRef = useRef();
  const nameRef = useRef();
  const locationRef = useRef();
  const locationDescriptionRef = useRef();
  const vacanciesRef = useRef();
  const transportTypeRef = useRef();
  const transportPriceRef = useRef();
  const transportCapacityRef = useRef();
  const transportDescriptionRef = useRef();
  const lodgingTypeRef = useRef();
  const lodgingPriceRef = useRef();
  const lodgingCapacityRef = useRef();
  const lodgingDescriptionRef = useRef();
  const activityTypeRef = useRef();
  const activityPriceRef = useRef();
  const activityCapacityRef = useRef();
  const activityDescriptionRef = useRef();

  function addImages(imageList: []) {
    setImages([...images, ...imageList]);
  }

  function removeImages(index: number) {
    images.splice(index, 1);
    setImages([...images]);
  }

  const addLodgingItem = useCallback(() => {
    if (!lodgingType || !lodgingPrice || !lodgingDescription) {
      return;
    }

    const optionItem = options.lodgings?.find(
      (option) => option.id === Number(lodgingType),
    );

    const newItem = {
      id: lodgingType,
      name: optionItem?.name,
      pivot: {
        price: clearValue(lodgingPrice),
        capacity: lodgingCapacity,
        description: lodgingDescription,
      },
    };

    setLodgings([...lodgings, newItem]);
    setLodgingType('');
    setLodgingPrice('');
    setLodgingCapacity('');
    setLodgingDescription('');
    setAddLodgingVisible(false);
  }, [
    lodgingCapacity,
    lodgingDescription,
    lodgingPrice,
    lodgingType,
    lodgings,
    options.lodgings,
  ]);

  function removeLodgingItem(index: number) {
    lodgings.splice(index, 1);

    setLodgings([...lodgings]);
  }

  const addTransportItem = useCallback(() => {
    if (!transportType || !transportPrice || !transportDescription) {
      return;
    }

    const optionItem = options.transports?.find(
      (option) => option.id === Number(transportType),
    );

    const newItem = {
      id: transportType,
      name: optionItem?.name,
      pivot: {
        price: clearValue(transportPrice),
        capacity: transportCapacity,
        description: transportDescription,
      },
    };

    setTransports([...transports, newItem]);
    setTransportType('');
    setTransportPrice('');
    setTransportCapacity('');
    setTransportDescription('');
    setAddTransportVisible(false);
  }, [
    options.transports,
    transportCapacity,
    transportDescription,
    transportPrice,
    transportType,
    transports,
  ]);

  function removeTransportItem(index: number) {
    transports.splice(index, 1);

    setTransports([...transports]);
  }

  const addActivityItem = useCallback(() => {
    if (!activityType || !activityPrice || !activityDescription) {
      return;
    }

    const optionItem = options.activities?.find(
      (option) => option.id === Number(activityType),
    );

    const newItem = {
      id: activityType,
      name: optionItem?.name,
      pivot: {
        price: clearValue(activityPrice),
        capacity: activityCapacity,
        description: activityDescription,
      },
    };

    setActivities([...activities, newItem]);
    setActivityType('');
    setActivityPrice('');
    setActivityCapacity('');
    setActivityDescription('');
    setAddActivityVisible(false);
  }, [
    activities,
    activityCapacity,
    activityDescription,
    activityPrice,
    activityType,
    options.activities,
  ]);

  function removeActivityItem(index: number) {
    activities.splice(index, 1);

    setActivities([...activities]);
  }

  const handleSubmit = useCallback(() => {
    dispatch(
      updateItineraryRequest(
        id,
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
  }, [
    activities,
    dateLimit,
    dateOut,
    dateReturn,
    description,
    dispatch,
    id,
    images,
    location,
    lodgings,
    name,
    privateItinerary,
    transports,
    vacancies,
  ]);

  return (
    <>
      <Container>
        <Content>
          <Card>
            <CardHeader>
              <BackButton onPress={() => navigation.navigate('Feed')}>
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
                {images &&
                  images.map((item: {url: string}, index: number) => (
                    <ImageButton
                      key={index}
                      onPress={() => removeImages(index)}>
                      <Background
                        resizeMode="cover"
                        source={{
                          uri: item.url || undefined,
                        }}
                      />
                      <BackgroundCover>
                        <SIcon
                          name="delete-forever-outline"
                          color="#F57373"
                          size={30}
                        />
                      </BackgroundCover>
                    </ImageButton>
                  ))}
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
                  placeholder="endereço completo"
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
              <TransportList>
                {transports &&
                  transports?.map((item: TransportProps, index: number) => (
                    <DataContent key={index}>
                      <HeaderActions>
                        <RemoveButton
                          onPress={() => removeTransportItem(index)}>
                          <Icon
                            name="delete-forever-outline"
                            color="#F57373"
                            size={24}
                          />
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
                          <FieldValue>
                            {formatBRL(String(item.pivot?.price))}
                          </FieldValue>
                        </ColumnGroup>
                      </RowGroupSpaced>
                    </DataContent>
                  ))}
              </TransportList>
              <AddTransportButton onPress={() => setAddTransportVisible(true)}>
                <Icon name="plus-box-outline" color="#3dc77b" size={30} />
              </AddTransportButton>
              <RowGroup>
                <IconHolder>
                  <Icon name="bed" color="#FFF" size={24} />
                </IconHolder>
                <ContentTitle>Hospedagem</ContentTitle>
              </RowGroup>
              <LodgingList>
                {lodgings &&
                  lodgings.map((item: LodgingProps, index: number) => (
                    <DataContent key={index}>
                      <HeaderActions>
                        <RemoveButton onPress={() => removeLodgingItem(index)}>
                          <Icon
                            name="delete-forever-outline"
                            color="#F57373"
                            size={24}
                          />
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
                          <FieldValue>
                            {formatBRL(String(item.pivot?.price))}
                          </FieldValue>
                        </ColumnGroup>
                      </RowGroupSpaced>
                    </DataContent>
                  ))}
              </LodgingList>
              <AddLodginButton onPress={() => setAddLodgingVisible(true)}>
                <Icon name="plus-box-outline" color="#3dc77b" size={30} />
              </AddLodginButton>
              <RowGroup>
                <IconHolder>
                  <Icon name="lightning-bolt" color="#FFF" size={24} />
                </IconHolder>
                <ContentTitle>Atividades</ContentTitle>
              </RowGroup>
              <ActivityList>
                {activities.map((item: ActivityProps, index: number) => (
                  <DataContent key={index}>
                    <HeaderActions>
                      <RemoveButton onPress={() => removeActivityItem(index)}>
                        <Icon
                          name="delete-forever-outline"
                          color="#F57373"
                          size={24}
                        />
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
                        <FieldValue>
                          {formatBRL(String(item.pivot?.price))}
                        </FieldValue>
                      </ColumnGroup>
                    </RowGroupSpaced>
                  </DataContent>
                ))}
              </ActivityList>
              <AddActivityButton onPress={() => setAddActivityVisible(true)}>
                <Icon name="plus-box-outline" color="#3dc77b" size={30} />
              </AddActivityButton>
            </CardContent>
            <CardActions>
              <SubmitButton onPress={handleSubmit}>
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
    </>
  );
};

export default EditItinerary;
