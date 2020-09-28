import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getItinerariesRequest} from '../../store/modules/itineraries/actions';

import {Container, Content, Title, ContentHeader, BackButton} from './styled';
import Header from '../../components/Header';
import Itinerary from '../../components/Itinerary';

const Itineraries: React.FC = () => {
  const {itineraries} = useSelector((state) => state.itineraries);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItinerariesRequest());
  }, [dispatch]);

  function toDashboard() {
    navigation.navigate('Dashboard');
  }

  return (
    <Container>
      <Header />
      <Content>
        <ContentHeader>
          <BackButton onPress={toDashboard}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
          <Title>Seus Roteiros</Title>
        </ContentHeader>

        {itineraries.map((item) => (
          <Itinerary itinerary={item} key={item.id} owner />
        ))}
      </Content>
    </Container>
  );
};

export default Itineraries;
