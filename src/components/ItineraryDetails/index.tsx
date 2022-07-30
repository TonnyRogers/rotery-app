import React, {useMemo, useCallback, useRef, useEffect} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationProp} from '@react-navigation/native';
import * as yup from 'yup';

import {formatBRL} from '../../lib/mask';
import formatLocale from '../../providers/dayjs-format-locale';
import {
  ItineraryProps,
  ItineraryStatusTranlated,
  ItineraryTransportItemProps,
  ItineraryLodgingItemProps,
  ItineraryActivityItemProps,
  MemberProps,
  QuestionProps,
  FeedItineraryProps,
  UserProps,
} from '../../utils/types';
import * as RootNavigation from '../../RootNavigation';

import {
  Container,
  CardContent,
  CardHeader,
  RowGroupSpaced,
  Status,
  StatusContent,
  StatusName,
  HostButton,
  HostContent,
  HostDetails,
  HostLabel,
  UserImage,
  Label,
  Divider,
  IconHolder,
  RowGroup,
  DataContentHeader,
  ItemsContent,
  ColumnGroup,
  BackButton,
  JoinButton,
  JoinButtonText,
  SendButton,
  SendButtonText,
  DeleteItineraryButton,
  DeleteItineraryButtonText,
  FinalizeItineraryButton,
  FinalizeItineraryButtonText,
  EditButton,
} from './styles';
import StarRate from '../StarRate';
import ImageCarousel from '../ImageCarousel';
import Card from '../Card';
import Text from '../Text';
import ShadowBox from '../ShadowBox';
import ItineraryMember from '../ItineraryMember';
import ItineraryQuestion from '../ItineraryQuestion';
import {CheckoutRouteParamsProps} from '../../screens/Checkout';
import Toast from 'react-native-toast-message';
import isOpen from '../../guards/itineraryStatus';
import TextArea from '../TextArea';
import {useForm} from 'react-hook-form';
import {YupValidationMessages} from '../../utils/enums';
import {yupResolver} from '@hookform/resolvers/yup';

interface OnMakeQuestionParams {
  itineraryId: number;
  text: string;
}

interface ItineraryDetailsProps {
  itinerary: ItineraryProps | FeedItineraryProps;
  navigation: NavigationProp<Record<string, object | undefined>>;
  user?: UserProps | null;
  isOwner: boolean;
  isMember?: MemberProps;
  onJoinSuccess?: (id: number) => void;
  onMakeQuestion?: ({itineraryId, text}: OnMakeQuestionParams) => void;
  /**
   * ONLY for members
   */
  onShowLeaveAlert?: () => void;
  /**
   * ONLY for owners
   */
  onShowFinishAlert?: () => void;
  /**
   * ONLY for owners
   */
  onShowDeleteAlert?: () => void;
}

const validationSchema = yup.object().shape({
  question: yup.string().required(YupValidationMessages.REQUIRED),
});

const ItineraryDetails = ({
  itinerary,
  navigation,
  user,
  isOwner,
  isMember,
  onJoinSuccess,
  onMakeQuestion,
  onShowLeaveAlert,
  onShowDeleteAlert,
  onShowFinishAlert,
}: ItineraryDetailsProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});

  const watchQuestion = watch('question');

  const questionRef = useRef<any>();

  useEffect(() => {
    register('question');
  }, [register]);

  const {beginDate, endDate, limitDate} = useMemo(() => {
    const beginDateFormated = formatLocale(
      String(itinerary?.begin),
      ' DD MMM YYYY H:mm',
    );

    const endDateFormated = formatLocale(
      String(itinerary?.end),
      ' DD MMM YYYY H:mm',
    );

    const limitDateFormated = formatLocale(
      String(itinerary?.deadlineForJoin),
      ' DD MMM YYYY H:mm',
    );

    return {
      beginDate: beginDateFormated,
      endDate: endDateFormated,
      limitDate: limitDateFormated,
    };
  }, [itinerary]);

  const renderTransports = useMemo(() => {
    return itinerary?.transports.map(
      (transport: ItineraryTransportItemProps, index) => (
        <ShadowBox key={'transport' + index}>
          <Text.Paragraph textColor="primaryText" textWeight="bold">
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
      ),
    );
  }, [itinerary]);

  const renderLodgings = useMemo(() => {
    return itinerary?.lodgings.map(
      (lodging: ItineraryLodgingItemProps, index) => (
        <ShadowBox key={'lodging' + index}>
          <Text.Paragraph textColor="primaryText" textWeight="bold">
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
              <Text textWeight="bold">{formatBRL(String(lodging.price))}</Text>
            </ColumnGroup>
          </RowGroupSpaced>
        </ShadowBox>
      ),
    );
  }, [itinerary]);

  const renderActivities = useMemo(() => {
    return itinerary?.activities.map(
      (activity: ItineraryActivityItemProps, index) => (
        <ShadowBox key={'activity' + index}>
          <Text.Paragraph textColor="primaryText" textWeight="bold">
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
              <Text textWeight="bold">{formatBRL(String(activity.price))}</Text>
            </ColumnGroup>
          </RowGroupSpaced>
        </ShadowBox>
      ),
    );
  }, [itinerary]);

  const renderMembers = useCallback(() => {
    return itinerary?.members.map((member: MemberProps) =>
      isOwner ? (
        <ItineraryMember
          member={member}
          key={member.id}
          itinerary={itinerary}
          owner={isOwner}
        />
      ) : (
        member.isAccepted && (
          <ItineraryMember
            member={member}
            key={member.id}
            itinerary={itinerary}
            owner={isOwner}
          />
        )
      ),
    );
  }, [isOwner, itinerary]);

  const renderQuestions = useCallback(
    () =>
      itinerary?.questions.map((questionItem: QuestionProps) => (
        <ItineraryQuestion
          question={questionItem}
          key={questionItem.id}
          itinerary={itinerary}
          owner={isOwner}
        />
      )),
    [isOwner, itinerary],
  );

  const renderJoinButton = useCallback(() => {
    if (itinerary && !user?.isHost) {
      function handleJoinItinerary() {
        if (itinerary?.requestPayment) {
          if (Date.parse(itinerary.deadlineForJoin) > Date.now()) {
            RootNavigation.navigate<CheckoutRouteParamsProps>('Checkout', {
              data: itinerary,
              paymentType: 'itinerary',
              hasInstallments: true,
            });
          } else {
            Toast.show({
              text1: 'Prazo para participar encerrado.',
              position: 'bottom',
              type: 'error',
            });
          }
        } else {
          // dispatch(joinRequest(itinerary.id));
          if (onJoinSuccess) {
            onJoinSuccess(itinerary.id);
          }
        }
      }

      return isOpen(itinerary.status, () =>
        !isMember ? (
          <JoinButton onPress={handleJoinItinerary}>
            <Icon name="location-enter" size={24} color="#FFF" />
            <JoinButtonText>Participar</JoinButtonText>
          </JoinButton>
        ) : (
          isMember.isAccepted === false && (
            <JoinButton onPress={() => {}}>
              <Icon name="location-enter" size={24} color="#FFF" />
              <JoinButtonText>Aguardando</JoinButtonText>
            </JoinButton>
          )
        ),
      );
    }
  }, [isMember, itinerary, onJoinSuccess, user]);

  const renderQuestionForm = useCallback(() => {
    if (itinerary && !user?.isHost) {
      const handleMakeQuestion = (data: {question: string}) => {
        if (itinerary) {
          // dispatch(makeQuestionRequest(itinerary?.id, data.question));
          if (onMakeQuestion) {
            onMakeQuestion({itineraryId: itinerary.id, text: data.question});
          }
          setValue('question', '');
        }
      };

      return isOpen(itinerary.status, () => (
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
      ));
    }
  }, [
    errors.question,
    handleSubmit,
    itinerary,
    onMakeQuestion,
    setValue,
    user,
    watchQuestion,
  ]);

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
    <Container>
      <Card>
        <CardHeader>
          <BackButton onPress={goBack}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
          {isOwner &&
            isOpen(itinerary.status, () => (
              <EditButton
                onPress={() =>
                  navigation.navigate('EditItinerary', {id: itinerary?.id})
                }>
                <Icon name="pencil-outline" size={24} color="#4885FD" />
              </EditButton>
            ))}
        </CardHeader>
        <CardContent>
          <RowGroupSpaced>
            <Text.Paragraph
              textColor="primaryText"
              textWeight="bold"
              maxLines={1}>
              {itinerary?.name}
            </Text.Paragraph>
            <Text.Paragraph textColor="primaryText" textWeight="bold">
              Vagas: {itinerary?.capacity}
            </Text.Paragraph>
          </RowGroupSpaced>
          <RowGroupSpaced>
            <Text limitter={19} textWeight="light" maxLines={1}>
              {itinerary?.location}
            </Text>
          </RowGroupSpaced>
          <StatusContent>
            <Status>
              <StatusName>
                {ItineraryStatusTranlated[itinerary.status]}
              </StatusName>
            </Status>
          </StatusContent>
          <ImageCarousel data={itinerary?.photos} />
          <View>
            <Text.Paragraph textColor="primaryText" textWeight="bold">
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
            <HostButton onPress={() => viewProfile(itinerary.owner.id)}>
              <UserImage
                source={{
                  uri: itinerary.owner.profile.file?.url || undefined,
                }}
                resizeMode="cover"
              />
              <HostDetails>
                <Text textColor="primaryText" textWeight="bold" maxLines={1}>
                  {itinerary?.owner.username}
                </Text>
                <StarRate
                  rate={itinerary?.owner.ratingAvg || 0}
                  size="regular"
                />
              </HostDetails>
            </HostButton>
          </HostContent>
          <ShadowBox>
            <DataContentHeader>
              <Icon name="calendar-blank-outline" color="#4885FD" size={24} />
              <Text.Paragraph textColor="primaryText" textWeight="bold">
                Datas
              </Text.Paragraph>
            </DataContentHeader>
            <RowGroupSpaced>
              <Text textColor="primaryText" textWeight="bold">
                Saida
              </Text>
              <Text textWeight="light">{beginDate}</Text>
            </RowGroupSpaced>
            <RowGroupSpaced>
              <Text textColor="primaryText" textWeight="bold">
                Retorno
              </Text>
              <Text textWeight="light">{endDate}</Text>
            </RowGroupSpaced>
            <RowGroupSpaced>
              <Text textColor="primaryText" textWeight="bold">
                Limite Inscrição
              </Text>
              <Text textWeight="light">{limitDate}</Text>
            </RowGroupSpaced>
          </ShadowBox>
          <ItemsContent>
            <IconHolder>
              <Icon name="car" color="#FFF" size={24} />
            </IconHolder>
            <Text.Title>Transporte</Text.Title>
          </ItemsContent>
          {renderTransports}
          <ItemsContent>
            <IconHolder>
              <Icon name="bed" color="#FFF" size={24} />
            </IconHolder>
            <Text.Title>Hospedagem</Text.Title>
          </ItemsContent>
          {renderLodgings}
          <ItemsContent>
            <IconHolder>
              <Icon name="lightning-bolt" color="#FFF" size={24} />
            </IconHolder>
            <Text.Title>Atividades</Text.Title>
          </ItemsContent>
          {renderActivities}
          {!isOwner && renderJoinButton()}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <RowGroup>
            <IconHolder>
              <Icon name="frequently-asked-questions" color="#FFF" size={24} />
            </IconHolder>
            <Text.Title>Dúvidas e Comentários</Text.Title>
          </RowGroup>
        </CardHeader>
        {renderQuestions()}
        {!isOwner && renderQuestionForm()}
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
        {renderMembers()}
      </Card>

      {isMember?.isAccepted &&
        isOpen(itinerary.status, () => (
          <DeleteItineraryButton onPress={onShowLeaveAlert}>
            <Icon name="delete-forever-outline" size={24} color="#FFF" />
            <DeleteItineraryButtonText>
              Sair do Roteiro
            </DeleteItineraryButtonText>
          </DeleteItineraryButton>
        ))}
      {isOwner && (
        <RowGroupSpaced>
          {isOpen(itinerary.status, () => (
            <FinalizeItineraryButton onPress={onShowFinishAlert}>
              <Icon name="progress-check" size={24} color="#FFF" />
              <FinalizeItineraryButtonText>
                Finalizar Roteiro
              </FinalizeItineraryButtonText>
            </FinalizeItineraryButton>
          ))}
          <DeleteItineraryButton onPress={onShowDeleteAlert}>
            <Icon name="delete-forever-outline" size={24} color="#FFF" />
            <DeleteItineraryButtonText>
              Excluir Roteiro
            </DeleteItineraryButtonText>
          </DeleteItineraryButton>
        </RowGroupSpaced>
      )}
    </Container>
  );
};

export default ItineraryDetails;
