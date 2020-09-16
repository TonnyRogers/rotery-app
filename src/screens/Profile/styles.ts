import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex-direction: column;
  flex: 1;
`;

export const User = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Avatar = styled.Image`
  height: 114px;
  width: 114px;
  border-radius: 8px;
`;

export const ChangeAvatarButton = styled.TouchableOpacity`
  height: 31px;
  width: 114px;
  background: #3e44c7;
  border-radius: 8px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const ChangeAvatarButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #fff;
`;

export const UserName = styled.Text`
  font-family: 'Roboto';
  font-size: 24px;
  font-weight: bold;
`;

export const Reputation = styled.View`
  flex-direction: row;
`;

export const Joined = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
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

export const SubmitButton = styled.TouchableOpacity`
  background: #3dc77b;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  height: 37px;
  padding: 10px 20px;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
`;

export const SubmitButtonText = styled.Text`
  font-family: 'Roboto';
  font-weight: bold;
  color: #fff;
  font-size: 20px;
`;

export const DeleteAccountButton = styled.TouchableOpacity`
  flex-direction: row;
  background: #f57373;
  flex: 1;
  height: 52px;
  align-items: center;
  justify-content: center;
  margin: 10px;
  border-radius: 8px;
`;

export const DeleteAccountButtonText = styled.Text`
  font-size: 20px;
  font-family: 'Roboto';
  color: #fff;
  font-weight: bold;
  margin: 0 8px;
`;

export const AlertContent = styled.View`
  align-items: center;
  justify-content: center;
`;

export const AlertText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  color: #9d9d9d;
  margin-bottom: 10px;
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
