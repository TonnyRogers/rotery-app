import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {AppState} from 'react-native';

import {RootStateProps} from '../../store/modules/rootReducer';

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

const Header: React.FC<HeaderProps> = () => {
  const navigation = useNavigation();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextState: any) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextState === 'active'
    ) {
      console.tron.log('App has come to the foreground!');
    }

    appState.current = nextState;
    console.tron.log('AppState', appState.current);
  };

  const {counter} = useSelector((state: RootStateProps) => state.notifications);

  function toggleNotifications() {
    setNotificationVisible(!notificationVisible);
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
          <NotificationsButton onPress={toggleNotifications}>
            {counter > 0 && (
              <Notifications>
                <Counter>{counter}</Counter>
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
        visible={notificationVisible}
        onRequestClose={() => toggleNotifications}
        icon="bell-ring-outline"
        iconColor="#3dc77b">
        <CloseButton onPress={toggleNotifications}>
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
