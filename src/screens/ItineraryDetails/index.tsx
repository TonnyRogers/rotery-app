import React, {useState} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationProp} from '@react-navigation/native';

import {ItineraryProps} from '../../store/modules/itineraries/reducer';
import {deleteItineraryRequest} from '../../store/modules/itineraries/actions';

import {
  Container,
  Content,
  CardHeader,
  BackButton,
  EditButton,
  CardContent,
  Name,
  RowGroup,
  RowGroupSpaced,
  ColumnGroup,
  Location,
  DateBegin,
  DescriptionTitle,
  Description,
  HostContent,
  HostLabel,
  Label,
  Divider,
  HostButton,
  UserImage,
  HostDetails,
  RateStars,
  DataContent,
  DataContentHeader,
  ContentTitle,
  Value,
  IconHolder,
  DataName,
  DataDescription,
  DataPriceLabel,
  DataPriceValue,
  DeleteItineraryButton,
  DeleteItineraryButtonText,
} from './styles';
import Header from '../../components/Header';
import Card from '../../components/Card';
import ImageCarousel from '../../components/ImageCarousel';
import ItineraryMember from '../../components/ItineraryMember';
import ItineraryQuestion from '../../components/ItineraryQuestion';
import Alert from '../../components/Alert';

interface ItineraryDetailsProps {
  route: {
    params: {id: number};
  };
  navigation: NavigationProp;
}

const ItineraryDetails: React.FC<ItineraryDetailsProps> = ({
  route,
  navigation,
}) => {
  const {id} = route.params;
  const {itineraries} = useSelector((state) => state.itineraries);
  const [alertVisible, setAlertVisible] = useState(false);
  const dispatch = useDispatch();

  const itinerary: ItineraryProps = itineraries.find(
    (item: ItineraryProps) => item.id === id,
  );

  function showAlert() {
    setAlertVisible(true);
  }

  function hideAlert() {
    setAlertVisible(false);
  }

  function handleDeleteItinerary() {
    dispatch(deleteItineraryRequest(itinerary.id));
    navigation.goBack();
  }

  return (
    <Container>
      <Header />
      <Content>
        <Card>
          <CardHeader>
            <BackButton onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </BackButton>
            <EditButton>
              <Icon name="pencil-outline" size={24} color="#4885FD" />
            </EditButton>
          </CardHeader>
          <CardContent>
            <RowGroupSpaced>
              <Name>{itinerary.name}</Name>
              <Name>Vagas: {itinerary.capacity}</Name>
            </RowGroupSpaced>
            <RowGroupSpaced>
              <Location>{itinerary.location}</Location>
              <DateBegin>{itinerary.begin}</DateBegin>
            </RowGroupSpaced>
            <ImageCarousel data={itinerary.photos} />
            <View>
              <DescriptionTitle>Descrição:</DescriptionTitle>
              <Description>{itinerary.description}</Description>
            </View>
            <HostContent>
              <HostLabel>
                <Icon name="compass-outline" size={24} color="#3dc77b" />
                <Label>Host</Label>
              </HostLabel>
              <Divider />
              <HostButton>
                <UserImage
                  source={{
                    uri: itinerary.owner.person.file?.url || '..',
                  }}
                  resizeMode="cover"
                />
                <HostDetails>
                  <Name>{itinerary.owner.username}</Name>
                  <RateStars>
                    <Icon name="star" size={24} color="#3dc77b" />
                    <Icon name="star" size={24} color="#3dc77b" />
                    <Icon name="star" size={24} color="#3dc77b" />
                    <Icon name="star" size={24} color="#3dc77b" />
                    <Icon name="star-outline" size={24} color="#000" />
                  </RateStars>
                </HostDetails>
              </HostButton>
            </HostContent>
            <DataContent>
              <DataContentHeader>
                <Icon name="calendar-blank-outline" color="#4885FD" size={24} />
                <ContentTitle>Datas</ContentTitle>
              </DataContentHeader>
              <RowGroupSpaced>
                <Name>Saida</Name>
                <Value>{itinerary.begin}</Value>
              </RowGroupSpaced>
              <RowGroupSpaced>
                <Name>Retorno</Name>
                <Value>{itinerary.end}</Value>
              </RowGroupSpaced>
              <RowGroupSpaced>
                <Name>Limite Incrição</Name>
                <Value>{itinerary.deadline_for_join}</Value>
              </RowGroupSpaced>
            </DataContent>
            <RowGroup>
              <IconHolder>
                <Icon name="car" color="#FFF" size={24} />
              </IconHolder>
              <ContentTitle>Transporte</ContentTitle>
            </RowGroup>
            {itinerary.transports.map((transport) => (
              <DataContent key={transport.id}>
                <DataName>{transport.name}</DataName>
                <DataDescription>{transport.pivot.description}</DataDescription>
                <RowGroupSpaced>
                  <ColumnGroup>
                    <DataPriceLabel>Capacidade</DataPriceLabel>
                    <DataPriceValue>{transport.pivot.capacity}</DataPriceValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <DataPriceLabel>Preço</DataPriceLabel>
                    <DataPriceValue>{transport.pivot.price}</DataPriceValue>
                  </ColumnGroup>
                </RowGroupSpaced>
              </DataContent>
            ))}
            <RowGroup>
              <IconHolder>
                <Icon name="bed" color="#FFF" size={24} />
              </IconHolder>
              <ContentTitle>Hospedagem</ContentTitle>
            </RowGroup>
            {itinerary.lodgings.map((lodging) => (
              <DataContent key={lodging.id}>
                <DataName>{lodging.name}</DataName>
                <DataDescription>{lodging.pivot.description}</DataDescription>
                <RowGroupSpaced>
                  <ColumnGroup>
                    <DataPriceLabel>Capacidade</DataPriceLabel>
                    <DataPriceValue>{lodging.pivot.capacity}</DataPriceValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <DataPriceLabel>Preço</DataPriceLabel>
                    <DataPriceValue>{lodging.pivot.price}</DataPriceValue>
                  </ColumnGroup>
                </RowGroupSpaced>
              </DataContent>
            ))}
            <RowGroup>
              <IconHolder>
                <Icon name="lightning-bolt" color="#FFF" size={24} />
              </IconHolder>
              <ContentTitle>Atividades</ContentTitle>
            </RowGroup>
            {itinerary.activities.map((activity) => (
              <DataContent key={activity.id}>
                <DataName>{activity.name}</DataName>
                <DataDescription>{activity.pivot.description}</DataDescription>
                <RowGroupSpaced>
                  <ColumnGroup>
                    <DataPriceLabel>Capacidade</DataPriceLabel>
                    <DataPriceValue>{activity.pivot.capacity}</DataPriceValue>
                  </ColumnGroup>
                  <ColumnGroup>
                    <DataPriceLabel>Preço</DataPriceLabel>
                    <DataPriceValue>{activity.pivot.price}</DataPriceValue>
                  </ColumnGroup>
                </RowGroupSpaced>
              </DataContent>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <RowGroup>
              <IconHolder>
                <Icon
                  name="frequently-asked-questions"
                  color="#FFF"
                  size={24}
                />
              </IconHolder>
              <ContentTitle>Dúvidas e Comentários</ContentTitle>
            </RowGroup>
          </CardHeader>
          <CardContent>
            {itinerary.questions.map((question) => (
              <ItineraryQuestion question={question} key={question.id} />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <RowGroup>
              <IconHolder>
                <Icon name="account-check-outline" color="#FFF" size={24} />
              </IconHolder>
              <ContentTitle>Membros</ContentTitle>
            </RowGroup>
          </CardHeader>
          <CardContent>
            {itinerary.members.map((member) => (
              <ItineraryMember member={member} key={member.id} />
            ))}
          </CardContent>
        </Card>
        <DeleteItineraryButton onPress={showAlert}>
          <Icon name="delete-forever-outline" size={24} color="#FFF" />
          <DeleteItineraryButtonText>Excluir Roteiro</DeleteItineraryButtonText>
        </DeleteItineraryButton>
      </Content>
      <Alert
        title="Ops!"
        message="você deseja realmente excluir este roteiro?"
        visible={alertVisible}
        onCancel={hideAlert}
        onRequestClose={hideAlert}
        onConfirm={handleDeleteItinerary}
      />
    </Container>
  );
};

export default ItineraryDetails;
