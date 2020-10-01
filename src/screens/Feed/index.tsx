import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import {getFeedRequest} from '../../store/modules/feed/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  FilterContent,
  Title,
  ActivityList,
  Activity,
  ActivityName,
  ItineraryList,
  NewItineraryButton,
  FloatContent,
  RowGroupSpaced,
  FilterButton,
} from './styles';

import Header from '../../components/Header';
import Itinerary from '../../components/Itinerary';
import FilterInput from '../../components/FilterInput';

const Feed: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    dispatch(getFeedRequest());
  }, [dispatch]);

  const {itineraries} = useSelector((state: RootStateProps) => state.feed);

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('FeedItineraryDetails', {id: itineraryId});
  }

  function toggleFilter() {
    setFilterVisible(!filterVisible);
  }

  return (
    <Container>
      <Header />
      <Content>
        <FilterContent>
          <RowGroupSpaced>
            <Title>Afim de se aventurar?</Title>
            <FilterButton onPress={toggleFilter}>
              <Icon name="filter" size={24} color="#3dc77b" />
            </FilterButton>
          </RowGroupSpaced>
          <FilterInput visible={filterVisible} onRequestClose={toggleFilter} />
          <ActivityList>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Camping</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>4x4</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
          </ActivityList>
        </FilterContent>
        <ItineraryList>
          {itineraries &&
            itineraries.map((itinerary) => (
              <Itinerary
                itinerary={itinerary}
                key={itinerary.id}
                detailButtonAction={() => itineraryDetail(itinerary.id)}
              />
            ))}
        </ItineraryList>
        <FloatContent>
          <NewItineraryButton
            onPress={() => navigation.navigate('NewItinerary')}>
            <Icon name="plus-box-outline" size={24} color="#FFF" />
          </NewItineraryButton>
        </FloatContent>
      </Content>
    </Container>
  );
};

export default Feed;
