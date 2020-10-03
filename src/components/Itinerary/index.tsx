import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
// import {format} from 'date-fns';
// import pt from 'date-fns/locale/pt';

import {RootStateProps} from '../../store/modules/rootReducer';
import {
  setFavoriteRequest,
  removeFavoriteRequest,
} from '../../store/modules/favorites/actions';

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
  owner?: boolean;
  itinerary: ItineraryProps;
  detailButtonAction?(): any;
}

const Itinerary: React.FC<ItineraryItemProps> = ({
  itinerary,
  owner,
  detailButtonAction,
}) => {
  const dispatch = useDispatch();
  const {itineraries} = useSelector((state: RootStateProps) => state.favorites);

  const isFavorited = itineraries?.find(
    (favorited) => favorited.itinerary.id === itinerary.id,
  );

  function setFavorite(itineraryId: number) {
    dispatch(setFavoriteRequest(itineraryId));
  }

  function removeFavorite(itineraryId: number) {
    dispatch(removeFavoriteRequest(itineraryId));
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
          ) : isFavorited ? (
            <FavoriteButton onPress={() => removeFavorite(itinerary.id)}>
              <Icon name="heart" size={24} color="#4885fd" />
            </FavoriteButton>
          ) : (
            <FavoriteButton onPress={() => setFavorite(itinerary.id)}>
              <Icon name="heart-outline" size={24} color="#3dc77b" />
            </FavoriteButton>
          )}
        </RowGroup>
        <Location>{itinerary.location}</Location>
        <Date>{itinerary.begin}</Date>
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
        <DetailsButton onPress={detailButtonAction}>
          <DetailsButtonText>Detalhes</DetailsButtonText>
        </DetailsButton>
      </Actions>
    </Container>
  );
};

export default Itinerary;
