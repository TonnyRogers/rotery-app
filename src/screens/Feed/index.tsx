import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Vibration, Alert} from 'react-native';

import {
  getFeedRequest,
  getFeedFilteredRequest,
  paginateFeedRequest,
} from '../../store/modules/feed/actions';
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
import {ItineraryProps} from '../../store/modules/feed/reducer';

const Feed: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [filter, setFilter] = useState({} as any);
  const [page, setPage] = useState(2);

  useEffect(() => {
    dispatch(getFeedRequest());
  }, [dispatch]);

  const {loading} = useSelector((state: RootStateProps) => state.auth);
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
    Vibration.vibrate([100, 100, 200, 100]);
    dispatch(getFeedRequest());
    setPage(2);
    setFilter({});
  }

  function loadFeed() {
    setPage(page + 1);
    dispatch(paginateFeedRequest(page, filter.begin, filter.end));
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
          <FilterInput
            visible={filterVisible}
            onRequestClose={toggleFilter}
            onFiltered={(begin, end) => {
              setFilter({begin: begin, end: end});
            }}
          />
          <ActivityList>
            {removeDuplicatedActivities.map((item, index) => (
              <Activity key={index}>
                <Icon name="menu" size={24} color="#FFF" />
                <ActivityName>{item.name}</ActivityName>
              </Activity>
            ))}
          </ActivityList>
        </FilterContent>
        <ItineraryList
          data={itineraries}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <Itinerary
              itinerary={item}
              detailButtonAction={() => itineraryDetail(item.id)}
            />
          )}
          ListEmptyComponent={() => (
            <Card>
              <ColumnGroup>
                <Icon name="alert-decagram-outline" size={30} color="#3dc77b" />
                <Title>Ops!</Title>
                <Title>Parece que não tem nada por aqui.</Title>
                <Title>Crie seu prório roteiro agora mesmo!</Title>
              </ColumnGroup>
            </Card>
          )}
          onRefresh={() => {
            dispatch(getFeedRequest());
            setPage(2);
          }}
          onEndReached={() => loadFeed()}
          onEndReachedThreshold={0.1}
          refreshing={loading}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 20}}
        />
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
