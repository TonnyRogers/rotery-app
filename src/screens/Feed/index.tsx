import React, {useEffect, useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Vibration} from 'react-native';

import {
  getFeedRequest,
  paginateFeedRequest,
} from '../../store/modules/feed/actions';
import {showFeedGuide} from '../../store/modules/guides/actions';
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

import Itinerary from '../../components/Itinerary';
import FilterInput from '../../components/FilterInput';
import Card from '../../components/Card';
import BottomSheet from '../../components/BottomSheet';

const Feed: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [filter, setFilter] = useState({} as any);
  const [page, setPage] = useState(2);

  const {loading} = useSelector((state: RootStateProps) => state.auth);
  const {itineraries} = useSelector((state: RootStateProps) => state.feed);

  const itineraryActivities: {id: number; name: string}[] = [];

  useEffect(() => {
    dispatch(getFeedRequest());
    dispatch(showFeedGuide());
  }, [dispatch]);

  if (itineraries) {
    itineraries?.map((itinerary: any) =>
      itineraryActivities.push(...itinerary.activities),
    );
  }

  const removeDuplicatedActivities = itineraryActivities.filter(
    (item, index, arr) =>
      arr.findIndex((comparable) => comparable.id === item.id) === index,
  );

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('DynamicItineraryDetails', {id: itineraryId});
  }

  function toggleFilter() {
    setFilterVisible(!filterVisible);
  }

  const clearFilter = useCallback(() => {
    Vibration.vibrate([100, 100, 200, 100]);
    setPage(2);
    setFilter({});
    dispatch(getFeedRequest());
  }, [dispatch]);

  const loadFeed = useCallback(() => {
    if (itineraries.length > 3) {
      setPage(page + 1);
      dispatch(paginateFeedRequest(page, filter.begin, filter.end));
    }
  }, [dispatch, filter.begin, filter.end, itineraries.length, page]);

  return (
    <>
      <Container>
        <Content>
          <FilterContent>
            <RowGroupSpaced>
              <Title>Afim de se aventurar?</Title>
              <FilterButton onPress={toggleFilter} onLongPress={clearFilter}>
                <Icon name="filter" size={24} color="#3dc77b" />
              </FilterButton>
            </RowGroupSpaced>
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
            keyExtractor={(item: any) => String(item.id)}
            renderItem={({item}: any) => (
              <Itinerary
                itinerary={item}
                detailButtonAction={() => itineraryDetail(item.id)}
              />
            )}
            ListEmptyComponent={() => (
              <Card>
                <ColumnGroup>
                  <Icon
                    name="alert-decagram-outline"
                    size={30}
                    color="#3dc77b"
                  />
                  <Title>Ops!</Title>
                  <Title>Parece que não tem nada por aqui.</Title>
                  <Title>Crie seu prório roteiro agora mesmo!</Title>
                </ColumnGroup>
              </Card>
            )}
            onRefresh={() => {
              setPage(2);
              dispatch(getFeedRequest());
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
      <FilterInput
        visible={filterVisible}
        onRequestClose={toggleFilter}
        onFiltered={(begin, end) => {
          setFilter({begin: begin, end: end});
        }}
      />
    </>
  );
};

export default Feed;
