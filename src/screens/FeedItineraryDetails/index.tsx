/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useEffect, useContext} from 'react';
import {Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {useForm} from 'react-hook-form';
// import {yupResolver} from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import {NavigationProp} from '@react-navigation/native';

// import {formatBRL} from '../../lib/mask';
import {
  ItineraryProps,
  // QuestionProps,
  MemberProps,
  // ItineraryTransportItemProps,
  // ItineraryLodgingItemProps,
  // ItineraryActivityItemProps,
  // ItineraryStatusTranlated,
  UserProps,
} from '../../utils/types';
import {
  makeQuestionRequest,
  joinRequest,
} from '../../store/modules/feed/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import * as RootNavigation from '../../RootNavigation';
// import isOpen from '../../guards/itineraryStatus';

import {
  Container,
  // CardHeader,
  // BackButton,
  // CardContent,
  // RowGroup,
  // RowGroupSpaced,
  // ColumnGroup,
  // HostContent,
  // HostLabel,
  // Label,
  // Divider,
  // HostButton,
  // UserImage,
  // HostDetails,
  // DataContentHeader,
  // IconHolder,
  // SendButton,
  // SendButtonText,
  // JoinButton,
  // JoinButtonText,
  // StatusContent,
  // Status,
  // StatusName,
  // ItemsContent,
} from './styles';
// import Card from '../../components/Card';
// import ImageCarousel from '../../components/ImageCarousel';
// import ItineraryMember from '../../components/ItineraryMember';
// import ItineraryQuestion from '../../components/ItineraryQuestion';
// import TextArea from '../../components/TextArea';
import Page from '../../components/Page';
import Share from '../../components/Share';
// import Text from '../../components/Text';
// import ShadowBox from '../../components/ShadowBox';
// import { formatLocale } from '../../providers/dayjs-format-locale';
import Empty from '../../components/Empty';
// import Toast from 'react-native-toast-message';
// import {CheckoutRouteParamsProps} from '../Checkout';
// import {YupValidationMessages} from '../../utils/enums';
// import StarRate from '../../components/StarRate';

import ItineraryDetails from '../../components/ItineraryDetails';
import {LoadingContext} from '../../context/loading/context';

// const validationSchema = yup.object().shape({
//   question: yup.string().required(YupValidationMessages.REQUIRED),
// });
interface FeedItineraryDetailsProps {
  route: {
    params: {id: number};
  };
  navigation: NavigationProp<Record<string, object | undefined>>;
}

// const FeedItineraryDetails2: React.FC<FeedItineraryDetailsProps> = ({
//   route,
//   navigation,
// }) => {
//   const {id} = route.params;
//   const {itineraries, loading} = useSelector(
//     (state: RootStateProps) => state.feed,
//   );
//   const {itineraries: nextItineraries} = useSelector(
//     (state: RootStateProps) => state.nextItineraries,
//   );
//   const {user} = useSelector((state: RootStateProps) => state.auth);
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: {errors},
//   } = useForm({resolver: yupResolver(validationSchema)});

//   const watchQuestion = watch('question');
//   const beginDateFormated = useRef('');
//   const endDateFormated = useRef('');
//   const limitDateFormated = useRef('');
//   const questionRef = useRef<any>();
//   const dispatch = useDispatch();

//   const itinerary = useMemo(
//     () =>
//       itineraries &&
//       itineraries?.find((item: ItineraryProps) => item.id === id),
//     [id, itineraries],
//   );

//   const isMember = useMemo(
//     () =>
//       itinerary?.members &&
//       itinerary.members.find(
//         (member: MemberProps) => member.user.id === user?.id,
//       ),
//     [itinerary, user],
//   );

//   useEffect(() => {
//     register('question');
//   }, [register]);

//   useEffect(() => {
//     if (
//       isMember &&
//       isMember.isAccepted === true &&
//       nextItineraries?.find((item) => item.id === isMember.itinerary)
//     ) {
//       RootNavigation.replace('NextItineraryDetails', {id});
//     }
//   }, [id, isMember, nextItineraries]);

//   useMemo(() => {
//     beginDateFormated.current = formatLocale(
//       String(itinerary?.begin),
//       ' DD MMM YYYY H:mm',
//     );
//     endDateFormated.current = formatLocale(
//       String(itinerary?.end),
//       ' DD MMM YYYY H:mm',
//     );
//     limitDateFormated.current = formatLocale(
//       String(itinerary?.deadlineForJoin),
//       ' DD MMM YYYY H:mm',
//     );
//   }, [itinerary]);

//   function viewProfile(userId: number) {
//     navigation.navigate('UserDetails', {
//       userId,
//     });
//   }

//   const renderTransports = useCallback(
//     () =>
//       itinerary?.transports.map(
//         (transport: ItineraryTransportItemProps, index) => (
//           <ShadowBox key={'transport' + index}>
//             <Text.Paragraph textColor="primaryText" textWeight="bold">
//               {transport.transport.name}
//             </Text.Paragraph>
//             <Text textWeight="light">{transport.description}</Text>
//             <RowGroupSpaced>
//               <ColumnGroup>
//                 <Text textWeight="light">Capacidade</Text>
//                 <Text textWeight="bold">{transport.capacity}</Text>
//               </ColumnGroup>
//               <ColumnGroup>
//                 <Text textWeight="light">Preço</Text>
//                 <Text textWeight="bold">
//                   {formatBRL(String(transport.price))}
//                 </Text>
//               </ColumnGroup>
//             </RowGroupSpaced>
//           </ShadowBox>
//         ),
//       ),
//     [itinerary],
//   );

//   const renderLodgings = useCallback(
//     () =>
//       itinerary?.lodgings.map((lodging: ItineraryLodgingItemProps, index) => (
//         <ShadowBox key={'lodging' + index}>
//           <Text.Paragraph textColor="primaryText" textWeight="bold">
//             {lodging.lodging.name}
//           </Text.Paragraph>
//           <Text textWeight="light">{lodging.description}</Text>
//           <RowGroupSpaced>
//             <ColumnGroup>
//               <Text textWeight="light">Capacidade</Text>
//               <Text textWeight="bold">{lodging.capacity}</Text>
//             </ColumnGroup>
//             <ColumnGroup>
//               <Text textWeight="light">Preço</Text>
//               <Text textWeight="bold">{formatBRL(String(lodging.price))}</Text>
//             </ColumnGroup>
//           </RowGroupSpaced>
//         </ShadowBox>
//       )),
//     [itinerary],
//   );

//   const renderActivities = useCallback(
//     () =>
//       itinerary?.activities.map(
//         (activity: ItineraryActivityItemProps, index) => (
//           <ShadowBox key={'activity' + index}>
//             <Text.Paragraph textColor="primaryText" textWeight="bold">
//               {activity.activity.name}
//             </Text.Paragraph>
//             <Text textWeight="light">{activity.description}</Text>
//             <RowGroupSpaced>
//               <ColumnGroup>
//                 <Text textWeight="light">Capacidade</Text>
//                 <Text textWeight="bold">{activity.capacity}</Text>
//               </ColumnGroup>
//               <ColumnGroup>
//                 <Text textWeight="light">Preço</Text>
//                 <Text textWeight="bold">
//                   {formatBRL(String(activity.price))}
//                 </Text>
//               </ColumnGroup>
//             </RowGroupSpaced>
//           </ShadowBox>
//         ),
//       ),
//     [itinerary],
//   );

//   const renderMembers = useCallback(
//     () =>
//       itinerary?.members.map(
//         (member: MemberProps) =>
//           member.isAccepted && (
//             <ItineraryMember
//               member={member}
//               key={member.id}
//               itinerary={itinerary}
//             />
//           ),
//       ),
//     [itinerary],
//   );

//   const renderQuestions = useCallback(
//     () =>
//       itinerary?.questions.map((questionItem: QuestionProps) => (
//         <ItineraryQuestion
//           question={questionItem}
//           key={questionItem.id}
//           itinerary={itinerary}
//         />
//       )),
//     [itinerary],
//   );

//   const renderJoinButton = useCallback(() => {
//     if (itinerary && !user.isGuide) {
//       function handleJoinItinerary() {
//         if (itinerary?.requestPayment) {
//           if (Date.parse(itinerary.deadlineForJoin) > Date.now()) {
//             RootNavigation.navigate<CheckoutRouteParamsProps>('Checkout', {
//               data: itinerary,
//               paymentType: 'itinerary',
//               hasInstallments: true,
//             });
//           } else {
//             Toast.show({
//               text1: 'Prazo para participar encerrado.',
//               position: 'bottom',
//               type: 'error',
//             });
//           }
//         } else {
//           dispatch(joinRequest(id));
//         }
//       }

//       return isOpen(itinerary.status, () =>
//         !isMember ? (
//           <JoinButton onPress={handleJoinItinerary}>
//             <Icon name="location-enter" size={24} color="#FFF" />
//             <JoinButtonText>Participar</JoinButtonText>
//           </JoinButton>
//         ) : (
//           isMember.isAccepted === false && (
//             <JoinButton onPress={() => {}}>
//               <Icon name="location-enter" size={24} color="#FFF" />
//               <JoinButtonText>Aguardando</JoinButtonText>
//             </JoinButton>
//           )
//         ),
//       );
//     }
//   }, [dispatch, id, isMember, itinerary, user]);

//   const renderQuestionForm = useCallback(() => {
//     if (itinerary && !user.isGuide) {
//       const handleMakeQuestion = (data: any) => {
//         if (itinerary) {
//           dispatch(makeQuestionRequest(itinerary?.id, data.question));
//           setValue('question', '');
//         }
//       };

//       return isOpen(itinerary.status, () => (
//         <>
//           <TextArea
//             placeholder="faça uma pergunta..."
//             value={watchQuestion}
//             ref={questionRef}
//             onChange={(value: string) => setValue('question', value)}
//             error={errors.question?.message}
//           />
//           <SendButton onPress={handleSubmit(handleMakeQuestion)}>
//             <Icon name="send-outline" size={24} color="#FFF" />
//             <SendButtonText>Perguntar</SendButtonText>
//           </SendButton>
//         </>
//       ));
//     }
//   }, [
//     dispatch,
//     errors.question,
//     handleSubmit,
//     itinerary,
//     setValue,
//     user,
//     watchQuestion,
//   ]);

//   function goBack() {
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     }
//   }

//   if (!itinerary) {
//     return (
//       <Empty
//         title="Ops!"
//         subTitle="Nada por aqui."
//         onPressTo={() => RootNavigation.goBack()}
//         buttonText="Voltar"
//       />
//     );
//   }

//   return (
//     <Page showHeader={false}>
//       <Share
//         data={{
//           id: itinerary?.id,
//           type: 'itinerary',
//           componentType: 'connectionShareList',
//           ownerId: itinerary.owner.id,
//         }}
//       />
//       <Container
//         renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
//         shouldRasterizeIOS={!!(Platform.OS === 'ios')}
//         scrollEventThrottle={16}
//         nestedScrollEnabled
//         decelerationRate="normal">
//         <Card>
//           <CardHeader>
//             <BackButton onPress={goBack}>
//               <Icon name="chevron-left" size={24} color="#3dc77b" />
//             </BackButton>
//           </CardHeader>
//           <CardContent>
//             <RowGroupSpaced>
//               <Text.Paragraph
//                 textColor="primaryText"
//                 textWeight="bold"
//                 maxLines={1}>
//                 {itinerary?.name}
//               </Text.Paragraph>
//               <Text.Paragraph textColor="primaryText" textWeight="bold">
//                 Vagas: {itinerary?.capacity}
//               </Text.Paragraph>
//             </RowGroupSpaced>
//             <RowGroupSpaced>
//               <Text limitter={19} textWeight="light" maxLines={1}>
//                 {itinerary?.location}
//               </Text>
//             </RowGroupSpaced>
//             <StatusContent>
//               <Status>
//                 <StatusName>
//                   {ItineraryStatusTranlated[itinerary.status]}
//                 </StatusName>
//               </Status>
//             </StatusContent>
//             <ImageCarousel data={itinerary?.photos} />
//             <View>
//               <Text.Paragraph textColor="primaryText" textWeight="bold">
//                 Descrição:
//               </Text.Paragraph>
//               <Text textWeight="light">{itinerary?.description}</Text>
//             </View>
//             <HostContent>
//               <HostLabel>
//                 <Icon name="compass-outline" size={24} color="#3dc77b" />
//                 <Label>Host</Label>
//               </HostLabel>
//               <Divider />
//               <HostButton onPress={() => viewProfile(itinerary.owner.id)}>
//                 <UserImage
//                   source={{
//                     uri: itinerary.owner.profile.file?.url || undefined,
//                   }}
//                   resizeMode="cover"
//                 />
//                 <HostDetails>
//                   <Text textColor="primaryText" textWeight="bold" maxLines={1}>
//                     {itinerary?.owner.username}
//                   </Text>
//                   <StarRate
//                     rate={itinerary?.owner.ratingAvg || 0}
//                     size="regular"
//                   />
//                 </HostDetails>
//               </HostButton>
//             </HostContent>
//             <ShadowBox>
//               <DataContentHeader>
//                 <Icon name="calendar-blank-outline" color="#4885FD" size={24} />
//                 <Text.Paragraph textColor="primaryText" textWeight="bold">
//                   Datas
//                 </Text.Paragraph>
//               </DataContentHeader>
//               <RowGroupSpaced>
//                 <Text textColor="primaryText" textWeight="bold">
//                   Saida
//                 </Text>
//                 <Text textWeight="light">{beginDateFormated.current}</Text>
//               </RowGroupSpaced>
//               <RowGroupSpaced>
//                 <Text textColor="primaryText" textWeight="bold">
//                   Retorno
//                 </Text>
//                 <Text textWeight="light">{endDateFormated.current}</Text>
//               </RowGroupSpaced>
//               <RowGroupSpaced>
//                 <Text textColor="primaryText" textWeight="bold">
//                   Limite Inscrição
//                 </Text>
//                 <Text textWeight="light">{limitDateFormated.current}</Text>
//               </RowGroupSpaced>
//             </ShadowBox>
//             <ItemsContent>
//               <IconHolder>
//                 <Icon name="car" color="#FFF" size={24} />
//               </IconHolder>
//               <Text.Title>Transporte</Text.Title>
//             </ItemsContent>
//             {renderTransports()}
//             <ItemsContent>
//               <IconHolder>
//                 <Icon name="bed" color="#FFF" size={24} />
//               </IconHolder>
//               <Text.Title>Hospedagem</Text.Title>
//             </ItemsContent>
//             {renderLodgings()}
//             <ItemsContent>
//               <IconHolder>
//                 <Icon name="lightning-bolt" color="#FFF" size={24} />
//               </IconHolder>
//               <Text.Title>Atividades</Text.Title>
//             </ItemsContent>
//             {renderActivities()}
//             {renderJoinButton()}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <RowGroup>
//               <IconHolder>
//                 <Icon
//                   name="frequently-asked-questions"
//                   color="#FFF"
//                   size={24}
//                 />
//               </IconHolder>
//               <Text.Title>Dúvidas e Comentários</Text.Title>
//             </RowGroup>
//           </CardHeader>
//           {renderQuestions()}
//           {renderQuestionForm()}
//         </Card>

//         <Card>
//           <CardHeader>
//             <RowGroup>
//               <IconHolder>
//                 <Icon name="account-check-outline" color="#FFF" size={24} />
//               </IconHolder>
//               <Text.Title>Membros</Text.Title>
//             </RowGroup>
//           </CardHeader>
//           {renderMembers()}
//         </Card>
//       </Container>
//       <SplashScreen visible={loading} />
//     </Page>
//   );
// };

const FeedItineraryDetails: React.FC<FeedItineraryDetailsProps> = ({
  route,
  navigation,
}) => {
  const {setLoading, isLoading} = useContext(LoadingContext);
  const {id} = route.params;
  const dispatch = useDispatch();

  const {itineraries, loading} = useSelector(
    (state: RootStateProps) => state.feed,
  );

  const {user}: {user: UserProps | null} = useSelector(
    (state: RootStateProps) => state.auth,
  );

  const {itineraries: nextItineraries} = useSelector(
    (state: RootStateProps) => state.nextItineraries,
  );

  const itinerary = useMemo(
    () =>
      itineraries &&
      itineraries?.find((item: ItineraryProps) => item.id === id),
    [id, itineraries],
  );

  const isMember = useMemo(
    () =>
      itinerary?.members &&
      itinerary.members.find(
        (member: MemberProps) => member.user.id === user?.id,
      ),
    [itinerary, user],
  );

  useEffect(() => {
    if (
      isMember &&
      isMember.isAccepted === true &&
      nextItineraries?.find((item) => item.id === isMember.itinerary)
    ) {
      RootNavigation.replace('NextItineraryDetails', {id});
    }
  }, [id, isMember, nextItineraries]);

  useEffect(() => {
    if (loading !== isLoading) {
      setLoading(loading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (!itinerary) {
    return (
      <Empty
        title="Ops!"
        subTitle="Nada por aqui."
        onPressTo={() => RootNavigation.goBack()}
        buttonText="Voltar"
      />
    );
  }

  return (
    <Page showHeader={false}>
      <Share
        data={{
          id: itinerary?.id,
          type: 'itinerary',
          componentType: 'connectionShareList',
          ownerId: itinerary.owner.id,
        }}
      />
      <Container
        renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
        shouldRasterizeIOS={!!(Platform.OS === 'ios')}
        scrollEventThrottle={16}
        nestedScrollEnabled
        decelerationRate="normal">
        <ItineraryDetails
          isOwner={false}
          isMember={isMember}
          user={user}
          itinerary={itinerary}
          navigation={navigation}
          onJoinSuccess={(itineraryId) => dispatch(joinRequest(itineraryId))}
          onMakeQuestion={(data) =>
            dispatch(makeQuestionRequest(data.itineraryId, data.text))
          }
        />
      </Container>
    </Page>
  );
};

export default FeedItineraryDetails;
