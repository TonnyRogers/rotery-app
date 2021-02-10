import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Vibration} from 'react-native';

import {
  getFeedRequest,
  paginateFeedRequest,
} from '../../store/modules/feed/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import {hideFeedGuide} from '../../store/modules/guides/actions';

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
import GuideCarousel from '../../components/GuideCarousel';
import Ads from '../../components/Ads';

const guideImages = [
  {
    id: 1,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guide-filter-1.png',
    withInfo: true,
    title: 'Filtrando Roteiros 1/2',
    message: 'Clique no ícone de filtro para customizar o filtro de roteiros.',
    isAnimation: false,
  },
  {
    id: 2,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guide-filter-2.png',
    withInfo: true,
    title: 'Filtrando Roteiros 2/2',
    message:
      'Customize o filtro com base nas suas necessidades e clique em "filtrar".',
    isAnimation: false,
  },
  {
    id: 3,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guide-filter-1.png',
    withInfo: true,
    title: 'Limpando filtro',
    message: 'Clique e segure no botão de filtro até o dispositivo vibrar.',
    isAnimation: false,
  },
  {
    id: 4,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guide-reload-feed.png',
    withInfo: true,
    title: 'Carregando novos roteiros',
    message: 'Deslize os dedos para baixo para atualizar feed.',
    isAnimation: false,
  },
  {
    id: 5,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guide-new-itinerary.png',
    withInfo: true,
    title: 'Criando novo roteiro',
    message: 'Clique no ícone de "mais" para criar um novo roteiro.',
    isAnimation: false,
  },
];

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
  const {feedGuide} = useSelector((state: RootStateProps) => state.guides);

  const itineraryActivities: {id: number; name: string}[] = [];

  itineraries?.map((itinerary) =>
    itineraryActivities.push(...itinerary.activities),
  );

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

  function clearFilter() {
    Vibration.vibrate([100, 100, 200, 100]);
    setPage(2);
    setFilter({});
    dispatch(getFeedRequest());
  }

  function loadFeed() {
    if (itineraries.length > 3) {
      setPage(page + 1);
      dispatch(paginateFeedRequest(page, filter.begin, filter.end));
    }
  }

  function closeGuide() {
    dispatch(hideFeedGuide());
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
      <Ads visible={feedGuide} onRequestClose={() => {}}>
        <GuideCarousel data={guideImages} onClose={() => closeGuide()} />
      </Ads>
    </Container>
  );
};

export default Feed;
