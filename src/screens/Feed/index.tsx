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
  ColumnGroup,
} from './styles';

import Header from '../../components/Header';
import Itinerary from '../../components/Itinerary';
import FilterInput from '../../components/FilterInput';
import Card from '../../components/Card';
import BottomSheet from '../../components/BottomSheet';

const Feed: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);

  useEffect(() => {
    dispatch(getFeedRequest());
  }, [dispatch]);

  const {itineraries} = useSelector((state: RootStateProps) => state.feed);

  const itineraryActivities: {id: number; name: string}[] = [];

  itineraries?.map((itinerary) =>
    itineraryActivities.push(...itinerary.activities),
  );

  const removeDuplicatedActivities = itineraryActivities.filter(
    (item, index, arr) =>
      arr.findIndex((comparable) => comparable.id === item.id) === index,
  );

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('FeedItineraryDetails', {id: itineraryId});
  }

  function toggleFilter() {
    setFilterVisible(!filterVisible);
  }

  function clearFilter() {
    dispatch(getFeedRequest());
  }

  return (
    <Container>
      <Header />
      <Content>
        <FilterContent>
          <RowGroupSpaced>
            <Title>Afim de se aventurar?</Title>
            <FilterButton onPress={toggleFilter} onLongPress={clearFilter}>
              <Icon name="filter" size={24} color="#3dc77b" />
            </FilterButton>
          </RowGroupSpaced>
          <FilterInput visible={filterVisible} onRequestClose={toggleFilter} />
          <ActivityList>
            {removeDuplicatedActivities.map((item, index) => (
              <Activity key={index}>
                <Icon name="menu" size={24} color="#FFF" />
                <ActivityName>{item.name}</ActivityName>
              </Activity>
            ))}
          </ActivityList>
        </FilterContent>
        <ItineraryList>
          {itineraries ? (
            itineraries.map((itinerary) => (
              <Itinerary
                itinerary={itinerary}
                key={itinerary.id}
                detailButtonAction={() => itineraryDetail(itinerary.id)}
              />
            ))
          ) : (
            <Card>
              <ColumnGroup>
                <Icon name="alert-decagram-outline" size={30} color="#3dc77b" />
                <Title>Ops!</Title>
                <Title>Parece que não tem nada por aqui.</Title>
                <Title>Crie seu prório roteiro agora mesmo!</Title>
              </ColumnGroup>
            </Card>
          )}
        </ItineraryList>
        <FloatContent>
          <NewItineraryButton
            onPress={() => navigation.navigate('NewItinerary')}>
            <Icon name="plus-box-outline" size={24} color="#FFF" />
          </NewItineraryButton>
        </FloatContent>
      </Content>
      <BottomSheet
        visible={sheetVisible}
        onRequestClose={(value) => setSheetVisible(value)}
      />
    </Container>
  );
};

export default Feed;
