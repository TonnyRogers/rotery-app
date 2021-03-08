import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getFavoritesRequest} from '../../store/modules/favorites/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  Title,
  ContentHeader,
  BackButton,
  ItineraryList,
  ColumnGroup,
} from './styled';
import Header from '../../components/Header';
import Itinerary from '../../components/Itinerary';
import Card from '../../components/Card';

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
      <Content>
        <ContentHeader>
          <BackButton onPress={toFeed}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
          <Title>Salvos como favoritos</Title>
        </ContentHeader>

        <ItineraryList
          data={itineraries}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <Itinerary
              itinerary={item.itinerary}
              detailButtonAction={() => itineraryDetail(item.itinerary.id)}
            />
          )}
          ListEmptyComponent={() => (
            <Card>
              <ColumnGroup>
                <Icon name="heart-off-outline" size={30} color="#3dc77b" />
                <Title>Nenhum Favotiro Ainda...</Title>
              </ColumnGroup>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
};

export default Favorites;
