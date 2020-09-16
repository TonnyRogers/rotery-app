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
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

export const Title = styled.Text`
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: bold;
`;

export const Message = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #9d9d9d;
  margin-bottom: 10px;
  align-self: center;
`;

export const AlertActions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmButton = styled.TouchableOpacity`
  background: #3dc77b;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 37px;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-right: 5px;
`;

export const CancelButton = styled.TouchableOpacity`
  background: #f57373;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 37px;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: 5px;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  font-family: 'Roboto';
  color: #fff;
  font-weight: bold;
  margin: 0 8px;
`;

export const BaseBlock = styled.View`
  background: #9d9d9d;
  height: 7px;
  border-radius: 3px;
  width: 172px;
  margin-top: 90px;
`;
