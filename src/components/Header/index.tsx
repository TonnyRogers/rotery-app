import React, {useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
// import {AppState} from 'react-native';

import {RootStateProps} from '../../store/modules/rootReducer';
import {
  hideFeedGuide,
  hideMyItineraryGuide,
  hideNewItineraryGuide,
} from '../../store/modules/guides/actions';
import {hideBottomSheet} from '../../store/modules/bottomsheet/actions';

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
import GuideCarousel from '../GuideCarousel';
import Ads from '../Ads';
import BottomSheet from '../BottomSheet';
import ConnectionShareList from '../ConnectionShareList';

const feedGuideImages = [
  {
    id: 1,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guide-filter-1.png',
    withInfo: true,
    title: 'Filtrando Roteiros 1/2',
    message: 'Clique no ícone de filtro para customizar o filtro de roteiros.',
    isAnimation: false,
  },
  {
    id: 2,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guide-filter-2.png',
    withInfo: true,
    title: 'Filtrando Roteiros 2/2',
    message:
      'Customize o filtro com base nas suas necessidades e clique em "filtrar".',
    isAnimation: false,
  },
  {
    id: 3,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guide-filter-1.png',
    withInfo: true,
    title: 'Limpando filtro',
    message: 'Clique e segure no botão de filtro até o dispositivo vibrar.',
    isAnimation: false,
  },
  {
    id: 4,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guide-reload-feed.png',
    withInfo: true,
    title: 'Carregando novos roteiros',
    message: 'Deslize os dedos para baixo para atualizar feed.',
    isAnimation: false,
  },
  {
    id: 5,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guide-new-itinerary.png',
    withInfo: true,
    title: 'Criando novo roteiro',
    message: 'Clique no ícone de "mais" para criar um novo roteiro.',
    isAnimation: false,
  },
];

const myGuideImages = [
  {
    id: 1,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-edit-itinerary.png',
    withInfo: true,
    title: 'Editando Roteiro',
    message: 'Clique no ícone de lápis para editar informações do seu roteiro.',
    isAnimation: false,
  },
  {
    id: 2,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-finish-itinerary.png',
    withInfo: true,
    title: 'Finalizando Roteiros',
    message:
      'Após o término do seu roteiro clique em finalizar para que os membros avaliem.',
    isAnimation: false,
  },
];

const newGuideImages = [
  {
    id: 1,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-1.png',
    withInfo: true,
    title: 'Criando Roteiros 1/4',
    message:
      'Ao criar um roteiro você pode adicionar fotos, descrição, quantidade de vagas, dar um nome, datas e muito mais.',
    isAnimation: false,
  },
  {
    id: 2,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-2.png',
    withInfo: true,
    title: 'Criando Roteiros 2/4',
    message:
      'Para dicionar uma Atividade, Hospedagem ou Transporte você deve clicar no "mais" após preencher os dados.',
    isAnimation: false,
  },
  {
    id: 3,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-3.png',
    withInfo: true,
    title: 'Criando Roteiros 3/4',
    message: 'Após isso você vai notar que um item será adicionado logo acima.',
    isAnimation: false,
  },
  {
    id: 4,
    url:
      'https://rotery-filestore.nyc3.digitaloceanspaces.com/guides-new-itinerary-3.png',
    withInfo: true,
    title: 'Criando Roteiros 4/4',
    message: 'Você pode remove-lo clicando no ícone de lixeira.',
    isAnimation: false,
  },
];

const Header: React.FC<HeaderProps> = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const {counter} = useSelector((state: RootStateProps) => state.notifications);
  const {feedGuide, myItineraryGuide, newItineraryGuide} = useSelector(
    (state: RootStateProps) => state.guides,
  );
  const bottomSheet = useSelector((state: RootStateProps) => state.bottomSheet);
  function toggleNotifications() {
    setNotificationVisible(!notificationVisible);
  }

  function toggleMenu() {
    setMenuVisible(!menuVisible);
  }

  const handleCloseFeedGuide = useCallback(() => {
    dispatch(hideFeedGuide());
  }, [dispatch]);

  const handleCloseMyGuide = useCallback(() => {
    dispatch(hideMyItineraryGuide());
  }, [dispatch]);

  const handleCloseNewGuide = useCallback(() => {
    dispatch(hideNewItineraryGuide());
  }, [dispatch]);

  const handleCloseBottomSheet = useCallback(() => {
    dispatch(hideBottomSheet());
  }, [dispatch]);

  function toProfileScreen() {
    navigation.navigate('Profile');
  }

  function renderBottomSheet() {
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
        onRequestClose={(value) => setNotificationVisible(value)}
        icon="bell-ring-outline"
        iconColor="#3dc77b"
      />
      <ModalMenu
        visible={menuVisible}
        onRequestClose={(value) => setMenuVisible(value)}
      />
      <Ads visible={feedGuide} onRequestClose={() => {}} key="guide-feed">
        <GuideCarousel
          data={feedGuideImages}
          onClose={() => handleCloseFeedGuide()}
        />
      </Ads>
      <Ads visible={myItineraryGuide} onRequestClose={() => {}}>
        <GuideCarousel
          data={myGuideImages}
          onClose={() => handleCloseMyGuide()}
          key="guide-my-itinerary"
        />
      </Ads>
      <Ads visible={newItineraryGuide} onRequestClose={() => {}}>
        <GuideCarousel
          data={newGuideImages}
          onClose={() => handleCloseNewGuide()}
        />
      </Ads>
      <BottomSheet
        visible={bottomSheet.visibility}
        onRequestClose={() => handleCloseBottomSheet()}>
        {renderBottomSheet()}
      </BottomSheet>
    </>
  );
};

export default Header;
