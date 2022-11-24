import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

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
import {theme} from '../../utils/theme';
import {RootState} from '../../providers/store';

const Header: React.FC<HeaderProps> = () => {
  const navigation = useNavigation();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const {counter} = useSelector((state: RootState) => state.notifications);

  // const bottomSheet = useSelector((state: RootState) => state.bottomSheet);
  function toggleNotifications() {
    setNotificationVisible(!notificationVisible);
  }

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

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

  // const renderBottomSheet = useCallback(() => {
  //   switch (bottomSheet.componentType) {
  //     case 'connectionShareList': {
  //       return (
  //         <ConnectionShareList
  //           data={{id: bottomSheet.data?.id, type: bottomSheet.data?.type}}
  //         />
  //       );
  //     }
  //     default:
  //       break;
  //   }
  // }, [bottomSheet.componentType, bottomSheet.data]);

  return (
    <>
      <Container>
        <Menu>
          <ProfileButton onPress={() => toProfileScreen()}>
            <Icon
              name="account-box-outline"
              size={24}
              color={theme.colors.blue}
            />
          </ProfileButton>
          <NotificationsButton onPress={toggleNotifications}>
            {renderNotificationCounter()}
            <Icon
              name="bell-ring-outline"
              size={24}
              color={theme.colors.green}
            />
          </NotificationsButton>
          <MenuButton onPress={toggleMenu}>
            <Icon name="menu" size={24} color={theme.colors.blue} />
          </MenuButton>
        </Menu>
      </Container>
      <Notification
        title="Notificações"
        visible={notificationVisible}
        onRequestClose={() => setNotificationVisible(false)}
        icon="bell-ring-outline"
        iconColor={theme.colors.green}
      />
      <ModalMenu
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      />
      {/* <BottomSheet title="" visible={false} onRequestClose={() => {}}>
        {renderBottomSheet()}
      </BottomSheet> */}
    </>
  );
};

export default Header;
