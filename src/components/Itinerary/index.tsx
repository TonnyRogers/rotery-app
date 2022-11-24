import React, {useRef, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';

import {RootStateProps} from '../../store/modules/rootReducer';
import {
  setFavoriteRequest,
  removeFavoriteRequest,
} from '../../store/modules/favorites/actions';

import {
  ItineraryHeader,
  RowGroup,
  FavoriteButton,
  Actions,
  Badges,
  Badge,
  Quantity,
  DetailsButton,
  DetailsButtonText,
  StatusContent,
  Status,
  StatusName,
} from './styles';
import ImageCarousel from '../ImageCarousel';

import {ItineraryProps, ItineraryStatusTranlated} from '../../utils/types';
import Card from '../Card';
import Text from '../Text';
import {formatLocale} from '../../providers/dayjs-format-locale';
import Divider from '../Divider';

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
  const {items} = useSelector((state: RootStateProps) => state.favorites);

  const isFavorited = useMemo(
    () => items?.find((favorited) => favorited.id === itinerary.id),
    [items, itinerary.id],
  );

  let beginDateFormated = useRef('');
  useMemo(() => {
    beginDateFormated.current = formatLocale(
      itinerary.begin,
      'DD MMM YYYY H:mm',
    );
  }, [itinerary.begin]);

  function setFavorite(itineraryId: number) {
    dispatch(setFavoriteRequest(itineraryId));
  }

  function removeFavorite(itineraryId: number) {
    dispatch(removeFavoriteRequest(itineraryId));
  }

  return (
    <Card>
      <ItineraryHeader>
        <StatusContent>
          <Status>
            <StatusName>
              {ItineraryStatusTranlated[itinerary.status]}
            </StatusName>
          </Status>
        </StatusContent>
        <ImageCarousel data={itinerary.photos.map((item) => item.file)} />
        <RowGroup>
          <Text.Paragraph textColor="primaryText" textWeight="bold">
            {itinerary.name}
          </Text.Paragraph>
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
        <Text textWeight="light" maxLines={1}>
          {itinerary.location}
        </Text>
        <Text textWeight="light">{beginDateFormated.current}</Text>
      </ItineraryHeader>
      <Divider />
      <Text textWeight="light" maxLines={2}>
        {itinerary.description}
      </Text>
      <Divider />
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
    </Card>
  );
};

export default Itinerary;
