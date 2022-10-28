/* eslint-disable react-native/no-inline-styles */
import React, {useState, useMemo, useEffect, useContext} from 'react';
import {Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

// import {formatBRL} from '../../lib/mask';
// import {
//   QuestionProps,
//   MemberProps,
//   ItineraryTransportItemProps,
//   ItineraryLodgingItemProps,
//   ItineraryActivityItemProps,
//   ItineraryStatusTranlated,
// } from '../../utils/types';
import {
  deleteItineraryRequest,
  notifyItineraryFinishRequest,
} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
// import isOpen from '../../guards/itineraryStatus';
import * as RootNavigation from '../../RootNavigation';

import {
  Content,
  // CardHeader,
  // BackButton,
  // EditButton,
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
  // DeleteItineraryButton,
  // DeleteItineraryButtonText,
  // FinalizeItineraryButton,
  // FinalizeItineraryButtonText,
  // StatusContent,
  // Status,
  // StatusName,
  // ItemsContent,
} from './styles';
// import Card from '../../components/Card';
// import ImageCarousel from '../../components/ImageCarousel';
// import ItineraryMember from '../../components/ItineraryMember';
// import ItineraryQuestion from '../../components/ItineraryQuestion';
import Alert from '../../components/Alert';
import Page from '../../components/Page';
import Share from '../../components/Share';
// import Text from '../../components/Text';
import {hideMyItineraryGuide} from '../../store/modules/guides/actions';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
// import ShadowBox from '../../components/ShadowBox';
import {myGuideImages} from '../../utils/constants';
// import { formatLocale } from '../../providers/dayjs-format-locale';
import Empty from '../../components/Empty';
// import DividerComponent from '../../components/Divider';
// import StarRate from '../../components/StarRate';
import ItineraryDetails from '../../components/ItineraryDetails';
import {NavigationProp} from '@react-navigation/native';
import {LoadingContext} from '../../context/loading/context';

interface MyItineraryDetailsProps {
  route: {
    params: {id: number};
  };
  navigation: NavigationProp<Record<string, object | undefined>>;
}

// const MyItineraryDetails2: React.FC<MyItineraryDetailsProps> = ({
//   route,
//   navigation,
// }) => {
//   const {id} = route.params;
//   const {itineraries, loading} = useSelector(
//     (state: RootStateProps) => state.itineraries,
//   );
//   const {myItineraryGuide} = useSelector(
//     (state: RootStateProps) => state.guides,
//   );
//   const [alertVisible, setAlertVisible] = useState(false);
//   const [finishAlertVisible, setFinishAlertVisible] = useState(false);
//   const dispatch = useDispatch();

//   const itinerary = useMemo(
//     () => itineraries?.find((item: {id: number}) => item.id === id),
//     [id, itineraries],
//   );

//   if (!itinerary) {
//     navigation.goBack();
//   }

//   let beginDateFormated = useRef('');
//   let endDateFormated = useRef('');
//   let limitDateFormated = useRef('');

//   useMemo(() => {
//     if (itinerary) {
//       beginDateFormated.current = formatLocale(
//         itinerary.begin,
//         ' DD MMM YYYY H:mm',
//       );
//       endDateFormated.current = formatLocale(
//         itinerary.end,
//         ' DD MMM YYYY H:mm',
//       );
//       limitDateFormated.current = formatLocale(
//         itinerary.deadlineForJoin,
//         ' DD MMM YYYY H:mm',
//       );
//     }
//   }, [itinerary]);

//   function showDeleteAlert() {
//     setAlertVisible(true);
//   }

//   function hideFinish() {
//     setFinishAlertVisible(false);
//   }

//   function hideDeleteAlert() {
//     setAlertVisible(false);
//   }

//   function handleDeleteItinerary() {
//     if (itinerary) {
//       setAlertVisible(false);
//       dispatch(deleteItineraryRequest(itinerary?.id));
//     }
//   }

//   function showFinishAlert() {
//     setFinishAlertVisible(true);
//   }

//   function handleFinishItinerary() {
//     setFinishAlertVisible(false);
//     dispatch(notifyItineraryFinishRequest(id));
//   }

//   const handleCloseMyGuide = () => {
//     dispatch(hideMyItineraryGuide());
//   };

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
//       itinerary?.members.map((member: MemberProps) => (
//         <ItineraryMember
//           member={member}
//           key={member.id}
//           owner
//           itinerary={itinerary}
//         />
//       )),
//     [itinerary],
//   );

//   const renderQuestions = useCallback(
//     () =>
//       itinerary?.questions.map((question: QuestionProps) => (
//         <ItineraryQuestion
//           question={question}
//           key={question.id}
//           owner
//           itinerary={itinerary}
//         />
//       )),
//     [itinerary],
//   );

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

//   function goBack() {
//     if (navigation.canGoBack()) {
//       navigation.goBack();
//     }
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
//       <Content
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
//             {isOpen(itinerary.status, () => (
//               <EditButton
//                 onPress={() =>
//                   navigation.navigate('EditItinerary', {id: itinerary?.id})
//                 }>
//                 <Icon name="pencil-outline" size={24} color="#4885FD" />
//               </EditButton>
//             ))}
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
//               <Text alignment="start" textWeight="light" maxLines={1}>
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
//             <ImageCarousel data={itinerary?.photos || []} />
//             <DividerComponent />
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
//               <HostButton>
//                 <UserImage
//                   source={{
//                     uri: itinerary?.owner.profile.file?.url || undefined,
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
//         <RowGroupSpaced>
//           {isOpen(itinerary.status, () => (
//             <FinalizeItineraryButton onPress={showFinishAlert}>
//               <Icon name="progress-check" size={24} color="#FFF" />
//               <FinalizeItineraryButtonText>
//                 Finalizar Roteiro
//               </FinalizeItineraryButtonText>
//             </FinalizeItineraryButton>
//           ))}
//           <DeleteItineraryButton onPress={showDeleteAlert}>
//             <Icon name="delete-forever-outline" size={24} color="#FFF" />
//             <DeleteItineraryButtonText>
//               Excluir Roteiro
//             </DeleteItineraryButtonText>
//           </DeleteItineraryButton>
//         </RowGroupSpaced>
//       </Content>
//       <Alert
//         title="Fim do Roteiro!"
//         message="Vode deseja realmente encerrar este roteiro?"
//         icon="progress-check"
//         visible={finishAlertVisible}
//         onCancel={hideFinish}
//         onRequestClose={() => setFinishAlertVisible(false)}
//         onConfirm={handleFinishItinerary}
//       />
//       <Alert
//         title="Ops!"
//         message="você deseja realmente excluir este roteiro?"
//         icon="delete-forever-outline"
//         visible={alertVisible}
//         onCancel={hideDeleteAlert}
//         onRequestClose={() => setAlertVisible(false)}
//         onConfirm={handleDeleteItinerary}
//       />
//       <Ads visible={myItineraryGuide} onRequestClose={() => {}}>
//         <GuideCarousel
//           data={myGuideImages}
//           onClose={() => handleCloseMyGuide()}
//           key="guide-my-itinerary"
//         />
//       </Ads>
//       <SplashScreen visible={loading} />
//     </Page>
//   );
// };

const MyItineraryDetails: React.FC<MyItineraryDetailsProps> = ({
  route,
  navigation,
}) => {
  const {setLoading, isLoading} = useContext(LoadingContext);
  const {id} = route.params;
  const {itineraries, loading} = useSelector(
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

  function showDeleteAlert() {
    setAlertVisible(true);
  }

  function hideFinish() {
    setFinishAlertVisible(false);
  }

  function hideDeleteAlert() {
    setAlertVisible(false);
  }

  function handleDeleteItinerary() {
    if (itinerary) {
      setAlertVisible(false);
      dispatch(deleteItineraryRequest(itinerary?.id));
    }
  }

  function showFinishAlert() {
    setFinishAlertVisible(true);
  }

  function handleFinishItinerary() {
    setFinishAlertVisible(false);
    dispatch(notifyItineraryFinishRequest(id));
  }

  const handleCloseMyGuide = () => {
    dispatch(hideMyItineraryGuide());
  };

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
      <Content
        renderToHardwareTextureAndroid={!!(Platform.OS === 'android')}
        shouldRasterizeIOS={!!(Platform.OS === 'ios')}
        scrollEventThrottle={16}
        nestedScrollEnabled
        decelerationRate="normal">
        <ItineraryDetails
          isOwner
          itinerary={itinerary}
          navigation={navigation}
          onShowDeleteAlert={showDeleteAlert}
          onShowFinishAlert={showFinishAlert}
        />
      </Content>
      <Alert
        title="Fim do Roteiro!"
        message="Vode deseja realmente encerrar este roteiro?"
        icon="progress-check"
        visible={finishAlertVisible}
        onCancel={hideFinish}
        onRequestClose={() => setFinishAlertVisible(false)}
        onConfirm={handleFinishItinerary}
      />
      <Alert
        title="Ops!"
        message="você deseja realmente excluir este roteiro?"
        icon="delete-forever-outline"
        visible={alertVisible}
        onCancel={hideDeleteAlert}
        onRequestClose={() => setAlertVisible(false)}
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
