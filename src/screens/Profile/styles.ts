import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const Container = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  flex-direction: column;
`;

export const CardHeader = styled.View``;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const User = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.Image`
  height: 11.4rem;
  width: 11.4rem;
  border-radius: 0.8rem;
  background: #f8f8f8;
  border-top-width: 0.1rem;
  border-right-width: 0.1rem;
  border-bottom-width: 0.1rem;
  border-left-width: 0.1rem;
`;

export const Reputation = styled.View`
  flex-direction: row;
`;

export const InputContent = styled.View`
  flex: 1;
  width: 100%;
`;

export const ActionContent = styled.View`
  flex: 1;
  align-items: flex-end;
`;

export const ChangeImageView = styled.View`
  background-color: ${theme.colors.blueDark};
  border-radius: 1rem;
  height: 4.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  margin: 1rem;
`;
