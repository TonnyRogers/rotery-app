import React, {useState, useRef, useMemo} from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import {pt} from 'date-fns/locale';

import {formatBRL} from '../../lib/mask';
import {ItineraryProps} from '../../utils/types';
import {
  makeQuestionRequest,
  leaveItineraryRequest,
} from '../../store/modules/nextItineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  CardHeader,
  BackButton,
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
  SendButton,
  SendButtonText,
  StatusContent,
  Status,
  StatusName,
} from './styles';
import Header from '../../components/Header';
import Card from '../../components/Card';
import ImageCarousel from '../../components/ImageCarousel';
import ItineraryMember from '../../components/ItineraryMember';
import ItineraryQuestion from '../../components/ItineraryQuestion';
import TextArea from '../../components/TextArea';
import Alert from '../../components/Alert';

interface ItineraryDetailsProps {
  route: {
    params: {id: number};
  };
  navigation: any;
}

const NextItineraryDetails: React.FC<ItineraryDetailsProps> = ({
  route,
  navigation,
}) => {
  const {id} = route.params;
  const {itineraries} = useSelector(
    (state: RootStateProps) => state.nextItineraries,
  );
  const [alertVisible, setAlertVisible] = useState(false);
  const [question, setQuestion] = useState('');

  const questionRef = useRef();
  const dispatch = useDispatch();

  const itinerary: ItineraryProps = itineraries?.find(
    (item: ItineraryProps) => item.id === id,
  );

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

  function showAlert() {
    setAlertVisible(true);
  }

  function hideAlert() {
    setAlertVisible(false);
  }

  function handleLeaveItinerary() {
    dispatch(leaveItineraryRequest(itinerary.id));
  }

  function handleMakeQuestion() {
    dispatch(makeQuestionRequest(itinerary.id, question));
    setQuestion('');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1, justifyContent: 'center'}}>
      <Container>
        <Content>
          <Card>
            <CardHeader>
              <BackButton onPress={() => navigation.goBack()}>
                <Icon name="chevron-left" size={24} color="#3dc77b" />
              </BackButton>
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
                      uri: itinerary.owner.person.file?.url || undefined,
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
              {itinerary.questions.map((questionItem) => (
                <ItineraryQuestion
                  question={questionItem}
                  key={questionItem.id}
                />
              ))}
              <>
                <TextArea
                  placeholder="faça uma pergunta..."
                  value={question}
                  ref={questionRef}
                  onChange={setQuestion}
                />
                <SendButton onPress={handleMakeQuestion}>
                  <Icon name="send-outline" size={24} color="#FFF" />
                  <SendButtonText>Perguntar</SendButtonText>
                </SendButton>
              </>
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
            <DeleteItineraryButtonText>
              Sair do Roteiro
            </DeleteItineraryButtonText>
          </DeleteItineraryButton>
        </Content>
        <Alert
          title="Ops!"
          message="você deseja realmente sair deste roteiro?"
          visible={alertVisible}
          onCancel={hideAlert}
          onRequestClose={hideAlert}
          onConfirm={() => handleLeaveItinerary()}
        />
      </Container>
    </KeyboardAvoidingView>
  );
};

export default NextItineraryDetails;
