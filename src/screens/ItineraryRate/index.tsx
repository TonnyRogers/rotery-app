import React, {useState, useRef, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {RootStateProps} from '../../store/modules/rootReducer';
import {ItineraryProps} from '../../utils/types';
import {rateItineraryRequest} from '../../store/modules/nextItineraries/actions';

import {
  Container,
  Content,
  CardHeader,
  BackButton,
  CardContent,
  User,
  Avatar,
  Reputation,
  ColumnGroup,
  RowGroup,
  SubmitButton,
  SubmitButtonText,
} from './styles';
import Card from '../../components/Card';
import TextArea from '../../components/TextArea';
import Page from '../../components/Page';
import formatLocale from '../../providers/dayjs-format-locale';
import Text from '../../components/Text';

interface ItineraryRateProps {
  route: {
    params: {id: number};
  };
  navigation: any;
}

const ItineraryRate: React.FC<ItineraryRateProps> = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [hostDescription, setHostDescription] = useState('');
  const [itineraryDescription, setItineraryDescription] = useState('');
  const [hostStars, setHostStars] = useState(0);
  const hostDescriptionRef = useRef();
  const itineraryDescriptionRef = useRef();
  const [itineraryStars, setItineraryStars] = useState(0);

  const {id} = route.params;
  const {itineraries} = useSelector(
    (state: RootStateProps) => state.nextItineraries,
  );

  const itinerary = itineraries?.find((item: ItineraryProps) => item.id === id);

  const beginDateFormated = useRef('');
  const userJoinDateFormated = useRef('');

  useMemo(() => {
    if (itinerary) {
      beginDateFormated.current = formatLocale(
        itinerary.begin,
        ' DD MMM YYYY HH:mm',
      );
      userJoinDateFormated.current = formatLocale(
        itinerary.owner.createdAt,
        ' DD MMM YYYY',
      );
    }
  }, [itinerary]);

  function renderUserRateStars(rate: number) {
    const starsComponent = [];
    for (let index = 1; index <= 5; index++) {
      starsComponent.push(
        rate >= index ? (
          <TouchableOpacity
            key={Math.random()}
            onPress={() => setHostStars(index)}>
            <Icon name="star" size={35} color="#3dc77b" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={Math.random()}
            onPress={() => setHostStars(index)}>
            <Icon name="star-outline" size={35} color="#000" />
          </TouchableOpacity>
        ),
      );
    }
    return starsComponent;
  }

  function renderItineraryRateStars(rate: number) {
    const starsComponent = [];
    for (let index = 1; index <= 5; index++) {
      starsComponent.push(
        rate >= index ? (
          <TouchableOpacity
            key={Math.random()}
            onPress={() => setItineraryStars(index)}>
            <Icon name="star" size={35} color="#3dc77b" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            key={Math.random()}
            onPress={() => setItineraryStars(index)}>
            <Icon name="star-outline" size={35} color="#000" />
          </TouchableOpacity>
        ),
      );
    }
    return starsComponent;
  }

  function rateItinerary() {
    if (hostStars === 0 || itineraryStars === 0) {
      return;
    }
    dispatch(
      rateItineraryRequest(
        Number(itinerary?.id),
        Number(itinerary?.owner.id),
        itineraryStars,
        hostStars,
        itineraryDescription,
        hostDescription,
      ),
    );
  }

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  if (!itinerary) {
    return null;
  }

  return (
    <Page showHeader={false}>
      <Container>
        <Content>
          <Card>
            <CardHeader>
              <BackButton onPress={goBack}>
                <Icon name="chevron-left" size={24} color="#3dc77b" />
              </BackButton>
            </CardHeader>
            <CardContent>
              <User>
                <RowGroup>
                  <Icon name="compass-outline" size={30} color="#3dc77b" />
                  <Text.Title textColor="blue">Host</Text.Title>
                </RowGroup>
                <Avatar
                  source={{
                    uri: itinerary.owner.profile.file?.url,
                  }}
                  resizeMode="cover"
                />
                <Text.Title textColor="secondaryText">
                  {itinerary?.owner.username}
                </Text.Title>
                <Text textWeight="light" textColor="secondaryText">
                  Ativo desde{userJoinDateFormated.current}
                </Text>
                <Reputation>{renderUserRateStars(hostStars)}</Reputation>
              </User>
              <TextArea
                label="Descrição"
                ref={hostDescriptionRef}
                value={hostDescription}
                onChange={setHostDescription}
                placeholder="fale o que achou do serviço deste Host..."
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader />
            <CardContent>
              <ColumnGroup>
                <RowGroup>
                  <Icon name="map-outline" size={30} color="#3dc77b" />
                  <Text.Title textColor="blue">Roteiro</Text.Title>
                </RowGroup>
                <Text.Title textColor="secondaryText">
                  {itinerary.name}
                </Text.Title>
                <Text textWeight="light" textColor="secondaryText">
                  {itinerary.location}
                </Text>
                <Text textWeight="light" textColor="secondaryText">
                  {beginDateFormated.current}
                </Text>
                <Reputation>
                  {renderItineraryRateStars(itineraryStars)}
                </Reputation>
              </ColumnGroup>
              <TextArea
                label="Descrição"
                ref={itineraryDescriptionRef}
                value={itineraryDescription}
                onChange={setItineraryDescription}
                placeholder="fale o que achou do destino..."
              />
            </CardContent>
          </Card>
          <SubmitButton onPress={rateItinerary}>
            <SubmitButtonText>Avaliar</SubmitButtonText>
          </SubmitButton>
        </Content>
      </Container>
    </Page>
  );
};

export default ItineraryRate;
