import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {getNextItinerariesRequest} from '../../store/modules/nextItineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import * as RootNavigation from '../../RootNavigation';

import {Container, Content, ContentHeader, ItineraryList} from './styled';
import Itinerary from '../../components/Itinerary';
import Page from '../../components/Page';
import Text from '../../components/Text';
import Empty from '../../components/Empty';

const NextItineraries: React.FC = () => {
  const {itineraries} = useSelector(
    (state: RootStateProps) => state.nextItineraries,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNextItinerariesRequest());
  }, [dispatch]);

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('NextItineraryDetails', {id: itineraryId});
  }

  function toFeed() {
    RootNavigation.replace('Feed');
  }

  return (
    <Page>
      <Container>
        <Content>
          <ContentHeader>
            <Text.Title>Próximos Roteiros</Text.Title>
          </ContentHeader>
          <ItineraryList
            removeClippedSubviews
            initialNumToRender={3}
            data={itineraries}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => (
              <Itinerary
                itinerary={item}
                detailButtonAction={() => itineraryDetail(item.id)}
              />
            )}
            ListEmptyComponent={() => (
              <Empty
                title="Nada por aqui!"
                subTitle="Que tal viajar? Encontre um roteiro!"
                onPressTo={toFeed}
                buttonText="Ir para o Feed"
              />
            )}
          />
        </Content>
      </Container>
    </Page>
  );
};

export default NextItineraries;
