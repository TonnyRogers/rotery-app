/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useMemo, useEffect, useCallback} from 'react';
import {View, ScrollView, Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {formatBRL} from '../../lib/mask';
import {
  ItineraryProps,
  QuestionProps,
  MemberProps,
  ItineraryActivityItemProps,
  ItineraryLodgingItemProps,
  ItineraryTransportItemProps,
} from '../../utils/types';
import {
  makeQuestionRequest,
  joinRequest,
} from '../../store/modules/feed/actions';
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
  SendButton,
  SendButtonText,
  JoinButton,
  JoinButtonText,
  StatusContent,
  Status,
  StatusName,
  ItemsContent,
} from './styles';
import Card from '../../components/Card';
import ImageCarousel from '../../components/ImageCarousel';
import ItineraryMember from '../../components/ItineraryMember';
import ItineraryQuestion from '../../components/ItineraryQuestion';
import TextArea from '../../components/TextArea';
import Share from '../../components/Share';
import Text from '../../components/Text';
import ShadowBox from '../../components/ShadowBox';
import SplashScreen from '../../components/SplashScreen';
import formatLocale from '../../providers/dayjs-format-locale';

const validationSchema = yup.object().shape({
  question: yup.string().required('campo obrigatório'),
});
interface DynamicFeedItineraryDetailsProps {
  itinerary: ItineraryProps;
}

const DynamicFeedItineraryDetails: React.FC<DynamicFeedItineraryDetailsProps> =
  ({itinerary}) => {
    const {user} = useSelector((state: RootStateProps) => state.auth);
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
    const questionRef = useRef<any>();
    const dispatch = useDispatch();

    const isMember = useMemo(
      () =>
        itinerary?.members &&
        itinerary.members.find((member: MemberProps) => member.id === user?.id),
      [itinerary, user],
    );

    useEffect(() => {
      register('question');
    }, [register]);

    useEffect(() => {
      if (isMember && isMember.isAccepted === true) {
        RootNavigation.replace('NextItineraryDetails', {id: itinerary.id});
      }
    }, [itinerary.id, isMember]);

    useMemo(() => {
      beginDateFormated.current = formatLocale(
        itinerary?.begin,
        ' DD MMM YYYY H:mm',
      );
      endDateFormated.current = formatLocale(
        itinerary?.end,
        ' DD MMM YYYY H:mm',
      );
      limitDateFormated.current = formatLocale(
        itinerary?.deadlineForJoin,
        ' DD MMM YYYY H:mm',
      );
    }, [itinerary]);

    const handleMakeQuestion = (data: any) => {
      if (itinerary) {
        dispatch(makeQuestionRequest(itinerary?.id, data.question));
        setValue('question', '');
      }
    };

    function handleJoinItinerary() {
      dispatch(joinRequest(itinerary.id));
    }

    function viewProfile(userId: number) {
      RootNavigation.navigate('UserDetails', {
        userId,
      });
    }

    const renderTransports = useCallback(
      () =>
        itinerary?.transports.map((transport: ItineraryTransportItemProps) => (
          <ShadowBox key={transport.id}>
            <Text.Paragraph textColor="primary" textWeight="bold">
              {transport.transport.name}
            </Text.Paragraph>
            <Text textWeight="light">{transport.description}</Text>
            <RowGroupSpaced>
              <ColumnGroup>
                <Text textWeight="light">Capacidade</Text>
                <Text textWeight="bold">{transport.capacity}</Text>
              </ColumnGroup>
              <ColumnGroup>
                <Text textWeight="light">Preço</Text>
                <Text textWeight="bold">
                  {formatBRL(String(transport.price))}
                </Text>
              </ColumnGroup>
            </RowGroupSpaced>
          </ShadowBox>
        )),
      [itinerary],
    );

    const renderLodgings = useCallback(
      () =>
        itinerary?.lodgings.map((lodging: ItineraryLodgingItemProps) => (
          <ShadowBox key={lodging.id}>
            <Text.Paragraph textColor="primary" textWeight="bold">
              {lodging.lodging.name}
            </Text.Paragraph>
            <Text textWeight="light">{lodging.description}</Text>
            <RowGroupSpaced>
              <ColumnGroup>
                <Text textWeight="light">Capacidade</Text>
                <Text textWeight="bold">{lodging.capacity}</Text>
              </ColumnGroup>
              <ColumnGroup>
                <Text textWeight="light">Preço</Text>
                <Text textWeight="bold">
                  {formatBRL(String(lodging.price))}
                </Text>
              </ColumnGroup>
            </RowGroupSpaced>
          </ShadowBox>
        )),
      [itinerary],
    );

    const renderActivities = useCallback(
      () =>
        itinerary?.activities.map((activity: ItineraryActivityItemProps) => (
          <ShadowBox key={activity.id}>
            <Text.Paragraph textColor="primary" textWeight="bold">
              {activity.activity.name}
            </Text.Paragraph>
            <Text textWeight="light">{activity.description}</Text>
            <RowGroupSpaced>
              <ColumnGroup>
                <Text textWeight="light">Capacidade</Text>
                <Text textWeight="bold">{activity.capacity}</Text>
              </ColumnGroup>
              <ColumnGroup>
                <Text textWeight="light">Preço</Text>
                <Text textWeight="bold">
                  {formatBRL(String(activity.price))}
                </Text>
              </ColumnGroup>
            </RowGroupSpaced>
          </ShadowBox>
        )),
      [itinerary],
    );

    const renderMembers = useCallback(
      () =>
        itinerary?.members.map(
          (member: MemberProps) =>
            member.isAccepted && (
              <ItineraryMember
                member={member}
                key={member.id}
                itinerary={itinerary}
              />
            ),
        ),
      [itinerary],
    );

    const renderQuestions = useCallback(
      () =>
        itinerary?.questions.map((questionItem: QuestionProps) => (
          <ItineraryQuestion
            question={questionItem}
            key={questionItem.id}
            itinerary={itinerary}
          />
        )),
      [itinerary],
    );

    function goBack() {
      RootNavigation.goBack();
    }

    if (!itinerary) {
      return null;
    }

    return (
      <>
        <Share
          data={{
            id: itinerary?.id,
            type: 'itinerary',
            componentType: 'connectionShareList',
            ownerId: itinerary?.owner.id,
          }}
        />
        <Container>
          <Content
            renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
            shouldRasterizeIOS={!!(Platform.OS === 'ios')}
            scrollEventThrottle={16}
            nestedScrollEnabled
            decelerationRate="normal">
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
                  <Text limitter={19} textWeight="light" maxLines={1}>
                    {itinerary.location}
                  </Text>
                </RowGroupSpaced>
                <StatusContent>
                  <Status>
                    <StatusName>{itinerary?.status}</StatusName>
                  </Status>
                </StatusContent>
                <ImageCarousel data={itinerary?.photos} />
                <View>
                  <Text.Paragraph textColor="primary" textWeight="bold">
                    Descrição:
                  </Text.Paragraph>
                  <Text textWeight="light">{itinerary?.description}</Text>
                </View>
                <HostContent>
                  <HostLabel>
                    <Icon name="compass-outline" size={24} color="#3dc77b" />
                    <Label>Host</Label>
                  </HostLabel>
                  <Divider />
                  <HostButton onPress={() => viewProfile(itinerary?.owner.id)}>
                    <UserImage
                      source={{
                        uri: itinerary?.owner.profile.file?.url,
                      }}
                      resizeMode="cover"
                    />
                    <HostDetails>
                      <Text textColor="primary" textWeight="bold" maxLines={1}>
                        {itinerary?.owner.username}
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
                      Limite Inscrição
                    </Text>
                    <Text textWeight="light">{limitDateFormated.current}</Text>
                  </RowGroupSpaced>
                </ShadowBox>
                <ItemsContent>
                  <IconHolder>
                    <Icon name="car" color="#FFF" size={24} />
                  </IconHolder>
                  <Text.Title>Transporte</Text.Title>
                </ItemsContent>
                <ScrollView
                  renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
                  scrollEventThrottle={16}
                  contentContainerStyle={{padding: 1}}>
                  {renderTransports()}
                </ScrollView>
                <ItemsContent>
                  <IconHolder>
                    <Icon name="bed" color="#FFF" size={24} />
                  </IconHolder>
                  <Text.Title>Hospedagem</Text.Title>
                </ItemsContent>
                <ScrollView
                  renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
                  scrollEventThrottle={16}
                  contentContainerStyle={{padding: 1}}>
                  {renderLodgings()}
                </ScrollView>
                <ItemsContent>
                  <IconHolder>
                    <Icon name="lightning-bolt" color="#FFF" size={24} />
                  </IconHolder>
                  <Text.Title>Atividades</Text.Title>
                </ItemsContent>
                <ScrollView
                  renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
                  scrollEventThrottle={16}
                  contentContainerStyle={{padding: 1}}>
                  {renderActivities()}
                </ScrollView>

                {!isMember && (
                  <JoinButton onPress={handleJoinItinerary}>
                    <Icon name="location-enter" size={24} color="#FFF" />
                    <JoinButtonText>Participar</JoinButtonText>
                  </JoinButton>
                )}
                {isMember && isMember.isAccepted === false && (
                  <JoinButton>
                    <Icon name="location-enter" size={24} color="#FFF" />
                    <JoinButtonText>Aguardando</JoinButtonText>
                  </JoinButton>
                )}
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
              <ScrollView
                renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
                scrollEventThrottle={16}
                contentContainerStyle={{padding: 1}}>
                {renderQuestions()}
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
              </ScrollView>
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
              <ScrollView
                renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
                scrollEventThrottle={16}
                contentContainerStyle={{padding: 1}}>
                {renderMembers()}
              </ScrollView>
            </Card>
          </Content>
        </Container>
        <SplashScreen visible={false} />
      </>
    );
  };

export default DynamicFeedItineraryDetails;
