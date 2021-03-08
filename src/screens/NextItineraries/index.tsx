import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getNextItinerariesRequest} from '../../store/modules/nextItineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  Title,
  ContentHeader,
  BackButton,
  ItineraryList,
  ColumnGroup,
  FeedButton,
  FeedButtonText,
} from './styled';
import Header from '../../components/Header';
import Itinerary from '../../components/Itinerary';
import Card from '../../components/Card';

const NextItineraries: React.FC = () => {
  const {itineraries} = useSelector(
    (state: RootStateProps) => state.nextItineraries,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNextItinerariesRequest());
  }, [dispatch]);

  function toFeed() {
    navigation.navigate('Feed');
  }

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('DynamicItineraryDetails', {id: itineraryId});
  }

  return (
    <Container>
      <Content>
        <ContentHeader>
          <BackButton onPress={toFeed}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
          <Title>Próximos Roteiros</Title>
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
                <Title>Que tal viajar?</Title>
                <Title>Encontre um roteiro!</Title>
              </ColumnGroup>
              <FeedButton onPress={() => navigation.navigate('Feed')}>
                <FeedButtonText>Ir para o Feed</FeedButtonText>
              </FeedButton>
            </Card>
          )}
        />
      </Content>
    </Container>
  );
};

export default NextItineraries;
