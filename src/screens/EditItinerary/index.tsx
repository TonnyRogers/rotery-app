import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {
  getActivitiesRequest,
  getLodgingsRequest,
  getTransportsRequest,
} from '../../store/modules/options/actions';
import {updateItineraryRequest} from '../../store/modules/itineraries/actions';
import {InitialStateProps as OptionsProps} from '../../store/modules/options/reducer';
import {
  InitialStateProps as ItinerariesProps,
  ItineraryProps,
} from '../../store/modules/itineraries/reducer';
import {RootStateProps} from '../../store/modules/rootReducer';

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
} from './styles';
import Card from '../../components/Card';
import DateTimeInput from '../../components/DateTimeInput';
import FileInput from '../../components/FileInput';
import Header from '../../components/Header';
import Input from '../../components/Input';
import PickerInput from '../../components/PickerInput';
import TextArea from '../../components/TextArea';

interface TransportProps {
  id: number;
  name?: string;
  pivot: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

interface LodgingProps {
  id: number;
  name?: string;
  pivot: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

interface ActivityProps {
  id: number;
  name?: string;
  pivot: {
    description: string | null;
    price: number | null;
    capacity: number;
  };
}

const EditItinerary: React.FC = ({route}) => {
  const dispatch = useDispatch();
  const {id} = route.params;

  const {itineraries}: ItinerariesProps = useSelector(
    (state: RootStateProps) => state.itineraries,
  );

  const itinerary: ItineraryProps = itineraries?.find(
    (item: ItineraryProps) => item.id === id,
  );

  useEffect(() => {
    dispatch(getActivitiesRequest());
    dispatch(getLodgingsRequest());
    dispatch(getTransportsRequest());

    setName(itinerary.name);
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

  function addLodgingItem() {
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
        price: lodgingPrice,
        capacity: lodgingCapacity,
        description: lodgingDescription,
      },
    };

    setLodgings([...lodgings, newItem]);
    setLodgingType('');
    setLodgingPrice('');
    setLodgingCapacity('');
    setLodgingDescription('');
  }

  function removeLodgingItem(index: number) {
    lodgings.splice(index, 1);

    setLodgings([...lodgings]);
  }

  function addTransportItem() {
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
        price: transportPrice,
        capacity: transportCapacity,
        description: transportDescription,
      },
    };

    setTransports([...transports, newItem]);
    setTransportType('');
    setTransportPrice('');
    setTransportCapacity('');
    setTransportDescription('');
  }

  function removeTransportItem(index: number) {
    transports.splice(index, 1);

    setTransports([...transports]);
  }

  function addActivityItem() {
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
        price: activityPrice,
        capacity: activityCapacity,
        description: activityDescription,
      },
    };

    setActivities([...activities, newItem]);
    setActivityType('');
    setActivityPrice('');
    setActivityCapacity('');
    setActivityDescription('');
  }

  function removeActivityItem(index: number) {
    activities.splice(index, 1);

    setActivities([...activities]);
  }

  function handleSubmit() {
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
        images,
        activities,
        lodgings,
        transports,
      ),
    );
  }

  return (
    <Container>
      <Header />
      <Content>
        <Card icon="chevron-left">
          <CardHeader>
            <BackButton onPress={() => navigation.navigate('Dashboard')}>
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </BackButton>
          </CardHeader>
          <CardContent>
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
                  <ImageButton key={index} onPress={() => removeImages(index)}>
                    <Background
                      resizeMode="cover"
                      source={{
                        uri: item.url,
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
                <Icon name="calendar-blank-outline" color="#4885FD" size={24} />
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
                      <RemoveButton onPress={() => removeTransportItem(index)}>
                        <Icon
                          name="delete-forever-outline"
                          color="#F57373"
                          size={24}
                        />
                      </RemoveButton>
                    </HeaderActions>
                    <FieldTitle>{item.name}</FieldTitle>
                    <FieldValue>{item.pivot.description}</FieldValue>
                    <RowGroupSpaced>
                      <ColumnGroup>
                        <FieldTitle>Capacidade</FieldTitle>
                        <FieldValue>{item.pivot.capacity}</FieldValue>
                      </ColumnGroup>
                      <ColumnGroup>
                        <FieldTitle>Preço</FieldTitle>
                        <FieldValue>{item.pivot.price}</FieldValue>
                      </ColumnGroup>
                    </RowGroupSpaced>
                  </DataContent>
                ))}
              <DataContent>
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
                  value={transportPrice}
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
              </DataContent>
            </TransportList>
            <AddTransportButton onPress={() => addTransportItem()}>
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
                    <FieldValue>{item.pivot.description}</FieldValue>
                    <RowGroupSpaced>
                      <ColumnGroup>
                        <FieldTitle>Capacidade</FieldTitle>
                        <FieldValue>{item.pivot.capacity}</FieldValue>
                      </ColumnGroup>
                      <ColumnGroup>
                        <FieldTitle>Preço</FieldTitle>
                        <FieldValue>{item.pivot.price}</FieldValue>
                      </ColumnGroup>
                    </RowGroupSpaced>
                  </DataContent>
                ))}
              <DataContent>
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
                  value={lodgingPrice}
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
              </DataContent>
            </LodgingList>
            <AddLodginButton onPress={() => addLodgingItem()}>
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
                  <FieldValue>{item.pivot.description}</FieldValue>
                  <RowGroupSpaced>
                    <ColumnGroup>
                      <FieldTitle>Capacidade</FieldTitle>
                      <FieldValue>{item.pivot.capacity}</FieldValue>
                    </ColumnGroup>
                    <ColumnGroup>
                      <FieldTitle>Preço</FieldTitle>
                      <FieldValue>{item.pivot.price}</FieldValue>
                    </ColumnGroup>
                  </RowGroupSpaced>
                </DataContent>
              ))}
              <DataContent>
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
                  value={activityPrice}
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
              </DataContent>
            </ActivityList>
            <AddActivityButton onPress={() => addActivityItem()}>
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
  );
};

export default EditItinerary;
