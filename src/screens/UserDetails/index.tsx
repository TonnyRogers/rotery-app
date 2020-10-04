import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

import {
  Container,
  Content,
  CardHeader,
  BackButton,
  CardCotent,
  UserDetail,
  Avatar,
  Name,
  DateJoin,
  Profission,
  Age,
  Location,
  ConnectButton,
  ConnectButtonText,
  RateStars,
  Title,
  RateList,
  ItineraryName,
  ItineraryDate,
  IconContent,
  RowGroupSpaced,
  ColumnGroup,
} from './styles';
import Header from '../../components/Header';
import Card from '../../components/Card';

const UserDetails: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content>
        <Card>
          <CardHeader>
            <BackButton onPress={() => {}}>
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </BackButton>
          </CardHeader>
          <CardCotent>
            <UserDetail>
              <Avatar
                source={{
                  uri:
                    'https://avatars2.githubusercontent.com/u/37991230?s=460&u=93bdd1c3673cc0a4685c138dbf74e0c6ec8a50e0&v=4',
                }}
              />
              <Name>Tony</Name>
              <RateStars>
                <Icon name="star" size={24} color="#3dc77b" />
                <Icon name="star" size={24} color="#3dc77b" />
                <Icon name="star" size={24} color="#3dc77b" />
                <Icon name="star" size={24} color="#3dc77b" />
                <Icon name="star-outline" size={24} color="#000" />
              </RateStars>
              <DateJoin>Ativo desde 10 Jun 2004</DateJoin>
              <Profission>Cozinheiro</Profission>
              <Age>24 Anos</Age>
              <Location>São Paulo - SP</Location>
            </UserDetail>
            <Title>Avaliações</Title>
            <RateList>
              <Card>
                <CardHeader>
                  <RowGroupSpaced>
                    <ColumnGroup>
                      <ItineraryName>Trilha do Elefante</ItineraryName>
                      <ItineraryDate>16 Jun 2020</ItineraryDate>
                    </ColumnGroup>
                    <IconContent>
                      <Icon name="content-paste" size={24} color="#FFF" />
                    </IconContent>
                  </RowGroupSpaced>
                </CardHeader>
                <CardCotent>
                  <RateStars>
                    <Icon name="star" size={24} color="#3dc77b" />
                    <Icon name="star" size={24} color="#3dc77b" />
                    <Icon name="star" size={24} color="#3dc77b" />
                    <Icon name="star" size={24} color="#3dc77b" />
                    <Icon name="star-outline" size={24} color="#000" />
                  </RateStars>
                </CardCotent>
              </Card>
            </RateList>
          </CardCotent>
        </Card>
        <ConnectButton>
          <ConnectButtonText>Conectar</ConnectButtonText>
          <Icon name="account-voice" size={24} color="#FFF" />
        </ConnectButton>
      </Content>
    </Container>
  );
};

export default UserDetails;
