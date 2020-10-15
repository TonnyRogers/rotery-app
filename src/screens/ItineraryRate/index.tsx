import React, {useState, useRef, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';

import {RootStateProps} from '../../store/modules/rootReducer';
import {ItineraryProps} from '../../store/modules/nextItineraries/reducer';
import {rateItineraryRequest} from '../../store/modules/nextItineraries/actions';

import {
  Container,
  Content,
  CardHeader,
  BackButton,
  CardContent,
  User,
  Avatar,
  UserName,
  Reputation,
  Joined,
  ColumnGroup,
  RowGroup,
  SubmitButton,
  SubmitButtonText,
  Title,
  ItineraryName,
  ItineraryLocation,
  ItineraryDate,
} from './styles';
import Header from '../../components/Header';
import Card from '../../components/Card';
import TextArea from '../../components/TextArea';

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

  const itinerary: ItineraryProps = itineraries?.find(
    (item: ItineraryProps) => item.id === id,
  );

  const beginDateFormated = useRef();
  const userJoinDateFormated = useRef();

  useMemo(() => {
    beginDateFormated.current = format(
      new Date(itinerary.begin),
      ' dd MMM yyyy',
      {
        locale: pt,
      },
    );
    userJoinDateFormated.current = format(
      parse(itinerary.owner.created_at, 'yyyy-MM-dd HH:mm:ss', new Date()),
      ' dd MMM yyyy',
      {
        locale: pt,
      },
    );
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
        itinerary.id,
        itinerary.owner.id,
        itineraryStars,
        hostStars,
        itineraryDescription,
        hostDescription,
      ),
    );
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
          </CardHeader>
          <CardContent>
            <User>
              <RowGroup>
                <Icon name="compass-outline" size={30} color="#3dc77b" />
                <Title>Hóspede</Title>
              </RowGroup>
              <Avatar
                source={{
                  uri: itinerary.owner.person.file
                    ? itinerary.owner.person.file.url
                    : '..',
                }}
                resizeMode="cover"
              />
              <UserName>{itinerary?.owner.username}</UserName>
              <Joined>Ativo desde{userJoinDateFormated.current}</Joined>
              <Reputation>{renderUserRateStars(hostStars)}</Reputation>
            </User>
            <TextArea
              label="Descrição"
              ref={hostDescriptionRef}
              value={hostDescription}
              onChange={setHostDescription}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader />
          <CardContent>
            <ColumnGroup>
              <RowGroup>
                <Icon name="map-outline" size={30} color="#3dc77b" />
                <Title>Roteiro</Title>
              </RowGroup>
              <ItineraryName>{itinerary?.name}</ItineraryName>
              <ItineraryLocation>{itinerary?.location}</ItineraryLocation>
              <ItineraryDate>{beginDateFormated.current}</ItineraryDate>
              <Reputation>
                {renderItineraryRateStars(itineraryStars)}
              </Reputation>
            </ColumnGroup>

            <TextArea
              label="Descrição"
              ref={itineraryDescriptionRef}
              value={itineraryDescription}
              onChange={setItineraryDescription}
            />
          </CardContent>
        </Card>
        <SubmitButton onPress={rateItinerary}>
          <SubmitButtonText>Avaliar</SubmitButtonText>
        </SubmitButton>
      </Content>
    </Container>
  );
};

export default ItineraryRate;
