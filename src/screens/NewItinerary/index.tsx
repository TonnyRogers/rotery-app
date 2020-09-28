import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {createItineraryRequest} from '../../store/modules/itineraries/actions';
import {
  getActivitiesRequest,
  getLodgingsRequest,
  getTransportsRequest,
} from '../../store/modules/options/actions';
import {InitialStateProps} from '../../store/modules/options/reducer';

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
  AddTransportButton,
  TransportList,
  ColumnGroup,
  FieldTitle,
  FieldValue,
  RemoveButton,
  HeaderActions,
  LodgingList,
  AddLodginButton,
  ActivityList,
  AddActivityButton,
  AddImageButton,
  CardHeader,
  BackButton,
} from './styles';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Card from '../../components/Card';
import TextArea from '../../components/TextArea';
import DateTimeInput from '../../components/DateTimeInput';
import FileInput from '../../components/FileInput';
import PickerInput from '../../components/PickerInput';

const NewItinerary: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getActivitiesRequest());
    dispatch(getLodgingsRequest());
    dispatch(getTransportsRequest());
  }, [dispatch]);

  const options: InitialStateProps = useSelector((state) => state.options);
  const [name, setName] = useState('');
  const [dateOut, setDateOut] = useState(new Date());
  const [dateReturn, setDateReturn] = useState(new Date());
  const [dateLimit, setDateLimit] = useState(new Date());
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [transports, setTransports] = useState([]);
  const [transportType, setTransportType] = useState('');
  const [transportPrice, setTransportPrice] = useState('');
  const [transportCapacity, setTransportCapacity] = useState('');
  const [transportDescription, setTransportDescription] = useState('');
  const [lodgings, setLodgings] = useState([]);
  const [lodgingType, setLodgingType] = useState('');
  const [lodgingPrice, setLodgingPrice] = useState('');
  const [lodgingCapacity, setLodgingCapacity] = useState('');
  const [lodgingDescription, setLodgingDescription] = useState('');
  const [activities, setActivities] = useState([]);
  const [activityType, setActivityType] = useState('');
  const [activityPrice, setActivityPrice] = useState('');
  const [activityCapacity, setActivityCapacity] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [images, setImages] = useState([]);

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
      price: lodgingPrice,
      capacity: lodgingCapacity,
      description: lodgingDescription,
      name: optionItem?.name,
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
      price: transportPrice,
      capacity: transportCapacity,
      description: transportDescription,
      name: optionItem?.name,
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
      price: activityPrice,
      capacity: activityCapacity,
      description: activityDescription,
      name: optionItem?.name,
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
    if (
      !name ||
      !vacancies ||
      !dateOut ||
      !dateReturn ||
      !dateLimit ||
      !location
    ) {
      return;
    }

    dispatch(
      createItineraryRequest(
        name,
        vacancies,
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

    setName('');
    setVacancies('');
    setDescription('');
    setLocation('');
    setImages([]);
    setActivities([]);
    setLodgings([]);
    setTransports([]);
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
              {images.map((item, index) => (
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
              {transports.map((item, index) => (
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
                  <FieldValue>{item.description}</FieldValue>
                  <RowGroupSpaced>
                    <ColumnGroup>
                      <FieldTitle>Capacidade</FieldTitle>
                      <FieldValue>{item.capacity}</FieldValue>
                    </ColumnGroup>
                    <ColumnGroup>
                      <FieldTitle>Preço</FieldTitle>
                      <FieldValue>{item.price}</FieldValue>
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
              {lodgings.map((item, index) => (
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
                  <FieldValue>{item.description}</FieldValue>
                  <RowGroupSpaced>
                    <ColumnGroup>
                      <FieldTitle>Capacidade</FieldTitle>
                      <FieldValue>{item.capacity}</FieldValue>
                    </ColumnGroup>
                    <ColumnGroup>
                      <FieldTitle>Preço</FieldTitle>
                      <FieldValue>{item.price}</FieldValue>
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
              {activities.map((item, index) => (
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
                  <FieldValue>{item.description}</FieldValue>
                  <RowGroupSpaced>
                    <ColumnGroup>
                      <FieldTitle>Capacidade</FieldTitle>
                      <FieldValue>{item.capacity}</FieldValue>
                    </ColumnGroup>
                    <ColumnGroup>
                      <FieldTitle>Preço</FieldTitle>
                      <FieldValue>{item.price}</FieldValue>
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
              <SubmitButtonText>Salvar</SubmitButtonText>
            </SubmitButton>
          </CardActions>
        </Card>
      </Content>
    </Container>
  );
};

export default NewItinerary;
