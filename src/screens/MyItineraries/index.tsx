import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {getItinerariesRequest} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import * as RootNavigation from '../../RootNavigation';

import {Container, Content, ContentHeader, ItineraryList} from './styled';
import Itinerary from '../../components/Itinerary';
import Page from '../../components/Page';
import Text from '../../components/Text';
import Empty from '../../components/Empty';

const MyItineraries: React.FC = () => {
  const {itineraries} = useSelector(
    (state: RootStateProps) => state.itineraries,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItinerariesRequest());
  }, [dispatch]);

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('MyItineraryDetails', {id: itineraryId});
  }

  function toNewItinerary() {
    RootNavigation.navigate('NewItinerary');
  }

  return (
    <Page>
      <Container>
        <Content>
          <ContentHeader>
            <Text.Title>Meus Roteiros</Text.Title>
          </ContentHeader>
          <ItineraryList
            removeClippedSubviews
            initialNumToRender={3}
            data={itineraries}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => (
              <Itinerary
                itinerary={item}
                owner
                detailButtonAction={() => itineraryDetail(item.id)}
              />
            )}
            ListEmptyComponent={() => (
              <Empty
                title="Nada por aqui"
                subTitle="Crie seu primeiro roteiro!"
                onPressTo={toNewItinerary}
                buttonText="Novo Roteiro"
              />
            )}
          />
        </Content>
      </Container>
    </Page>
  );
};

export default MyItineraries;
