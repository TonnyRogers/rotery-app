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

export const OwnerDetails = styled.View`
  flex-direction: row;
`;

export const Name = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
`;

export const UserImage = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 8px;
  margin-right: 5px;
  background: #eee;
`;

export const QuestionDate = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #9d9d9d;
`;

export const Question = styled.Text``;

export const AnswerContent = styled.View`
  background: #4885fd;
  min-height: 60px;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
`;

export const AnswerDate = styled.Text`
  margin-bottom: 10px;
  font-family: 'Roboto';
  font-size: 14px;
  color: #fff;
`;

export const Answer = styled.Text`
  font-family: 'Roboto';
  font-size: 14px;
  color: #fff;
`;

export const SendButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 40px;
  width: 120px;
  align-self: flex-end;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const SendButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 16px;
  font-weight: bold;
  color: #fff;
`;
