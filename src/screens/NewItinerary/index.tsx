import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
} from './styles';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Card from '../../components/Card';
import TextArea from '../../components/TextArea';
import DateTimeInput from '../../components/DateTimeInput';

const images = [
  {
    id: 1,
    url:
      'https://images.theconversation.com/files/271799/original/file-20190430-136810-1mceagq.jpg',
    name: 'file',
    size: '2mb',
  },
  {
    id: 2,
    url:
      'https://s29081.pcdn.co/wp-content/uploads/2017/10/untitled-0183.jpg.optimal.jpg',
    name: 'file',
    size: '2mb',
  },
  {
    id: 3,
    url: 'https://thirdeyetraveller.com/wp-content/uploads/2017/12/slider1.jpg',
    name: 'file',
    size: '2mb',
  },
  {
    id: 4,
    url: '...',
    name: 'file',
    size: '2mb',
    isEmpty: true,
  },
];

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
  const [transportDescription, setTransportDescription] = useState('');

  const descriptionRef = useRef();
  const nameRef = useRef();
  const locationRef = useRef();
  const locationDescriptionRef = useRef();
  const vacanciesRef = useRef();
  const transportTypeRef = useRef();
  const transportPriceRef = useRef();
  const transportDescriptionRef = useRef();

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
            <ImageList
              data={images}
              keyExtractor={(item: {id: number}) => item.id}
              numColumns={3}
              renderItem={({item}) => (
                <ImageButton>
                  <Background
                    resizeMode="cover"
                    source={{
                      uri: item.url,
                    }}
                  />
                  <BackgroundCover empty={item.isEmpty}>
                    <SIcon
                      name={
                        item.isEmpty ? 'image-plus' : 'delete-forever-outline'
                      }
                      color={item.isEmpty ? '#D9D8D8' : '#F57373'}
                      size={30}
                    />
                  </BackgroundCover>
                </ImageButton>
              )}
            />
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
              <TextArea
                label="Descrição"
                placeholder="infomações adicionais.."
                value={transportDescription}
                ref={transportDescriptionRef}
                onChange={setTransportDescription}
              />
            </DataContent>
            <AddTransportButton>
              <Icon name="plus-box-outline" color="#3dc77b" size={30} />
            </AddTransportButton>
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
