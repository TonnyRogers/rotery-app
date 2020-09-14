import styled from 'styled-components/native';

export const Container = styled.Modal``;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  background: rgba(0, 0, 0, 0.8);
  flex: 1;
`;

export const Content = styled.View`
  background: #fff;
  min-height: 300px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
`;

export const NotificationList = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  max-height: 500px;
`;
