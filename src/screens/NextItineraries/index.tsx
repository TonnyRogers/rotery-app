import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getNextItinerariesRequest} from '../../store/modules/nextItineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {Container, Content, Title, ContentHeader, BackButton} from './styled';
import Header from '../../components/Header';
import Itinerary from '../../components/Itinerary';

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
    navigation.navigate('NextItineraryDetails', {id: itineraryId});
  }

  return (
    <Container>
      <Header />
      <Content>
        <ContentHeader>
          <BackButton onPress={toFeed}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
          <Title>Próximos Roteiros</Title>
        </ContentHeader>

        {itineraries &&
          itineraries.map((item) => (
            <Itinerary
              itinerary={item}
              key={item.id}
              detailButtonAction={() => itineraryDetail(item.id)}
            />
          ))}
      </Content>
    </Container>
  );
};

export default NextItineraries;
