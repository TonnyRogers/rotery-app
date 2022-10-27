/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useMemo, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

import api from '../../providers/api';
import {RootStateProps} from '../../store/modules/rootReducer';
import {makeConnectionRequest} from '../../store/modules/connections/actions';

import {
  CardHeader,
  BackButton,
  CardCotent,
  UserDetail,
  Avatar,
  TitleContent,
  ConnectButton,
  ConnectButtonText,
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
import StarRate from '../../components/StarRate';
import {PageContainer} from '../../components/PageContainer';

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
      <PageContainer isScrollable>
        <Card marginHorizontal={0} marginVertical={8}>
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
              <StarRate rate={profile?.user.ratingAvg || 0} size="regular" />
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
        {profile?.user && profile?.user.isGuide && (
          <Card marginHorizontal={0} marginVertical={8}>
            <TitleContent>
              <Text.Title alignment="center">Avaliações</Text.Title>
            </TitleContent>
            <RateList>
              {profile.user.ratings &&
                profile.user.ratings.map((item, index) => (
                  <Card marginHorizontal={0} key={index}>
                    <CardHeader>
                      <RowGroupSpaced>
                        <ColumnGroup>
                          <Text.Paragraph
                            textColor="secondaryText"
                            textWeight="bold">
                            {item.owner.username}
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
                        <StarRate rate={item.rate} size="regular" />
                      </UserRate>
                    </CardCotent>
                  </Card>
                ))}
            </RateList>
          </Card>
        )}
      </PageContainer>
    </Page>
  );
};

export default UserDetails;
