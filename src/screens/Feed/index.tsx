/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Vibration} from 'react-native';
import {Shadow} from 'react-native-shadow-2';

import {
  getFeedRequest,
  paginateFeedRequest,
} from '../../store/modules/feed/actions';
import {showFeedGuide} from '../../store/modules/guides/actions';
import {hideFeedGuide} from '../../store/modules/guides/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  FilterContent,
  ActivityList,
  Activity,
  ActivityName,
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

const Feed: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [filter, setFilter] = useState({} as any);
  const [page, setPage] = useState(2);

  const {loading} = useSelector((state: RootStateProps) => state.auth);
  const {itineraries} = useSelector((state: RootStateProps) => state.feed);
  const {feedGuide} = useSelector((state: RootStateProps) => state.guides);

  const itineraryActivities: {id: number; name: string}[] = [];

  useEffect(() => {
    dispatch(getFeedRequest());
    dispatch(showFeedGuide());
  }, [dispatch]);

  if (itineraries) {
    itineraries?.forEach((itinerary: any) =>
      itineraryActivities.push(...itinerary.activities),
    );
  }

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

  const handleCloseFeedGuide = () => {
    dispatch(hideFeedGuide());
  };

  return (
    <Page>
      <Container>
        <Content>
          <FilterContent>
            <RowGroupSpaced>
              <Text.Title>Afim de se aventurar?</Text.Title>
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
                  startColor="#00000009"
                  finalColor="transparent"
                  offset={[0, 0, 0, 0]}
                  distance={5}>
                  <Icon name="filter" size={24} color="#3dc77b" />
                </Shadow>
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
            onEndReachedThreshold={0.1}
            refreshing={loading}
            viewabilityConfig={{viewAreaCoveragePercentThreshold: 20}}
          />
        </Content>
      </Container>
      <FloatButton
        alignment="center"
        shape="rounded"
        icon={() => <Icon name="plus-box-outline" size={24} color="#FFF" />}
        onPressAction={() => navigation.navigate('NewItinerary')}
      />
      <BottomSheet
        visible={sheetVisible}
        onRequestClose={() => setSheetVisible(false)}
        title="Anuncio"
      />
      <FilterInput
        visible={filterVisible}
        onRequestClose={toggleFilter}
        onFiltered={(begin, end) => {
          setFilter({begin: begin, end: end});
        }}
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
