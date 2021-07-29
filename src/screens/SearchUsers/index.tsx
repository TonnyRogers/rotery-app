import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';

import {
  Container,
  CardContent,
  UserButton,
  UserList,
  User,
  UserImage,
  ColumnGroup,
  TitleContent,
  ContentHeader,
  BackButton,
} from './styles';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Page from '../../components/Page';
import Text from '../../components/Text';
import SplashScreen from '../../components/SplashScreen';

interface UserProps {
  id: number;
  username: string;
  created_at: string;
  person: {
    file: {
      url: string;
    };
  };
}

const SearchUsers: React.FC = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [isOnLoading, setIsOnLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  const searchRef = useRef();

  async function searchUser() {
    try {
      setIsOnLoading(true);
      const response = await api.get(`/users?username=${search}`);
      setIsOnLoading(false);
      setUserList(response.data.data);
    } catch (error) {
      setIsOnLoading(false);
      Toast.show({
        text1: 'Erro ao buscar usuários.',
        position: 'bottom',
        type: 'error',
      });
    }
  }

  function viewProfile(userId: number) {
    navigation.navigate('UserDetails', {
      userId,
    });
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

  function goBack() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <Page showHeader={false}>
      <Container>
        <ContentHeader>
          <BackButton onPress={goBack}>
            <Icon name="chevron-left" size={24} color="#3dc77b" />
          </BackButton>
          <TitleContent>
            <Text.Title>Amplie suas conexões</Text.Title>
          </TitleContent>
        </ContentHeader>

        <Card>
          <CardContent>
            <Input
              icon="magnify"
              placeholder="pesquisar por usuário"
              value={search}
              onChange={setSearch}
              ref={searchRef}
              returnKeyType="send"
              onSubmitEditing={searchUser}
            />
            <UserList>
              {userList[0] &&
                userList.map((user: UserProps) => (
                  <User key={user.id}>
                    <UserButton onPress={() => viewProfile(user.id)}>
                      <UserImage
                        source={{
                          uri: user.person.file && user.person.file.url,
                        }}
                        resizeMode="cover"
                      />
                    </UserButton>
                    <ColumnGroup>
                      <Text.Paragraph textColor="secondary" textWeight="bold">
                        {user.username}
                      </Text.Paragraph>
                      <Text textWeight="light">
                        Ativo desde {formatDate(user.created_at)}
                      </Text>
                    </ColumnGroup>
                  </User>
                ))}
            </UserList>
          </CardContent>
        </Card>
      </Container>
      <SplashScreen visible={isOnLoading} />
    </Page>
  );
};

export default SearchUsers;
