import styled from 'styled-native-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 2rem;
`;

export const RowGroup = styled.View`
  flex-direction: row;
`;

export const Header = styled.View`
  padding: 0.5rem 0;
`;

export const BackButton = styled.TouchableOpacity`
  height: 4rem;
  width: 4rem;
  border-radius: 2rem;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const Logo = styled.Image`
  width: 14.5rem;
  height: 3.4rem;
  margin-top: 1rem;
  align-self: center;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 2.4rem;
  margin: 1rem 0;
  align-self: center;
`;

export const Fields = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  margin: 2rem 0;
`;

export const InputField = styled.View`
  background: #fff;
  border-radius: 0.8rem;
  justify-content: center;
  align-items: center;
  padding: 0.4rem;
`;

export const NumberInput = styled.TextInput`
  font-family: 'Roboto';
  font-size: 2.4rem;
  font-weight: bold;
`;

export const ChangePasswordForm = styled.View``;

export const SubmitButton = styled.TouchableOpacity`
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

export const Span = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  text-align: center;
  color: #808080;
`;
