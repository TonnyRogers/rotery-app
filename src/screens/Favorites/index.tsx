import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getFavoritesRequest} from '../../store/modules/favorites/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {Container, Content, Title, ContentHeader, BackButton} from './styled';
import Header from '../../components/Header';
import Itinerary from '../../components/Itinerary';

const Favorites: React.FC = () => {
  const {itineraries} = useSelector((state: RootStateProps) => state.favorites);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoritesRequest());
  }, [dispatch]);

  function toFeed() {
    navigation.navigate('Feed');
  }

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('FeedItineraryDetails', {id: itineraryId});
  }

  return (
    <Container>
      <Header />
      <Content>
        <ContentHeader>
          <BackButton onPress={toFeed}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
          <Title>Salvos como favoritos</Title>
        </ContentHeader>

        {itineraries &&
          itineraries.map((item) => (
            <Itinerary
              itinerary={item.itinerary}
              key={item.itinerary.id}
              detailButtonAction={() => itineraryDetail(item.itinerary.id)}
            />
          ))}
      </Content>
    </Container>
  );
};

export default Favorites;
