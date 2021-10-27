/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useMemo, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

import api from '../../services/api';
import {RootStateProps} from '../../store/modules/rootReducer';
import {makeConnectionRequest} from '../../store/modules/connections/actions';

import {
  Content,
  CardHeader,
  BackButton,
  CardCotent,
  UserDetail,
  Avatar,
  TitleContent,
  ConnectButton,
  ConnectButtonText,
  RateStars,
  RateList,
  IconContent,
  RowGroupSpaced,
  ColumnGroup,
  UserRate,
} from './styles';
import Card from '../../components/Card';
import Text from '../../components/Text';
import Page from '../../components/Page';
import {ProfileProps} from '../../utils/types';
import formatLocale from '../../providers/dayjs-format-locale';

interface RateProps {
  id: number;
  description: string;
  rate: number;
  createdAt: string;
}

interface UserDetailsProps {
  route: {
    params: {userId: number};
  };
  navigation: any;
}

const UserDetails: React.FC<UserDetailsProps> = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<ProfileProps | undefined>(undefined);
  const {userId} = route.params;

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await api.get(`/profile/${userId}`);
        setProfile(response.data);
      } catch (error) {
        Toast.show({
          text1: 'Erro ao buscar dados.',
          position: 'bottom',
          type: 'error',
        });
      }
    }

    getProfile();

    () => {
      getProfile;
    };
  }, [userId]);

  function renderRateStars(rate: number) {
    const starsComponent = [];
    for (let index = 1; index <= 5; index++) {
      starsComponent.push(
        rate >= index ? (
          <Icon key={Math.random()} name="star" size={24} color="#3dc77b" />
        ) : (
          <Icon
            key={Math.random()}
            name="star-outline"
            size={24}
            color="#000"
          />
        ),
      );
    }
    return starsComponent;
  }

  let createDateFormated = useRef('');

  useMemo(() => {
    createDateFormated.current = formatLocale(
      String(profile?.createdAt),
      'DD MMM YYYY',
    );
  }, [profile]);

  const {connections} = useSelector(
    (state: RootStateProps) => state.connections,
  );
  const {user} = useSelector((state: RootStateProps) => state.auth);

  let finalRate = 0;
  let countRate = 0;
  profile?.user &&
    profile.user.ratings &&
    profile.user.ratings.map((rate: RateProps) => {
      finalRate += rate.rate;
      countRate++;
    });

  const isConnection = connections?.find((connection) => {
    if (connection.owner.id === user?.id && connection.target.id === userId) {
      return true;
    }
  });

  function askConnection() {
    dispatch(makeConnectionRequest(userId));
  }

  function formatDate(date: string) {
    return formatLocale(date, 'DD MMM YYYY');
  }

  function getAge(birthDate: string) {
    const currentDate = new Date();
    const birth = new Date(birthDate);

    let age = currentDate.getFullYear() - birth.getFullYear();
    const month = currentDate.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && currentDate.getDate() < birth.getDate())) {
      age = age - 1;
    }

    return age;
  }

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Page showHeader={false}>
      <Content>
        <Card>
          <CardHeader>
            <BackButton onPress={goBack}>
              <Icon name="chevron-left" size={24} color="#3dc77b" />
            </BackButton>
          </CardHeader>
          <CardCotent>
            <UserDetail>
              <Avatar
                source={{
                  uri: profile?.file?.url,
                }}
                style={{borderColor: '#e1e1e1'}}
              />
              <Text.Title alignment="center">
                {profile?.user && profile.user.username}
              </Text.Title>
              <RateStars>{renderRateStars(finalRate / countRate)}</RateStars>
              <Text alignment="center" textWeight="light">
                Ativo desde {createDateFormated.current}
              </Text>
              <Text alignment="center" textWeight="light">
                {profile?.profission}
              </Text>
              <Text alignment="center" textWeight="light">
                {profile?.birth ? `${getAge(profile?.birth)} Anos` : null}
              </Text>
              <Text alignment="center" textWeight="light">
                {profile?.location}
              </Text>
            </UserDetail>
          </CardCotent>
        </Card>
        {!isConnection && userId !== user?.id && (
          <ConnectButton onPress={askConnection}>
            <ConnectButtonText>Conectar</ConnectButtonText>
            <Icon name="account-voice" size={24} color="#FFF" />
          </ConnectButton>
        )}
        <Card>
          <TitleContent>
            <Text.Title alignment="center">Avaliações</Text.Title>
          </TitleContent>
          <RateList>
            {profile?.user &&
              profile.user.ratings &&
              profile.user.ratings.map((item: RateProps) => (
                <Card key={item.id}>
                  <CardHeader>
                    <RowGroupSpaced>
                      <ColumnGroup>
                        <Text.Paragraph textColor="secondary" textWeight="bold">
                          Host de Roteiro
                        </Text.Paragraph>
                        <Text textWeight="light">
                          {formatDate(item.createdAt)}
                        </Text>
                      </ColumnGroup>
                      <IconContent>
                        <Icon name="content-paste" size={24} color="#FFF" />
                      </IconContent>
                    </RowGroupSpaced>
                  </CardHeader>
                  <CardCotent>
                    <UserRate>
                      <Text textWeight="light">{item.description}</Text>
                      <Text>{renderRateStars(item.rate)}</Text>
                    </UserRate>
                  </CardCotent>
                </Card>
              ))}
          </RateList>
        </Card>
      </Content>
    </Page>
  );
};

export default UserDetails;
