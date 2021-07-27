import React, {useState, useRef, useMemo, useEffect} from 'react';
import {View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {format} from 'date-fns';
import {pt} from 'date-fns/locale';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {formatBRL} from '../../lib/mask';
import {
  ItineraryProps,
  TransportProps,
  LodgingProps,
  ActivityProps,
  QuestionProps,
  MemberProps,
} from '../../utils/types';
import {
  makeQuestionRequest,
  leaveItineraryRequest,
} from '../../store/modules/nextItineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import * as RootNavigation from '../../RootNavigation';

import {
  Container,
  Content,
  CardHeader,
  BackButton,
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
  SendButton,
  SendButtonText,
  StatusContent,
  Status,
  StatusName,
} from './styles';
import Card from '../../components/Card';
import ImageCarousel from '../../components/ImageCarousel';
import ItineraryMember from '../../components/ItineraryMember';
import ItineraryQuestion from '../../components/ItineraryQuestion';
import TextArea from '../../components/TextArea';
import Alert from '../../components/Alert';
import Share from '../../components/Share';
import Page from '../../components/Page';
import Text from '../../components/Text';
import ShadowBox from '../../components/ShadowBox';

const validationSchema = yup.object().shape({
  question: yup.string().required('campo obrigatório'),
});
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
  const {user} = useSelector((state: RootStateProps) => state.auth);
  const [alertVisible, setAlertVisible] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});

  const watchQuestion = watch('question');
  const beginDateFormated = useRef('');
  const endDateFormated = useRef('');
  const limitDateFormated = useRef('');

  const questionRef = useRef();
  const dispatch = useDispatch();

  const itinerary: ItineraryProps | any = useMemo(
    () =>
      itineraries &&
      itineraries?.find((item: ItineraryProps) => item.id === id),
    [id, itineraries],
  );

  const isMember = useMemo(
    () =>
      itinerary.members &&
      itinerary.members.find(
        (member: MemberProps) =>
          member.pivot.user_id === user.id && member.pivot.accepted === true,
      ),
    [itinerary, user.id],
  );

  useEffect(() => {
    register('question');
  }, [register]);

  useEffect(() => {
    if (!isMember) {
      RootNavigation.replace('FeedItineraryDetails', {id});
    }
  }, [id, isMember, navigation]);

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

  const handleMakeQuestion = (data: any) => {
    dispatch(makeQuestionRequest(itinerary.id, data.question));
    setValue('question', '');
  };

  function viewProfile(userId: number) {
    navigation.navigate('UserDetails', {
      userId,
    });
  }

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Page showHeader={false}>
      <Container>
        <Content>
          <Share
            data={{
              id: itinerary.id,
              type: 'itinerary',
              componentType: 'connectionShareList',
            }}
          />
          <Card>
            <CardHeader>
              <BackButton onPress={goBack}>
                <Icon name="chevron-left" size={24} color="#3dc77b" />
              </BackButton>
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
                  <StatusName>{itinerary.status.name}</StatusName>
                </Status>
              </StatusContent>
              <ImageCarousel data={itinerary.photos} />
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
                <HostButton onPress={() => viewProfile(itinerary.owner.id)}>
                  <UserImage
                    source={{
                      uri: itinerary.owner.person.file?.url || undefined,
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
              {itinerary.transports.map((transport: TransportProps) => (
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
              ))}
              <RowGroup>
                <IconHolder>
                  <Icon name="bed" color="#FFF" size={24} />
                </IconHolder>
                <Text.Title>Hospedagem</Text.Title>
              </RowGroup>
              {itinerary.lodgings.map((lodging: LodgingProps) => (
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
              ))}
              <RowGroup>
                <IconHolder>
                  <Icon name="lightning-bolt" color="#FFF" size={24} />
                </IconHolder>
                <Text.Title>Atividades</Text.Title>
              </RowGroup>
              {itinerary.activities.map((activity: ActivityProps) => (
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
                <Text.Title>Dúvidas e Comentários</Text.Title>
              </RowGroup>
            </CardHeader>
            <CardContent>
              {itinerary.questions.map((questionItem: QuestionProps) => (
                <ItineraryQuestion
                  question={questionItem}
                  key={questionItem.id}
                />
              ))}
              <>
                <TextArea
                  placeholder="faça uma pergunta..."
                  value={watchQuestion}
                  ref={questionRef}
                  onChange={(value: string) => setValue('question', value)}
                  error={errors.question?.message}
                />
                <SendButton onPress={handleSubmit(handleMakeQuestion)}>
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
                <Text.Title>Membros</Text.Title>
              </RowGroup>
            </CardHeader>
            <CardContent>
              {itinerary.members.map(
                (member: MemberProps) =>
                  member.pivot.accepted && (
                    <ItineraryMember member={member} key={member.id} />
                  ),
              )}
            </CardContent>
          </Card>
          <DeleteItineraryButton onPress={showAlert}>
            <Icon name="delete-forever-outline" size={24} color="#FFF" />
            <DeleteItineraryButtonText>
              Sair do Roteiro
            </DeleteItineraryButtonText>
          </DeleteItineraryButton>
        </Content>
      </Container>
      <Alert
        title="Ops!"
        message="você deseja realmente sair deste roteiro?"
        visible={alertVisible}
        onCancel={hideAlert}
        onRequestClose={hideAlert}
        onConfirm={() => handleLeaveItinerary()}
      />
    </Page>
  );
};

export default NextItineraryDetails;
