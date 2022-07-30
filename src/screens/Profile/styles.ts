import styled from 'styled-native-components';
import {theme} from '../../utils/theme';

export const SafeView = styled.View`
  flex: 1;
`;

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

export const UserName = styled.Text`
  font-family: 'Roboto';
  font-size: 2.4rem;
  font-weight: bold;
`;

export const Reputation = styled.View`
  flex-direction: row;
`;

export const Joined = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const InputContent = styled.View`
  flex: 1;
  width: 100%;
`;

export const ActionContent = styled.View`
  flex: 1;
  width: 100%;
`;

export const AlertContent = styled.View`
  align-items: center;
  justify-content: center;
`;

export const AlertText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  color: #9d9d9d;
  margin-bottom: 1rem;
`;

export const AlertActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background: #3dc77b;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  height: 4.4rem;
  padding: 1rem 2rem;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-right: 0.5rem;
`;

export const CancelButton = styled.TouchableOpacity`
  background: #f57373;
  border-top-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
  height: 4.4rem;
  padding: 1rem 2rem;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: 0.5rem;
`;

export const ButtonText = styled.Text`
  font-size: 2rem;
  font-family: 'Roboto';
  color: #fff;
  font-weight: bold;
  margin: 0 0.8rem;
`;

export const BaseBlock = styled.View`
  background: #9d9d9d;
  height: 0.7rem;
  border-radius: 0.3rem;
  width: 17.2rem;
  margin-top: 9rem;
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
