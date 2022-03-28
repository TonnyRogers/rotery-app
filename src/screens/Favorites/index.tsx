import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {getFavoritesRequest} from '../../store/modules/favorites/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {Container, Content, ContentHeader, ItineraryList} from './styled';
import Itinerary from '../../components/Itinerary';
import Page from '../../components/Page';
import Text from '../../components/Text';
import Empty from '../../components/Empty';
import {ListRenderItemInfo} from 'react-native';
import {ItineraryProps} from '../../utils/types';

const Favorites: React.FC = () => {
  const {items} = useSelector((state: RootStateProps) => state.favorites);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavoritesRequest());
  }, [dispatch]);

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('FeedItineraryDetails', {id: itineraryId});
  }

  return (
    <Page>
      <Container>
        <Content>
          <ContentHeader>
            <Text.Title>Salvos como favoritos</Text.Title>
          </ContentHeader>

          <ItineraryList
            removeClippedSubviews
            initialNumToRender={3}
            data={items}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}: ListRenderItemInfo<ItineraryProps>) => {
              return (
                <Itinerary
                  itinerary={item}
                  detailButtonAction={() => itineraryDetail(item.id)}
                />
              );
            }}
            ListEmptyComponent={() => (
              <Empty title="Nenhum Favotiro Ainda" subTitle="Vá para o Feed" />
            )}
          />
        </Content>
      </Container>
    </Page>
  );
};

export default Favorites;
