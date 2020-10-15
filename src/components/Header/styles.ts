import styled from 'styled-components/native';

export const Container = styled.View``;

export const Menu = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

export const ProfileButton = styled.TouchableOpacity`
  background: #3e44c7;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const NotificationsButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Notifications = styled.View`
  background: #f57373;
  width: 14px;
  height: 14px;
  border-radius: 7px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const Counter = styled.Text`
  font-family: 'Roboto';
  font-size: 10px;
  color: #fff;
`;

export const MenuButton = styled.TouchableOpacity`
  background: #3e44c7;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;
