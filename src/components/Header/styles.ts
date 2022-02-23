import styled from 'styled-native-components';
import {theme} from '../../utils/theme';
// import {Platform} from 'react-native';

// const metric = Platform.OS === 'ios' ? '%' : 'vh';

export const Container = styled.View`
  margin-top: 1rem;
`;

export const Menu = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;
`;

export const ProfileButton = styled.TouchableOpacity`
  background: ${theme.colors.blueDark};
  border-top-right-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  width: 4rem;
  height: 4rem;
  justify-content: center;
  align-items: center;
`;

export const NotificationsButton = styled.TouchableOpacity`
  width: 5rem;
  height: 5rem;
  border-radius: 2rem;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Notifications = styled.View`
  background: ${theme.colors.red};
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 0.7rem;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0.3rem;
  right: 0rem;
`;

export const Counter = styled.Text`
  font-family: 'Roboto';
  font-size: 1rem;
  color: #fff;
`;

export const MenuButton = styled.TouchableOpacity`
  background: ${theme.colors.blueDark};
  border-top-left-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  width: 4rem;
  height: 4rem;
  justify-content: center;
  align-items: center;
`;
