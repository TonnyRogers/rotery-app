import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;

export const Fields = styled.View``;

export const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin: 10px;
`;

export const BackButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #9d9d9d;
`;

export const SubmitButton = styled.TouchableOpacity`
  flex: 1;
  height: 44px;
  background: #4885fd;
  border-radius: 8px;

  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 24px;
  color: #fff;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  padding: 5px 0;
`;

export const Logo = styled.Image`
  width: 145px;
  height: 34px;
  margin-top: 10px;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 24px;
  margin: 10px 0;
`;
