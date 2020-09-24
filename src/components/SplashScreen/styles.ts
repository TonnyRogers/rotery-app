import styled from 'styled-components/native';

export const Container = styled.Modal``;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  background: rgba(0, 0, 0, 0.8);
  flex: 1;
  justify-content: center;
`;

export const Content = styled.View.attrs({
  elevation: 3,
})`
  background: #fff;
  min-height: 300px;
  padding: 10px;
  margin: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const Logo = styled.Image`
  height: 130px;
  width: 130px;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
`;
