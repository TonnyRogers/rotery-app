import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Content,
  FilterContent,
  Title,
  Filter,
  Input,
  ActivityList,
  Activity,
  ActivityName,
  ItineraryList,
  NewItineraryButton,
  FloatContent,
} from './styles';

import Header from '../../components/Header';
import Itinerary from '../../components/Itinerary';

const Dashboard: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header />
      <Content>
        <FilterContent>
          <Title>Afim de se aventurar?</Title>
          <Filter>
            <Icon name="magnify" size={24} color="#3dc77b" />
            <Input placeholder="O que você procura?" />
          </Filter>
          <ActivityList>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Camping</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>4x4</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
            <Activity>
              <Icon name="menu" size={24} color="#FFF" />
              <ActivityName>Trilha</ActivityName>
            </Activity>
          </ActivityList>
        </FilterContent>
        <ItineraryList>{/* <Itinerary /> */}</ItineraryList>
        <FloatContent>
          <NewItineraryButton
            onPress={() => navigation.navigate('NewItinerary')}>
            <Icon name="plus-box-outline" size={24} color="#FFF" />
          </NewItineraryButton>
        </FloatContent>
      </Content>
    </Container>
  );
};

export default Dashboard;
