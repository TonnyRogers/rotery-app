import React from 'react';
import {Platform} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {logout} from '../../store/modules/auth/actions';
import {RootStateProps} from '../../store/modules/rootReducer';

import {
  Container,
  Content,
  Header,
  KeyboardAvoidingView,
  Title,
  Actions,
  MenuButton,
  MenuButtonText,
  CounterContent,
  Counter,
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

  const {unreadCounter} = useSelector(
    (state: RootStateProps) => state.messages,
  );

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
              <MenuButtonText>Minhas Conexões</MenuButtonText>
            </MenuButton>
            <MenuButton onPress={toDirecMessages}>
              <Icon name="inbox-arrow-down-outline" size={24} color="#FFF" />
              <MenuButtonText>Mensagens Diretas</MenuButtonText>
              <CounterContent>
                <Counter>{unreadCounter}</Counter>
              </CounterContent>
            </MenuButton>
            <MenuButton onPress={toItineraries}>
              <Icon name="map-outline" size={24} color="#FFF" />
              <MenuButtonText>Meus Roteiros</MenuButtonText>
            </MenuButton>
            <MenuButton onPress={toNextItineraries}>
              <Icon name="map-check" size={24} color="#FFF" />
              <MenuButtonText>Próximos Roteiros</MenuButtonText>
            </MenuButton>
            <MenuButton onPress={toFavorites}>
              <Icon name="heart-outline" size={24} color="#FFF" />
              <MenuButtonText>Favoritos</MenuButtonText>
            </MenuButton>
            <MenuButton onPress={() => navigation.navigate('Feed')}>
              <Icon name="format-list-text" size={24} color="#FFF" />
              <MenuButtonText>Feed</MenuButtonText>
            </MenuButton>
          </Actions>
          <SignOutButton onPress={() => handleLogout()}>
            <SignOutButtonText>Sair</SignOutButtonText>
          </SignOutButton>
          {children}
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ModalMenu;
