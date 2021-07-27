import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const Container = styled.View`
  flex: 1;
  padding: 1rem;
  background: ${theme.colors.appBackground};
`;

export const Fields = styled.View``;

export const CenteredView = styled.View`
  flex: 1;
  align-items: center;
`;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin: 1rem;
`;

export const BackButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: #9d9d9d;
  color: #3dc77b;
  font-weight: bold;
`;

export const SubmitButton = styled.TouchableOpacity`
  flex: 1;
  height: 4.4rem;
  background: #4885fd;
  border-radius: 0.8rem;

  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 2.4rem;
  color: #fff;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
`;

export const Logo = styled.Image`
  width: 14.5rem;
  height: 3.4rem;
  margin-top: 1rem;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 2.4rem;
  margin: 1rem 0;
`;
