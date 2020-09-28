import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Menu,
  ProfileButton,
  NotificationsButton,
  MenuButton,
  Notifications,
  Counter,
  CloseButton,
} from './styles';

interface HeaderProps {
  notifications?: number;
}

import Notification from '../Notification';

import ModalMenu from '../ModalMenu';

const Header: React.FC<HeaderProps> = ({notifications}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!modalVisible);
  }

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  function toProfileScreen() {
    navigation.navigate('Profile');
  }

  return (
    <>
      <Container>
        <Menu>
          <ProfileButton onPress={() => toProfileScreen()}>
            <Icon name="account-box-outline" size={24} color="#FFF" />
          </ProfileButton>
          <NotificationsButton onPress={toggleModal}>
            {notifications && (
              <Notifications>
                <Counter>{notifications}</Counter>
              </Notifications>
            )}
            <Icon name="bell-ring-outline" size={24} color="#3dc77b" />
          </NotificationsButton>
          <MenuButton onPress={toggleMenu}>
            <Icon name="menu" size={24} color="#FFF" />
          </MenuButton>
        </Menu>
      </Container>
      <Notification
        title="Notificações"
        visible={modalVisible}
        onRequestClose={() => toggleModal}
        icon="bell-ring-outline"
        iconColor="#3dc77b">
        <CloseButton onPress={toggleModal}>
          <Icon name="chevron-up" size={24} color="#808080" />
        </CloseButton>
      </Notification>
      <ModalMenu visible={menuVisible} onRequestClose={toggleMenu}>
        <CloseButton onPress={toggleMenu}>
          <Icon name="chevron-up" size={24} color="#808080" />
        </CloseButton>
      </ModalMenu>
    </>
  );
};

export default Header;
