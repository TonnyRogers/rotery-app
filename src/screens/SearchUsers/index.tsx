import React, {useState, useRef, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../providers/api';

import {
  Container,
  CardContent,
  UserButton,
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
import {FlatList} from 'react-native-gesture-handler';
import Empty from '../../components/Empty';
import {ListRenderItemInfo} from 'react-native';
import {UserProps} from '../../utils/types';
import formatLocale from '../../providers/dayjs-format-locale';
import {LoadingContext} from '../../context/loading/context';

const SearchUsers: React.FC = () => {
  const {setLoading} = useContext(LoadingContext);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);

  const searchRef = useRef();

  async function searchUser() {
    try {
      setLoading(true);
      const response = await api.get(`/users?username=${search}`);
      setLoading(false);
      setUserList(response.data);
    } catch (error) {
      setLoading(false);
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
    return formatLocale(date, 'DD MMM YY');
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
              ref={searchRef.current}
              returnKeyType="search"
              returnKeyLabel="buscar"
              onSubmitEditing={searchUser}
            />
            <FlatList
              showsVerticalScrollIndicator={false}
              removeClippedSubviews
              initialNumToRender={3}
              data={userList}
              keyExtractor={(item: UserProps) => String(item.id)}
              renderItem={({item}: ListRenderItemInfo<UserProps>) => (
                <User key={item.id}>
                  <UserButton onPress={() => viewProfile(item.id)}>
                    <UserImage
                      source={{
                        uri: item && item.profile.file?.url,
                      }}
                      resizeMode="cover"
                    />
                  </UserButton>
                  <ColumnGroup>
                    <Text.Paragraph textColor="secondaryText" textWeight="bold">
                      {item.username}
                    </Text.Paragraph>
                    <Text textWeight="light">
                      Ativo desde {formatDate(item.createdAt)}
                    </Text>
                  </ColumnGroup>
                </User>
              )}
              ListEmptyComponent={() => (
                <Empty title="Ops!" subTitle="Nenhum usuário encontrado." />
              )}
            />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default SearchUsers;
