import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Platform, View} from 'react-native';

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
  onRequestClose: () => {};
}

const ModalMenu: React.FC<ModalMenuProps> = ({
  visible,
  onRequestClose,
  children,
}) => {
  return (
    <Container
      visible={visible}
      animationType="fade"
      onRequestClose={() => onRequestClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Content>
          <Header>
            <Icon name="menu" size={24} color="#3e44c7" />
            <Title>Menu</Title>
          </Header>
          <Actions>
            <MenuButton onPress={() => {}}>
              <Icon name="inbox-arrow-down-outline" size={24} color="#FFF" />
              <MessageButtonText>Mensagens Diretas</MessageButtonText>
              <CounterContent>
                <Counter>8</Counter>
              </CounterContent>
            </MenuButton>
            <MenuButton onPress={() => {}}>
              <Icon name="map-outline" size={24} color="#FFF" />
              <ItinerariesButtonText>Seus Roteiros</ItinerariesButtonText>
              <View />
            </MenuButton>
            <MenuButton onPress={() => {}}>
              <Icon name="heart-outline" size={24} color="#FFF" />
              <FavoritesButtonText>Favoritos</FavoritesButtonText>
              <View />
            </MenuButton>
            <SignOutButton onPress={() => {}}>
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
