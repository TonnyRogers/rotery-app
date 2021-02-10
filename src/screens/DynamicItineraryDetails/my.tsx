import React, {useState, useRef, useMemo} from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import {pt} from 'date-fns/locale';
import {useNavigation} from '@react-navigation/native';

import {formatBRL} from '../../lib/mask';
import {ItineraryProps} from '../../store/modules/itineraries/reducer';
import {
  deleteItineraryRequest,
  notifyItineraryFinishRequest,
} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {hideMyItineraryGuide} from '../../store/modules/guides/actions';

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
  FinalizeItineraryButton,
  FinalizeItineraryButtonText,
  StatusContent,
  Status,
  StatusName,
} from './styles';
import Header from '../../components/Header';
import Card from '../../components/Card';
import ImageCarousel from '../../components/ImageCarousel';
import ItineraryMember from '../../components/ItineraryMember';
import ItineraryQuestion from '../../components/ItineraryQuestion';
import Alert from '../../components/Alert';
import GuideCarousel from '../../components/GuideCarousel';
import Ads from '../../components/Ads';

const guideImages = [
  {
    id: 1,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-edit-itinerary.png',
    withInfo: true,
    title: 'Editando Roteiro',
    message: 'Clique no ícone de lápis para editar informações do seu roteiro.',
    isAnimation: false,
  },
  {
    id: 2,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-finish-itinerary.png',
    withInfo: true,
    title: 'Finalizando Roteiros',
    message:
      'Após o término do seu roteiro clique em finalizar para que os membros avaliem.',
    isAnimation: false,
  },
];

interface MyItineraryDetailsProps {
  itinerary: ItineraryProps;
}

const MyItineraryDetail: React.FC<MyItineraryDetailsProps> = ({itinerary}) => {
  const {myItineraryGuide} = useSelector(
    (state: RootStateProps) => state.guides,
  );
  const [alertVisible, setAlertVisible] = useState(false);
  const [finishAlertVisible, setFinishAlertVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let beginDateFormated = useRef('');
  let endDateFormated = useRef('');
  let limitDateFormated = useRef('');

  useMemo(() => {
    beginDateFormated.current = format(
      new Date(itinerary.begin),
      ' dd MMM yyyy H:mm',
      {
        locale: pt,
      },
    );
    endDateFormated.current = format(
      new Date(itinerary.end),
      ' dd MMM yyyy H:mm',
      {
        locale: pt,
      },
    );
    limitDateFormated.current = format(
      new Date(itinerary.deadline_for_join),
      ' dd MMM yyyy H:mm',
      {locale: pt},
    );
  }, [itinerary]);

  function showDeleteAlert() {
    setAlertVisible(true);
  }

  function hideDeleteAlert() {
    setAlertVisible(false);
  }

  function handleDeleteItinerary() {
    dispatch(deleteItineraryRequest(itinerary.id));
  }

  function showFinishAlert() {
    setFinishAlertVisible(true);
  }

  function handleFinishItinerary() {
    dispatch(notifyItineraryFinishRequest(itinerary.id));
  }

  function closeGuide() {
    dispatch(hideMyItineraryGuide());
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1, justifyContent: 'center'}}>
      <Container>
        <Header />
        <Content>
          <Card>
            <CardHeader>
              <BackButton onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={24} color="#3dc77b" />
              </BackButton>
              <EditButton
                onPress={() =>
                  navigation.navigate('EditItinerary', {id: itinerary.id})
                }>
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
                <DateBegin>{beginDateFormated.current}</DateBegin>
              </RowGroupSpaced>
              <StatusContent>
                <Status>
                  <StatusName>{itinerary.status.name}</StatusName>
                </Status>
              </StatusContent>
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
                  <Icon
                    name="calendar-blank-outline"
                    color="#4885FD"
                    size={24}
                  />
                  <ContentTitle>Datas</ContentTitle>
                </DataContentHeader>
                <RowGroupSpaced>
                  <Name>Saida</Name>
                  <Value>{beginDateFormated.current}</Value>
                </RowGroupSpaced>
                <RowGroupSpaced>
                  <Name>Retorno</Name>
                  <Value>{endDateFormated.current}</Value>
                </RowGroupSpaced>
                <RowGroupSpaced>
                  <Name>Limite Incrição</Name>
                  <Value>{limitDateFormated.current}</Value>
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
                  <DataDescription>
                    {transport.pivot.description}
                  </DataDescription>
                  <RowGroupSpaced>
                    <ColumnGroup>
                      <DataPriceLabel>Capacidade</DataPriceLabel>
                      <DataPriceValue>
                        {transport.pivot.capacity}
                      </DataPriceValue>
                    </ColumnGroup>
                    <ColumnGroup>
                      <DataPriceLabel>Preço</DataPriceLabel>
                      <DataPriceValue>
                        {formatBRL(String(transport.pivot.price))}
                      </DataPriceValue>
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
                      <DataPriceValue>
                        {formatBRL(String(lodging.pivot.price))}
                      </DataPriceValue>
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
                  <DataDescription>
                    {activity.pivot.description}
                  </DataDescription>
                  <RowGroupSpaced>
                    <ColumnGroup>
                      <DataPriceLabel>Capacidade</DataPriceLabel>
                      <DataPriceValue>{activity.pivot.capacity}</DataPriceValue>
                    </ColumnGroup>
                    <ColumnGroup>
                      <DataPriceLabel>Preço</DataPriceLabel>
                      <DataPriceValue>
                        {formatBRL(String(activity.pivot.price))}
                      </DataPriceValue>
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
                <ItineraryQuestion
                  question={question}
                  key={question.id}
                  owner
                />
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
                <ItineraryMember member={member} key={member.id} owner />
              ))}
            </CardContent>
          </Card>
          <RowGroupSpaced>
            <FinalizeItineraryButton onPress={showFinishAlert}>
              <Icon name="progress-check" size={24} color="#FFF" />
              <FinalizeItineraryButtonText>
                Finalizer Roteiro
              </FinalizeItineraryButtonText>
            </FinalizeItineraryButton>
            <DeleteItineraryButton onPress={showDeleteAlert}>
              <Icon name="delete-forever-outline" size={24} color="#FFF" />
              <DeleteItineraryButtonText>
                Excluir Roteiro
              </DeleteItineraryButtonText>
            </DeleteItineraryButton>
          </RowGroupSpaced>
        </Content>
        <Alert
          title="Fim do Roteiro!"
          message="Vode deseja realmente encerrar este roteiro?"
          icon="progress-check"
          visible={finishAlertVisible}
          onCancel={hideDeleteAlert}
          onRequestClose={(value) => setFinishAlertVisible(value)}
          onConfirm={handleFinishItinerary}
        />
        <Alert
          title="Ops!"
          message="você deseja realmente excluir este roteiro?"
          icon="delete-forever-outline"
          visible={alertVisible}
          onCancel={hideDeleteAlert}
          onRequestClose={(value) => setAlertVisible(value)}
          onConfirm={handleDeleteItinerary}
        />
        <Ads visible={myItineraryGuide} onRequestClose={() => {}}>
          <GuideCarousel data={guideImages} onClose={() => closeGuide()} />
        </Ads>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default MyItineraryDetail;
