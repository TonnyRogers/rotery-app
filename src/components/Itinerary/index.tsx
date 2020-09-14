import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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

const Itinerary: React.FC = () => {
  return (
    <Container>
      <ItineraryHeader>
        <RowGroup>
          <Name>Trilha da pedra furada</Name>
          <FavoriteButton>
            <Icon name="heart-outline" size={24} color="#3dc77b" />
          </FavoriteButton>
        </RowGroup>
        <RowGroup>
          <Location>São Paulo - SP</Location>
          <Date>16 Mai 2020 16:00</Date>
        </RowGroup>
      </ItineraryHeader>
      <Description>
        Uma trilha é um caminho ou estrada de passeio terrestreusado para
        caminhada ao ar livre, ciclismo ou outras atividades de locomoção.Uma
        trilha é um caminho ou estradade passeio terrestre terrestre usado para
        caminhada ao ar livre, ciclismoou outras atividades de locomoção...
      </Description>
      <Actions>
        <Badges>
          <Badge>
            <Icon name="account-check-outline" size={24} color="#FFF" />
            <Quantity>10</Quantity>
          </Badge>
          <Badge>
            <Icon name="account-multiple-outline" size={24} color="#FFF" />
            <Quantity>2</Quantity>
          </Badge>
          <Badge>
            <Icon name="frequently-asked-questions" size={24} color="#FFF" />
            <Quantity>2</Quantity>
          </Badge>
          <Badge>
            <Icon name="camera-outline" size={24} color="#FFF" />
            <Quantity>2</Quantity>
          </Badge>
        </Badges>
        <DetailsButton>
          <DetailsButtonText>Detalhes</DetailsButtonText>
        </DetailsButton>
      </Actions>
    </Container>
  );
};

export default Itinerary;
