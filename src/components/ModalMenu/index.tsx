import React, {useRef, useCallback, useEffect} from 'react';
import {Dimensions, PanResponder, Animated} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {logout} from '../../store/modules/auth/actions';
import {RootStateProps} from '../../store/modules/rootReducer';
import * as RootNavigation from '../../RootNavigation';

import {
  Container,
  Content,
  Header,
  Actions,
  MenuButton,
  MenuButtonText,
  CounterContent,
  Counter,
  SignOutButton,
  SignOutButtonText,
  CloseButton,
} from './styles';
import Text from '../Text';
import {useUserIsHost} from '../../hooks/useUserIsHost';

interface ModalMenuProps {
  visible: boolean;
  onRequestClose(): void;
}

const ModalMenu: React.FC<ModalMenuProps> = ({visible, onRequestClose}) => {
  const dispatch = useDispatch();
  const {height} = Dimensions.get('screen');
  const panY = useRef(new Animated.ValueXY({x: 0, y: -height})).current;
  const {user} = useSelector((state: RootStateProps) => state.auth);
  const {conditionalRender} = useUserIsHost();

  const handleOpen = useCallback(() => {
    Animated.timing(panY.y, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [panY.y]);

  const handleDismiss = useCallback(() => {
    Animated.timing(panY.y, {
      toValue: -height,
      duration: 500,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      onRequestClose();
    }, 500);
  }, [height, onRequestClose, panY.y]);

  const panRespoders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (e, gs) => {
        if (gs.dy < 0) {
          panY.setValue({x: 0, y: gs.dy});
        }
      },
      onPanResponderRelease: (e, gs) => {
        if (gs.dy < 0 && gs.vy > 1) {
          return handleDismiss();
        }
        Animated.spring(panY.y, {
          toValue: 0,
          bounciness: 3,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  useEffect(() => {
    if (visible === true) {
      handleOpen();
    }
  }, [handleDismiss, handleOpen, visible]);

  const {unreadCounter} = useSelector(
    (state: RootStateProps) => state.messages,
  );

  async function handleLogout() {
    onRequestClose();
    dispatch(logout());
  }

  function toItineraries() {
    if (user?.isHost) {
      onRequestClose();
      RootNavigation.replace('MyItineraries');
    }
  }

  function toNextItineraries() {
    onRequestClose();
    RootNavigation.replace('NextItineraries');
  }

  function toFavorites() {
    onRequestClose();

    RootNavigation.replace('Favorites');
  }

  function toConnections() {
    onRequestClose();
    RootNavigation.replace('Connections');
  }

  function toDirecMessages() {
    onRequestClose();
    RootNavigation.replace('DirectMessagesTabs');
  }

  function toFeed() {
    onRequestClose();
    RootNavigation.replace('Feed');
  }

  function toNewItinerary() {
    onRequestClose();
    RootNavigation.navigate('NewItinerary');
  }

  if (!visible) {
    return null;
  }

  return (
    <Container>
      <Content
        style={{
          transform: [
            {
              translateY: panY.y.interpolate({
                inputRange: [-100, 0, 1],
                outputRange: [-100, 0, 1],
              }),
            },
          ],
        }}
        {...panRespoders.panHandlers}>
        <Header>
          <Icon name="menu" size={24} color="#3e44c7" />
          <Text.Title>Menu</Text.Title>
        </Header>
        <Actions>
          <MenuButton onPress={toFavorites}>
            <Icon name="heart-outline" size={24} color="#FFF" />
            <MenuButtonText>Favoritos</MenuButtonText>
          </MenuButton>
          <MenuButton onPress={toDirecMessages}>
            <Icon name="inbox-arrow-down-outline" size={24} color="#FFF" />
            <MenuButtonText>Mensagens Diretas</MenuButtonText>
            <CounterContent>
              <Counter>{unreadCounter}</Counter>
            </CounterContent>
          </MenuButton>
          <MenuButton
            active={user?.isHost}
            onPress={toItineraries}
            disabled={!user?.isHost}>
            <Icon
              name="map-outline"
              size={24}
              color={user?.isHost ? '#FFF' : '#999'}
            />
            <MenuButtonText active={user?.isHost}>Meus Roteiros</MenuButtonText>
          </MenuButton>
          {conditionalRender(
            <MenuButton onPress={toNewItinerary}>
              <Icon name="plus-box-outline" size={24} color="#FFF" />
              <MenuButtonText>Novo{'\n'}Roteiro</MenuButtonText>
            </MenuButton>,
            <MenuButton onPress={toNextItineraries}>
              <Icon name="map-check" size={24} color="#FFF" />
              <MenuButtonText>Próximos Roteiros</MenuButtonText>
            </MenuButton>,
          )}
          <MenuButton onPress={toConnections}>
            <Icon name="link-variant" size={24} color="#FFF" />
            <MenuButtonText>Minhas Conexões</MenuButtonText>
          </MenuButton>
          <MenuButton onPress={toFeed}>
            <Icon name="format-list-text" size={24} color="#FFF" />
            <MenuButtonText>Feed</MenuButtonText>
          </MenuButton>
        </Actions>
        <SignOutButton onPress={() => handleLogout()}>
          <SignOutButtonText>Sair</SignOutButtonText>
        </SignOutButton>
        <CloseButton onPress={handleDismiss}>
          <Icon name="chevron-up" size={24} color="#808080" />
        </CloseButton>
      </Content>
    </Container>
  );
};

export default ModalMenu;
