import React, {useRef, useCallback, useEffect} from 'react';
import {Platform, Dimensions, PanResponder, Animated} from 'react-native';
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
  CloseButton,
} from './styles';

interface ModalMenuProps {
  visible: boolean;
  onRequestClose(value: boolean): any;
}

const ModalMenu: React.FC<ModalMenuProps> = ({visible, onRequestClose}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {height} = Dimensions.get('screen');
  const panY = useRef(new Animated.ValueXY({x: 0, y: -height})).current;

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
      onRequestClose(false);
    }, 400);
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
    } else {
      handleDismiss();
    }
  }, [handleDismiss, handleOpen, visible]);

  const {unreadCounter} = useSelector(
    (state: RootStateProps) => state.messages,
  );

  async function handleLogout() {
    onRequestClose(false);
    dispatch(logout());
  }

  function toItineraries() {
    onRequestClose(false);
    navigation.navigate('MyItineraries');
  }

  function toNextItineraries() {
    onRequestClose(false);
    navigation.navigate('NextItineraries');
  }

  function toFavorites() {
    onRequestClose(false);
    navigation.navigate('Favorites');
  }

  function toConnections() {
    onRequestClose(false);
    navigation.navigate('Connections');
  }

  function toDirecMessages() {
    onRequestClose(false);
    navigation.navigate('DirectMessagesTabs');
  }

  return (
    <Container
      animated
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={() => onRequestClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
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
          <CloseButton onPress={handleDismiss}>
            <Icon name="chevron-up" size={24} color="#808080" />
          </CloseButton>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default ModalMenu;
