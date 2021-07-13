import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
// import {AppState} from 'react-native';

import {RootStateProps} from '../../store/modules/rootReducer';
// import {hideBottomSheet} from '../../store/modules/bottomsheet/actions';

import {
  Container,
  Menu,
  ProfileButton,
  NotificationsButton,
  MenuButton,
  Notifications,
  Counter,
} from './styles';

interface HeaderProps {
  notifications?: number;
}

import Notification from '../Notification';
import ModalMenu from '../ModalMenu';
import BottomSheet from '../BottomSheet';
import ConnectionShareList from '../ConnectionShareList';

const Header: React.FC<HeaderProps> = () => {
  const navigation = useNavigation();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const {counter} = useSelector((state: RootStateProps) => state.notifications);

  const bottomSheet = useSelector((state: RootStateProps) => state.bottomSheet);
  function toggleNotifications() {
    setNotificationVisible(!notificationVisible);
  }

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  // const handleCloseBottomSheet = () => {
  //   dispatch(hideBottomSheet());
  // };

  const renderNotificationCounter = useCallback(
    () =>
      counter > 0 && (
        <Notifications>
          <Counter>{counter}</Counter>
        </Notifications>
      ),
    [counter],
  );

  function toProfileScreen() {
    navigation.navigate('Profile');
  }

  const renderBottomSheet = useCallback(() => {
    switch (bottomSheet.componentType) {
      case 'connectionShareList': {
        return (
          <ConnectionShareList
            data={{id: bottomSheet.data?.id, type: bottomSheet.data?.type}}
          />
        );
      }
      default:
        break;
    }
  }, [bottomSheet.componentType, bottomSheet.data]);

  return (
    <>
      <Container>
        <Menu>
          <ProfileButton onPress={() => toProfileScreen()}>
            <Icon name="account-box-outline" size={24} color="#FFF" />
          </ProfileButton>
          <NotificationsButton onPress={toggleNotifications}>
            {renderNotificationCounter()}
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
        onRequestClose={(value) => setNotificationVisible(value)}
        icon="bell-ring-outline"
        iconColor="#3dc77b"
      />
      <ModalMenu
        visible={menuVisible}
        onRequestClose={(value) => setMenuVisible(value)}
      />
      <BottomSheet visible={false} onRequestClose={() => {}}>
        {renderBottomSheet()}
      </BottomSheet>
    </>
  );
};

export default Header;
