import React, {useState, useRef, useMemo, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import {pt} from 'date-fns/locale';

import {formatBRL} from '../../lib/mask';
import {
  TransportProps,
  LodgingProps,
  ActivityProps,
  QuestionProps,
  MemberProps,
} from '../../utils/types';
import {
  deleteItineraryRequest,
  notifyItineraryFinishRequest,
} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  CardHeader,
  BackButton,
  EditButton,
  CardContent,
  RowGroup,
  RowGroupSpaced,
  ColumnGroup,
  HostContent,
  HostLabel,
  Label,
  Divider,
  HostButton,
  UserImage,
  HostDetails,
  RateStars,
  DataContentHeader,
  IconHolder,
  DeleteItineraryButton,
  DeleteItineraryButtonText,
  FinalizeItineraryButton,
  FinalizeItineraryButtonText,
  StatusContent,
  Status,
  StatusName,
} from './styles';
import Card from '../../components/Card';
import ImageCarousel from '../../components/ImageCarousel';
import ItineraryMember from '../../components/ItineraryMember';
import ItineraryQuestion from '../../components/ItineraryQuestion';
import Alert from '../../components/Alert';
import Page from '../../components/Page';
import Share from '../../components/Share';
import Text from '../../components/Text';
import {
  showMyItineraryGuide,
  hideMyItineraryGuide,
} from '../../store/modules/guides/actions';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
import ShadowBox from '../../components/ShadowBox';

interface MyItineraryDetailsProps {
  route: {
    params: {id: number};
  };
  navigation: any;
}

const myGuideImages = [
  {
    id: 1,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-edit-itinerary.png',
    withInfo: true,
    title: 'Editando Roteiro',
    message: 'Clique no ícone de lápis para editar informações do seu roteiro.',
    isAnimation: false,
  },
  {
    id: 2,
    url: 'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-finish-itinerary.png',
    withInfo: true,
    title: 'Finalizando Roteiros',
    message:
      'Após o término do seu roteiro clique em finalizar para que os membros avaliem.',
    isAnimation: false,
  },
];

const MyItineraryDetails: React.FC<MyItineraryDetailsProps> = ({
  route,
  navigation,
}) => {
  const {id} = route.params;
  const {itineraries} = useSelector(
    (state: RootStateProps) => state.itineraries,
  );
  const {myItineraryGuide} = useSelector(
    (state: RootStateProps) => state.guides,
  );
  const [alertVisible, setAlertVisible] = useState(false);
  const [finishAlertVisible, setFinishAlertVisible] = useState(false);
  const dispatch = useDispatch();

  const itinerary = useMemo(
    () => itineraries?.find((item: {id: number}) => item.id === id),
    [id, itineraries],
  );

  if (!itinerary) {
    navigation.goBack();
  }

  let beginDateFormated = useRef('');
  let endDateFormated = useRef('');
  let limitDateFormated = useRef('');

  useEffect(() => {
    dispatch(showMyItineraryGuide());
  }, [dispatch]);

  useMemo(() => {
    if (itinerary) {
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
    }
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
    dispatch(notifyItineraryFinishRequest(id));
  }

  const handleCloseMyGuide = () => {
    dispatch(hideMyItineraryGuide());
  };

  const renderTransports = useCallback(
    () =>
      itinerary?.transports.map((transport: TransportProps) => (
        <ShadowBox key={transport.id}>
          <Text.Paragraph textColor="primary" textWeight="bold">
            {transport.name}
          </Text.Paragraph>
          <Text textWeight="light">{transport.pivot?.description}</Text>
          <RowGroupSpaced>
            <ColumnGroup>
              <Text textWeight="light">Capacidade</Text>
              <Text textWeight="bold">{transport.pivot?.capacity}</Text>
            </ColumnGroup>
            <ColumnGroup>
              <Text textWeight="light">Preço</Text>
              <Text textWeight="bold">
                {formatBRL(String(transport.pivot?.price))}
              </Text>
            </ColumnGroup>
          </RowGroupSpaced>
        </ShadowBox>
      )),
    [itinerary],
  );

  const renderLodgings = useCallback(
    () =>
      itinerary?.lodgings.map((lodging: LodgingProps) => (
        <ShadowBox key={lodging.id}>
          <Text.Paragraph textColor="primary" textWeight="bold">
            {lodging.name}
          </Text.Paragraph>
          <Text textWeight="light">{lodging.pivot?.description}</Text>
          <RowGroupSpaced>
            <ColumnGroup>
              <Text textWeight="light">Capacidade</Text>
              <Text textWeight="bold">{lodging.pivot?.capacity}</Text>
            </ColumnGroup>
            <ColumnGroup>
              <Text textWeight="light">Preço</Text>
              <Text textWeight="bold">
                {formatBRL(String(lodging.pivot?.price))}
              </Text>
            </ColumnGroup>
          </RowGroupSpaced>
        </ShadowBox>
      )),
    [itinerary],
  );

  const renderActivities = useCallback(
    () =>
      itinerary?.activities.map((activity: ActivityProps) => (
        <ShadowBox key={activity.id}>
          <Text.Paragraph textColor="primary" textWeight="bold">
            {activity.name}
          </Text.Paragraph>
          <Text textWeight="light">{activity.pivot?.description}</Text>
          <RowGroupSpaced>
            <ColumnGroup>
              <Text textWeight="light">Capacidade</Text>
              <Text textWeight="bold">{activity.pivot?.capacity}</Text>
            </ColumnGroup>
            <ColumnGroup>
              <Text textWeight="light">Preço</Text>
              <Text textWeight="bold">
                {formatBRL(String(activity.pivot?.price))}
              </Text>
            </ColumnGroup>
          </RowGroupSpaced>
        </ShadowBox>
      )),
    [itinerary],
  );

  const renderMembers = useCallback(
    () =>
      itinerary?.members.map((member: MemberProps) => (
        <ItineraryMember member={member} key={member.id} owner />
      )),
    [itinerary],
  );

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Page showHeader={false}>
      {itinerary && (
        <Container>
          <Content>
            <Share
              data={{
                id: itinerary?.id,
                type: 'itinerary',
                componentType: 'connectionShareList',
              }}
            />
            <Card>
              <CardHeader>
                <BackButton onPress={goBack}>
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
                  <Text.Paragraph
                    textColor="primary"
                    textWeight="bold"
                    maxLines={1}>
                    {itinerary.name}
                  </Text.Paragraph>
                  <Text.Paragraph textColor="primary" textWeight="bold">
                    Vagas: {itinerary.capacity}
                  </Text.Paragraph>
                </RowGroupSpaced>
                <RowGroupSpaced>
                  <Text textWeight="light" maxLines={1}>
                    {itinerary.location}
                  </Text>
                  <Text textWeight="light" maxLines={1}>
                    {beginDateFormated.current}
                  </Text>
                </RowGroupSpaced>
                <StatusContent>
                  <Status>
                    <StatusName>{itinerary?.status.name}</StatusName>
                  </Status>
                </StatusContent>
                <ImageCarousel data={itinerary?.photos} />
                <View>
                  <Text.Paragraph textColor="primary" textWeight="bold">
                    Descrição:
                  </Text.Paragraph>
                  <Text textWeight="light">{itinerary.description}</Text>
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
                        uri: itinerary?.owner.person.file?.url || undefined,
                      }}
                      resizeMode="cover"
                    />
                    <HostDetails>
                      <Text textColor="primary" textWeight="bold" maxLines={1}>
                        {itinerary.owner.username}
                      </Text>
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
                <ShadowBox>
                  <DataContentHeader>
                    <Icon
                      name="calendar-blank-outline"
                      color="#4885FD"
                      size={24}
                    />
                    <Text.Paragraph textColor="primary" textWeight="bold">
                      Datas
                    </Text.Paragraph>
                  </DataContentHeader>
                  <RowGroupSpaced>
                    <Text textColor="primary" textWeight="bold">
                      Saida
                    </Text>
                    <Text textWeight="light">{beginDateFormated.current}</Text>
                  </RowGroupSpaced>
                  <RowGroupSpaced>
                    <Text textColor="primary" textWeight="bold">
                      Retorno
                    </Text>
                    <Text textWeight="light">{endDateFormated.current}</Text>
                  </RowGroupSpaced>
                  <RowGroupSpaced>
                    <Text textColor="primary" textWeight="bold">
                      Limite Incrição
                    </Text>
                    <Text textWeight="light">{limitDateFormated.current}</Text>
                  </RowGroupSpaced>
                </ShadowBox>
                <RowGroup>
                  <IconHolder>
                    <Icon name="car" color="#FFF" size={24} />
                  </IconHolder>
                  <Text.Title>Transporte</Text.Title>
                </RowGroup>
                {renderTransports()}
                <RowGroup>
                  <IconHolder>
                    <Icon name="bed" color="#FFF" size={24} />
                  </IconHolder>
                  <Text.Title>Hospedagem</Text.Title>
                </RowGroup>
                {renderLodgings()}
                <RowGroup>
                  <IconHolder>
                    <Icon name="lightning-bolt" color="#FFF" size={24} />
                  </IconHolder>
                  <Text.Title>Atividades</Text.Title>
                </RowGroup>
                {renderActivities()}
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
                  <Text.Title>Dúvidas e Comentários</Text.Title>
                </RowGroup>
              </CardHeader>
              <CardContent>
                {itinerary.questions.map((question: QuestionProps) => (
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
                  <Text.Title>Membros</Text.Title>
                </RowGroup>
              </CardHeader>
              <CardContent>{renderMembers()}</CardContent>
            </Card>
            <RowGroupSpaced>
              <FinalizeItineraryButton onPress={showFinishAlert}>
                <Icon name="progress-check" size={24} color="#FFF" />
                <FinalizeItineraryButtonText>
                  Finalizar Roteiro
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
        </Container>
      )}
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
        <GuideCarousel
          data={myGuideImages}
          onClose={() => handleCloseMyGuide()}
          key="guide-my-itinerary"
        />
      </Ads>
    </Page>
  );
};

export default MyItineraryDetails;
