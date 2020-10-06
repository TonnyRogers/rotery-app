import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {logout} from '../../store/modules/auth/actions';

import {
  Container,
  Content,
  Header,
  KeyboardAvoidingView,
  Title,
  Actions,
  MenuButton,
  MessageButtonText,
  CounterContent,
  Counter,
  ItinerariesButtonText,
  FavoritesButtonText,
  SignOutButton,
  SignOutButtonText,
} from './styles';

interface ModalMenuProps {
  visible: boolean;
  onRequestClose(): void;
}

const ModalMenu: React.FC<ModalMenuProps> = ({
  visible,
  onRequestClose,
  children,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function handleLogout() {
    dispatch(logout());
  }

  function toItineraries() {
    onRequestClose();
    navigation.navigate('MyItineraries');
  }

  function toNextItineraries() {
    onRequestClose();
    navigation.navigate('NextItineraries');
  }

  function toFavorites() {
    onRequestClose();
    navigation.navigate('Favorites');
  }

  function toConnections() {
    onRequestClose();
    navigation.navigate('Connections');
  }

  function toDirecMessages() {
    onRequestClose();
    navigation.navigate('DirectMessagesTabs');
  }

  return (
    <Container
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={() => onRequestClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Content>
          <Header>
            <Icon name="menu" size={24} color="#3e44c7" />
            <Title>Menu</Title>
          </Header>
          <Actions>
            <MenuButton onPress={toConnections}>
              <Icon name="link-variant" size={24} color="#FFF" />
              <ItinerariesButtonText>Minhas Conexões</ItinerariesButtonText>
              <View />
            </MenuButton>
            <MenuButton onPress={toDirecMessages}>
              <Icon name="inbox-arrow-down-outline" size={24} color="#FFF" />
              <MessageButtonText>Mensagens Diretas</MessageButtonText>
              <CounterContent>
                <Counter>8</Counter>
              </CounterContent>
            </MenuButton>
            <MenuButton onPress={toItineraries}>
              <Icon name="map-outline" size={24} color="#FFF" />
              <ItinerariesButtonText>Meus Roteiros</ItinerariesButtonText>
              <View />
            </MenuButton>
            <MenuButton onPress={toNextItineraries}>
              <Icon name="map-check" size={24} color="#FFF" />
              <ItinerariesButtonText>Próximos Roteiros</ItinerariesButtonText>
              <View />
            </MenuButton>
            <MenuButton onPress={toFavorites}>
              <Icon name="heart-outline" size={24} color="#FFF" />
              <FavoritesButtonText>Favoritos</FavoritesButtonText>
              <View />
            </MenuButton>
            <MenuButton onPress={() => navigation.navigate('Feed')}>
              <Icon name="format-list-text" size={24} color="#FFF" />
              <FavoritesButtonText>Feed</FavoritesButtonText>
              <View />
            </MenuButton>
            <SignOutButton onPress={() => handleLogout()}>
              <SignOutButtonText>Sair</SignOutButtonText>
            </SignOutButton>
            {children}
          </Actions>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ModalMenu;
