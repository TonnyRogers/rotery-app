import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getNextItinerariesRequest} from '../../store/modules/nextItineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  ContentHeader,
  ItineraryList,
  ColumnGroup,
  FeedButton,
  FeedButtonText,
} from './styled';
import Itinerary from '../../components/Itinerary';
import Card from '../../components/Card';
import Page from '../../components/Page';
import Text from '../../components/Text';

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

  return (
    <Page>
      <Container>
        <Content>
          <ContentHeader>
            <Text.Title>Próximos Roteiros</Text.Title>
          </ContentHeader>
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
                  <Icon name="bus-clock" size={30} color="#3dc77b" />
                  <Text.Title textColor="secondary">Que tal viajar?</Text.Title>
                  <Text.Paragraph>Encontre um roteiro!</Text.Paragraph>
                </ColumnGroup>
                <FeedButton onPress={() => navigation.navigate('Feed')}>
                  <FeedButtonText>Ir para o Feed</FeedButtonText>
                </FeedButton>
              </Card>
            )}
          />
        </Content>
      </Container>
    </Page>
  );
};

export default NextItineraries;
