import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getFavoritesRequest} from '../../store/modules/favorites/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  ContentHeader,
  ItineraryList,
  ColumnGroup,
} from './styled';
import Itinerary from '../../components/Itinerary';
import Card from '../../components/Card';
import Page from '../../components/Page';
import Text from '../../components/Text';

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
            data={items}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => {
              return (
                <Itinerary
                  itinerary={item.itinerary}
                  detailButtonAction={() => itineraryDetail(item.itinerary.id)}
                />
              );
            }}
            ListEmptyComponent={() => (
              <Card>
                <ColumnGroup>
                  <Icon name="heart-off-outline" size={30} color="#3dc77b" />
                  <Text.Title alignment="center">
                    Nenhum Favotiro Ainda
                  </Text.Title>
                  <Text.Paragraph
                    textColor="secondary"
                    alignment="center"
                    textWeight="light">
                    Vá para o Feed
                  </Text.Paragraph>
                </ColumnGroup>
              </Card>
            )}
          />
        </Content>
      </Container>
    </Page>
  );
};

export default Favorites;
