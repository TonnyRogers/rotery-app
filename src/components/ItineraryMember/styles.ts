import styled from 'styled-native-components';

export const Container = styled.View.attrs({})`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 5px;
  elevation: 2;
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
  height: 5rem;
  width: 5rem;
  border-radius: 0.8rem;
  margin-right: 0.5rem;
  background: #eee;
`;

export const Name = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
`;

export const JoinDate = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const MemberActions = styled.View`
  flex-direction: row;
`;

export const AdminButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 3.2rem;
  width: 3.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  margin-right: 1rem;
`;

export const AcceptButtonButton = styled.TouchableOpacity`
  background: #3dc77b;
  height: 3.2rem;
  width: 3.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
`;

export const RejectButtonButton = styled.TouchableOpacity`
  background: #f57373;
  height: 3.2rem;
  width: 3.2rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
`;

export const UserButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
