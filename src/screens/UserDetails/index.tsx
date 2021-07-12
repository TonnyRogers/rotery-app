import React, {useEffect, useState, useMemo, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';
import Toast from 'react-native-toast-message';

import api from '../../services/api';
import {RootStateProps} from '../../store/modules/rootReducer';
import {makeConnectionRequest} from '../../store/modules/connections/actions';

import {
  Container,
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

interface RateProps {
  id: number;
  description: string;
  rate: number;
  created_at: string;
}
interface ProfileProps {
  profission: string;
  created_at: string;
  birth: string;
  file: {
    url: string;
  };
  user: {
    username: string;
    created_at: string;
    rate: RateProps[];
  };
}

interface UserDetailsProps {
  route: {
    params: {userId: number};
  };
  navigation: any;
}

const UserDetails: React.FC<UserDetailsProps> = ({route, navigation}) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState([] as any);
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
    createDateFormated.current = format(
      parse(
        profile.created_at || '2020-08-10 10:00:00',
        'yyyy-MM-dd HH:mm:ss',
        new Date(),
      ),
      'dd MMM yyyy',
      {
        locale: pt,
      },
    );
  }, [profile]);

  const {connections} = useSelector(
    (state: RootStateProps) => state.connections,
  );
  const {user} = useSelector((state: RootStateProps) => state.auth);

  let finalRate = 0;
  let countRate = 0;
  profile.user &&
    profile.user.rate &&
    profile.user.rate.map((rate: RateProps) => {
      finalRate += rate.rate;
      countRate++;
    });

  const isConnection = connections?.find((connection) => {
    if (connection.owner_id === user.id) {
      return connection.user_id === userId ? true : false;
    } else if (connection.user_id === user.id) {
      return connection.owner_id === userId ? true : false;
    }
  });

  function askConnection() {
    dispatch(makeConnectionRequest(userId));
  }

  function formatDate(date: string) {
    return format(
      parse(date, 'yyyy-MM-dd HH:mm:ss', new Date()),
      'dd MMM yyyy',
      {
        locale: pt,
      },
    );
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
    <Container>
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
                  uri: profile.file && profile.file.url,
                }}
                style={{borderColor: '#e1e1e1'}}
              />
              <Text.Title>{profile.user && profile.user.username}</Text.Title>
              <RateStars>{renderRateStars(finalRate / countRate)}</RateStars>
              <Text textWeight="light">
                Ativo desde {createDateFormated.current}
              </Text>
              <Text textWeight="light">{profile.profission}</Text>
              <Text textWeight="light">{getAge(profile.birth)} Anos</Text>
              <Text textWeight="light">São Paulo - SP</Text>
            </UserDetail>
          </CardCotent>
        </Card>
        {!isConnection && userId !== user.id && (
          <ConnectButton onPress={askConnection}>
            <ConnectButtonText>Conectar</ConnectButtonText>
            <Icon name="account-voice" size={24} color="#FFF" />
          </ConnectButton>
        )}
        <Card>
          <TitleContent>
            <Text.Title>Avaliações</Text.Title>
          </TitleContent>
          <RateList>
            {profile.user &&
              profile.user.rate &&
              profile.user.rate.map((item: RateProps) => (
                <Card key={item.id}>
                  <CardHeader>
                    <RowGroupSpaced>
                      <ColumnGroup>
                        <Text.Paragraph textColor="secondary" textWeight="bold">
                          Host de Roteiro
                        </Text.Paragraph>
                        <Text textWeight="light">
                          {formatDate(item.created_at)}
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
    </Container>
  );
};

export default UserDetails;
