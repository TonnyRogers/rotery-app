/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Shadow} from 'react-native-shadow-2';

import {
  getFeedRequest,
  paginateFeedRequest,
} from '../../store/modules/feed/actions';
import {hideFeedGuide} from '../../store/modules/guides/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  FilterContent,
  ItineraryList,
  RowGroupSpaced,
  FilterButton,
} from './styles';

import Itinerary from '../../components/Itinerary';
import FilterInput from '../../components/FilterInput';
import BottomSheet from '../../components/BottomSheet';
import Page from '../../components/Page';
import FloatButton from '../../components/FloatButton';
import Ads from '../../components/Ads';
import GuideCarousel from '../../components/GuideCarousel';
import Text from '../../components/Text';
import Empty from '../../components/Empty';
import {feedGuideImages} from '../../utils/constants';
import {ItineraryProps, ItineraryActivityItemProps} from '../../utils/types';
import {useVibration} from '../../hooks/useVibration';

const Feed: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {alternated} = useVibration();
  const [filterVisible, setFilterVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [filter, setFilter] = useState({} as any);
  const [page, setPage] = useState(2);

  const {itineraries, loading} = useSelector(
    (state: RootStateProps) => state.feed,
  );
  const {user} = useSelector((state: RootStateProps) => state.auth);
  const {feedGuide} = useSelector((state: RootStateProps) => state.guides);

  const itineraryActivities: ItineraryActivityItemProps[] = [];

  useEffect(() => {
    dispatch(getFeedRequest());
  }, [dispatch]);

  if (itineraries) {
    itineraries?.forEach((itinerary: ItineraryProps) =>
      itineraryActivities.push(...itinerary.activities),
    );
  }

  const removeDuplicatedActivities = itineraryActivities.filter(
    (item, index, arr) =>
      arr.findIndex(
        (comparable) => comparable.activity.id === item.activity.id,
      ) === index,
  );

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('FeedItineraryDetails', {id: itineraryId});
  }

  function toggleFilter() {
    setFilterVisible(!filterVisible);
  }

  const clearFilter = useCallback(() => {
    alternated();
    setPage(2);
    setFilter({});
    dispatch(getFeedRequest());
  }, [alternated, dispatch]);

  const loadFeed = useCallback(() => {
    if (itineraries && itineraries.length > 3) {
      setPage(page + 1);
      dispatch(
        paginateFeedRequest({
          page,
          begin: filter.begin,
          end: filter.end,
          location: filter.location,
          limit: 10,
        }),
      );
    }
  }, [dispatch, filter.begin, filter.end, filter.location, itineraries, page]);

  const handleCloseFeedGuide = () => {
    dispatch(hideFeedGuide());
  };

  return (
    <Page>
      <Container>
        <Content>
          <FilterContent>
            <RowGroupSpaced>
              <Text.Title>Roteiros</Text.Title>
              <FilterButton onPress={toggleFilter} onLongPress={clearFilter}>
                <Shadow
                  contentViewStyle={{
                    backgroundColor: '#FFF',
                    padding: 12,
                    borderRadius: 26,
                    height: 52,
                    width: 52,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  radius={26}
                  startColor="#00000007"
                  finalColor="transparent"
                  offset={[0, 0, 0, 0]}
                  distance={7}>
                  <Icon name="filter" size={24} color="#3dc77b" />
                </Shadow>
              </FilterButton>
            </RowGroupSpaced>
          </FilterContent>
          <ItineraryList
            data={itineraries}
            removeClippedSubviews
            initialNumToRender={3}
            keyExtractor={(item: any) => String(item.id)}
            renderItem={({item}: any) => (
              <Itinerary
                itinerary={item}
                detailButtonAction={() => itineraryDetail(item.id)}
              />
            )}
            ListEmptyComponent={() => (
              <Empty
                title="Parece que não tem nada por aqui."
                subTitle="Crie seu prório roteiro agora mesmo!"
              />
            )}
            onRefresh={() => {
              setPage(2);
              dispatch(getFeedRequest());
            }}
            onEndReached={() => loadFeed()}
            onEndReachedThreshold={0.5}
            refreshing={loading}
            viewabilityConfig={{viewAreaCoveragePercentThreshold: 20}}
          />
        </Content>
      </Container>
      {user?.isHost && (
        <FloatButton
          alignment="center"
          shape="rounded"
          icon={() => <Icon name="plus-box-outline" size={24} color="#FFF" />}
          onPressAction={() => navigation.navigate('NewItinerary')}
        />
      )}
      <BottomSheet
        visible={sheetVisible}
        onRequestClose={() => setSheetVisible(false)}
        title="Anuncio"
      />
      <FilterInput
        visible={filterVisible}
        onRequestClose={toggleFilter}
        onFiltered={({begin, end, location}) => {
          setFilter({begin: begin, end: end, location: location || undefined});
        }}
        activities={removeDuplicatedActivities}
      />
      <Ads visible={feedGuide} onRequestClose={() => {}} key="guide-feed">
        <GuideCarousel
          data={feedGuideImages}
          onClose={() => handleCloseFeedGuide()}
        />
      </Ads>
    </Page>
  );
};

export default Feed;
