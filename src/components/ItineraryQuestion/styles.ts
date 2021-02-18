import styled from 'styled-native-components';

export const Container = styled.View.attrs({})`
  background: #fff;
  padding: 1rem;
  border-radius: 0.8rem;
  margin: 1rem 0.5rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
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
  font-size: 1.6rem;
  font-weight: bold;
`;

export const UserImage = styled.Image`
  height: 5rem;
  width: 5rem;
  border-radius: 0.8rem;
  margin-right: 0.5rem;
  background: #eee;
`;

export const QuestionDate = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #9d9d9d;
`;

export const Question = styled.Text``;

export const AnswerContent = styled.View`
  background: #4885fd;
  min-height: 6rem;
  border-radius: 0.8rem;
  padding: 1rem;
  margin-top: 1rem;
`;

export const AnswerDate = styled.Text`
  margin-bottom: 1rem;
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #fff;
`;

export const Answer = styled.Text`
  font-family: 'Roboto';
  font-size: 1.4rem;
  color: #fff;
`;

export const SendButton = styled.TouchableOpacity`
  background: #4885fd;
  height: 4rem;
  width: 12rem;
  align-self: flex-end;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
`;

export const SendButtonText = styled.Text`
  font-family: 'Roboto';
  font-size: 1.6rem;
  font-weight: bold;
  color: #fff;
`;
