import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {getItinerariesRequest} from '../../store/modules/itineraries/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import * as RootNavigation from '../../RootNavigation';

import {
  Container,
  Content,
  ContentHeader,
  ItineraryList,
  ColumnGroup,
  NewItineraryButton,
  NewItineraryButtonText,
} from './styled';
import Itinerary from '../../components/Itinerary';
import Card from '../../components/Card';
import Page from '../../components/Page';
import Text from '../../components/Text';

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
    RootNavigation.replace('NewItinerary');
  }

  return (
    <Page>
      <Container>
        <Content>
          <ContentHeader>
            <Text.Title>Meus Roteiros</Text.Title>
          </ContentHeader>
          <ItineraryList
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
              <Card>
                <ColumnGroup>
                  <Icon
                    name="bag-personal-off-outline"
                    size={30}
                    color="#3dc77b"
                  />
                  <Text.Title alignment="center">Nada por aqui</Text.Title>
                  <Text.Paragraph alignment="center" textWeight="light">
                    Crie seu primeiro roteiro!
                  </Text.Paragraph>
                </ColumnGroup>
                <NewItineraryButton onPress={toNewItinerary}>
                  <NewItineraryButtonText>Novo Roteiro</NewItineraryButtonText>
                </NewItineraryButton>
              </Card>
            )}
          />
        </Content>
      </Container>
    </Page>
  );
};

export default MyItineraries;
