import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;

export const RowGroup = styled.View`
  flex-direction: row;
`;

export const Header = styled.View`
  padding: 5px 0;
`;

export const BackButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background: rgba(61, 199, 123, 0.2);
`;

export const Logo = styled.Image`
  width: 145px;
  height: 34px;
  margin-top: 10px;
  align-self: center;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 24px;
  margin: 10px 0;
  align-self: center;
`;

export const SubmitButton = styled.TouchableOpacity`
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
