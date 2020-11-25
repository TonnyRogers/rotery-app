import React, {useState, useRef, useEffect} from 'react';
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
import {hideNewItineraryGuide} from '../../store/modules/guides/actions';

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
import GuideCarousel from '../../components/GuideCarousel';
import Ads from '../../components/Ads';

const guideImages = [
  {
    id: 1,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-1.png',
    withInfo: true,
    title: 'Criando Roteiros 1/4',
    message:
      'Ao criar um roteiro você pode adicionar fotos, descrição, quantidade de vagas, dar um nome, datas e muito mais.',
    isAnimation: false,
  },
  {
    id: 2,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-2.png',
    withInfo: true,
    title: 'Criando Roteiros 2/4',
    message:
      'Para dicionar uma Atividade, Hospedagem ou Transporte você deve clicar no "mais" após preencher os dados.',
    isAnimation: false,
  },
  {
    id: 3,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-3.png',
    withInfo: true,
    title: 'Criando Roteiros 3/4',
    message: 'Após isso você vai notar que um item será adicionado logo acima.',
    isAnimation: false,
  },
  {
    id: 4,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-3.png',
    withInfo: true,
    title: 'Criando Roteiros 4/4',
    message: 'Você pode remove-lo clicando no ícone de lixeira.',
    isAnimation: false,
  },
];

interface TransportProps {
  id: number;
  name?: string;
  description: string | null;
  price: number | null;
  capacity: number;
}

interface LodgingProps {
  id: number;
  name?: string;
  description: string | null;
  price: number | null;
  capacity: number;
}

interface ActivityProps {
  id: number;
  name?: string;
  description: string | null;
  price: number | null;
  capacity: number;
}

const NewItinerary: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getActivitiesRequest());
    dispatch(getLodgingsRequest());
    dispatch(getTransportsRequest());
  }, [dispatch]);

  const options: InitialStateProps = useSelector(
    (state: RootStateProps) => state.options,
  );
  const {newItineraryGuide} = useSelector(
    (state: RootStateProps) => state.guides,
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

  function removeImages(index: number) {
    images.splice(index, 1);
    setImages([...images]);
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
  }

  function removeLodgingItem(index: number) {
    lodgings.splice(index, 1);

    setLodgings([...lodgings]);
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
  }

  function removeTransportItem(index: number) {
    transports.splice(index, 1);

    setTransports([...transports]);
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

    setName('');
    setVacancies('');
    setDescription('');
    setLocation('');
    setImages([]);
    setActivities([]);
    setLodgings([]);
    setTransports([]);
  }

  function closeGuide() {
    dispatch(hideNewItineraryGuide());
  }

  return (
    <Container>
      <Header />
      <Content>
        <Card icon="chevron-left">
          <CardHeader>
            <BackButton onPress={() => navigation.navigate('Feed')}>
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
              {images.map((item: {url: string}, index: number) => (
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
            <TransportList>
              {transports.map((item: TransportProps, index: number) => (
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
                      <FieldValue>{formatBRL(String(item.price))}</FieldValue>
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
              {lodgings.map((item: LodgingProps, index: number) => (
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
                      <FieldValue>{formatBRL(String(item.price))}</FieldValue>
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
      <Ads visible={newItineraryGuide} onRequestClose={() => {}}>
        <GuideCarousel data={guideImages} onClose={() => closeGuide()} />
      </Ads>
    </Container>
  );
};

export default NewItinerary;
