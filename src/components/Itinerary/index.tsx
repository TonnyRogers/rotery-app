import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
// import {format} from 'date-fns';
// import pt from 'date-fns/locale/pt';

import {
  Container,
  ItineraryHeader,
  RowGroup,
  Name,
  FavoriteButton,
  Location,
  Date,
  Description,
  Actions,
  Badges,
  Badge,
  Quantity,
  DetailsButton,
  DetailsButtonText,
} from './styles';
import ImageCarousel from '../ImageCarousel';

import {ItineraryProps} from '../../store/modules/itineraries/reducer';

interface ItineraryItemProps {
  owner: boolean;
  itinerary: ItineraryProps;
}

const Itinerary: React.FC<ItineraryItemProps> = ({itinerary, owner}) => {
  const navigation = useNavigation();

  function itineraryDetail(itineraryId: number) {
    navigation.navigate('ItineraryDetails', {id: itineraryId});
  }

  return (
    <Container>
      <ItineraryHeader>
        <ImageCarousel data={itinerary.photos} />
        <RowGroup>
          <Name>{itinerary.name}</Name>
          {owner ? (
            <FavoriteButton>
              <Icon name="book-outline" size={24} color="#3dc77b" />
            </FavoriteButton>
          ) : (
            <FavoriteButton>
              <Icon name="heart-outline" size={24} color="#3dc77b" />
            </FavoriteButton>
          )}
        </RowGroup>
        <RowGroup>
          <Location>{itinerary.location}</Location>
          <Date>{itinerary.begin}</Date>
        </RowGroup>
      </ItineraryHeader>
      <Description>{itinerary.description}</Description>
      <Actions>
        <Badges>
          <Badge>
            <Icon name="account-check-outline" size={20} color="#FFF" />
            <Quantity>{itinerary.members.length}</Quantity>
          </Badge>
          <Badge>
            <Icon name="account-multiple-outline" size={20} color="#FFF" />
            <Quantity>{itinerary.capacity}</Quantity>
          </Badge>
          <Badge>
            <Icon name="frequently-asked-questions" size={20} color="#FFF" />
            <Quantity>{itinerary.questions.length}</Quantity>
          </Badge>
          <Badge>
            <Icon name="camera-outline" size={20} color="#FFF" />
            <Quantity>{itinerary.photos.length}</Quantity>
          </Badge>
        </Badges>
        <DetailsButton onPress={() => itineraryDetail(itinerary.id)}>
          <DetailsButtonText>Detalhes</DetailsButtonText>
        </DetailsButton>
      </Actions>
    </Container>
  );
};

export default Itinerary;
