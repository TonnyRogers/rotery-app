import styled from 'styled-components/native';

export const Container = styled.View.attrs({
  elevation: 3,
})`
  background: #fff;
  padding: 10px;
  border-radius: 8px;
  margin: 10px 5px;
`;

export const RowGroup = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RowGroupSpaced = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ColumnGroup = styled.View``;

export const MemberDetails = styled.View`
  flex-direction: row;
`;

export const UserImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 8px;
  margin-right: 5px;
  background: #eee;
`;

export const Name = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
`;

export const JoinDate = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;

export const MemberActions = styled.View`
  flex-direction: row;
`;

export const AdminButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 10px;
`;

export const AcceptButtonButton = styled.TouchableOpacity`
  background: #3dc77b;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const RejectButtonButton = styled.TouchableOpacity`
  background: #f57373;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;
