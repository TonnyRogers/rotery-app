import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';
import Toast from 'react-native-toast-message';

import api from '../../services/api';

import {
  Container,
  CardContent,
  UserButton,
  UserList,
  User,
  UserImage,
  ColumnGroup,
  Name,
  JoinDate,
  Title,
} from './styles';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';

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
  const [userList, setUserList] = useState([]);

  const searchRef = useRef();

  async function searchUser() {
    try {
      const response = await api.get(`/users?username=${search}`);
      setUserList(response.data.data);
    } catch (error) {
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

  return (
    <Container>
      <Header />
      <Title>Amplie suas conexões</Title>
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
                    <Name>{user.username}</Name>
                    <JoinDate>
                      Ativo desde {formatDate(user.created_at)}
                    </JoinDate>
                  </ColumnGroup>
                </User>
              ))}
          </UserList>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SearchUsers;
