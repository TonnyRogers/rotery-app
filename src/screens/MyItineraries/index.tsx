import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getItinerariesRequest} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  Title,
  ContentHeader,
  BackButton,
  ItineraryList,
  ColumnGroup,
  NewItineraryButton,
  NewItineraryButtonText,
} from './styled';
import Header from '../../components/Header';
import Itinerary from '../../components/Itinerary';
import Card from '../../components/Card';

const MyItineraries: React.FC = () => {
  const {itineraries} = useSelector(
    (state: RootStateProps) => state.itineraries,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItinerariesRequest());
  }, [dispatch]);

  function toFeed() {
    navigation.navigate('Feed');
  }

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('MyItineraryDetails', {id: itineraryId});
  }

  return (
    <Container>
      <Header />
      <Content>
        <ContentHeader>
          <BackButton onPress={toFeed}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
          <Title>Meus Roteiros</Title>
        </ContentHeader>

        <ItineraryList
          data={itineraries}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <Itinerary
              itinerary={item}
              owner
              detailButtonAction={() => itineraryDetail(item.id)}
            />
          )}
          ListEmptyComponent={() => (
            <Card>
              <ColumnGroup>
                <Icon
                  name="bag-personal-off-outline"
                  size={30}
                  color="#3dc77b"
                />
                <Title>Nada por aqui</Title>
                <Title>Crie seu primeiro roteiro!</Title>
              </ColumnGroup>
              <NewItineraryButton
                onPress={() => navigation.navigate('NewItinerary')}>
                <NewItineraryButtonText>Novo Roteiro</NewItineraryButtonText>
              </NewItineraryButton>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
};

export default MyItineraries;
