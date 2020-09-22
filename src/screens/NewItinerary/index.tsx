import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LogBox} from 'react-native';

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
} from './styles';

LogBox.ignoreAllLogs(true);

import Header from '../../components/Header';
import Input from '../../components/Input';
import Card from '../../components/Card';
import TextArea from '../../components/TextArea';
import DateTimeInput from '../../components/DateTimeInput';
import FileInput from '../../components/FileInput';

const NewItinerary: React.FC = () => {
  const [name, setName] = useState('');
  const [dateOut, setDateOut] = useState(new Date());
  const [dateReturn, setDateReturn] = useState(new Date());
  const [dateLimit, setDateLimit] = useState(new Date());
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [vacancies, setVacancies] = useState(0);
  const [transports, setTransports] = useState([]);
  const [transportType, setTransportType] = useState('');
  const [transportPrice, setTransportPrice] = useState('');
  const [transportCapacity, setTransportCapacity] = useState(0);
  const [transportDescription, setTransportDescription] = useState('');
  const [lodgings, setLodgings] = useState([]);
  const [lodgingType, setLodgingType] = useState('');
  const [lodgingPrice, setLodgingPrice] = useState('');
  const [lodgingCapacity, setLodgingCapacity] = useState(0);
  const [lodgingDescription, setLodgingDescription] = useState('');
  const [activities, setActivities] = useState([]);
  const [activityType, setActivityType] = useState('');
  const [activityPrice, setActivityPrice] = useState('');
  const [activityCapacity, setActivityCapacity] = useState(0);
  const [activityDescription, setActivityDescription] = useState('');
  const [images, setImages] = useState([
    {
      id: 1,
      uri:
        'https://images.theconversation.com/files/271799/original/file-20190430-136810-1mceagq.jpg',
      name: 'file',
      size: '2mb',
    },
    {
      id: 2,
      uri:
        'https://s29081.pcdn.co/wp-content/uploads/2017/10/untitled-0183.jpg.optimal.jpg',
      name: 'file',
      size: '2mb',
    },
    {
      id: 3,
      uri:
        'https://thirdeyetraveller.com/wp-content/uploads/2017/12/slider1.jpg',
      name: 'file',
      size: '2mb',
    },
  ]);

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

  function addLodgingItem() {
    if (!lodgingType || !lodgingPrice || !lodgingDescription) {
      return;
    }

    const newItem = {
      type: lodgingType,
      price: lodgingPrice,
      capacity: lodgingCapacity,
      description: lodgingDescription,
    };

    setLodgings([...lodgings, newItem]);
    setLodgingType('');
    setLodgingPrice('');
    setLodgingCapacity(0);
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

    const newItem = {
      type: transportType,
      price: transportPrice,
      capacity: transportCapacity,
      description: transportDescription,
    };

    setTransports([...transports, newItem]);
    setTransportType('');
    setTransportPrice('');
    setTransportCapacity(0);
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

    const newItem = {
      type: activityType,
      price: activityPrice,
      capacity: activityCapacity,
      description: activityDescription,
    };

    setActivities([...activities, newItem]);
    setActivityType('');
    setActivityPrice('');
    setActivityCapacity(0);
    setActivityDescription('');
  }

  function removeActivityItem(index: number) {
    activities.splice(index, 1);

    setActivities([...activities]);
  }

  return (
    <Container>
      <Header />
      <Content>
        <Card icon="chevron-left">
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
                <ImageButton key={index}>
                  <Background
                    resizeMode="cover"
                    source={{
                      uri: item.uri,
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
              <FileInput onSelect={setImages}>
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
                  <ColumnGroup>
                    <FieldTitle>Tipo</FieldTitle>
                    <FieldValue>{item.type}</FieldValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <FieldTitle>Preço</FieldTitle>
                    <FieldValue>{item.price}</FieldValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <FieldTitle>Capacitdade</FieldTitle>
                    <FieldValue>{item.capacity}</FieldValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <FieldTitle>Descrição</FieldTitle>
                    <FieldValue>{item.description}</FieldValue>
                  </ColumnGroup>
                </DataContent>
              ))}
              <DataContent>
                <Input
                  label="Tipo"
                  placeholder="nome do tipo de transporte"
                  value={transportType}
                  ref={transportTypeRef}
                  onChange={setTransportType}
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
                  <ColumnGroup>
                    <FieldTitle>Tipo</FieldTitle>
                    <FieldValue>{item.type}</FieldValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <FieldTitle>Preço</FieldTitle>
                    <FieldValue>{item.price}</FieldValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <FieldTitle>Capacitdade</FieldTitle>
                    <FieldValue>{item.capacity}</FieldValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <FieldTitle>Descrição</FieldTitle>
                    <FieldValue>{item.description}</FieldValue>
                  </ColumnGroup>
                </DataContent>
              ))}
              <DataContent>
                <Input
                  label="Tipo"
                  placeholder="tipo de hospedagem"
                  value={lodgingType}
                  ref={lodgingTypeRef}
                  onChange={setLodgingType}
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
                  <ColumnGroup>
                    <FieldTitle>Tipo</FieldTitle>
                    <FieldValue>{item.type}</FieldValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <FieldTitle>Preço</FieldTitle>
                    <FieldValue>{item.price}</FieldValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <FieldTitle>Capacitdade</FieldTitle>
                    <FieldValue>{item.capacity}</FieldValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <FieldTitle>Descrição</FieldTitle>
                    <FieldValue>{item.description}</FieldValue>
                  </ColumnGroup>
                </DataContent>
              ))}
              <DataContent>
                <Input
                  label="Tipo"
                  placeholder="tipo de atividade"
                  value={activityType}
                  ref={activityTypeRef}
                  onChange={setActivityType}
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
            <SubmitButton>
              <SubmitButtonText>Salvar</SubmitButtonText>
            </SubmitButton>
          </CardActions>
        </Card>
      </Content>
    </Container>
  );
};

export default NewItinerary;
