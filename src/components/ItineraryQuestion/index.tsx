import React, {useState, useRef, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {format, parse} from 'date-fns';
import {pt} from 'date-fns/locale';

import {replyQuestionRequest} from '../../store/modules/itineraries/actions';

import {
  Container,
  OwnerDetails,
  UserImage,
  ColumnGroup,
  Name,
  QuestionDate,
  Question,
  AnswerContent,
  AnswerDate,
  Answer,
  SendButton,
  SendButtonText,
} from './styles';
import TextArea from '../TextArea';

import {QuestionProps} from '../../store/modules/itineraries/reducer';

interface ItineraryQuestionProps {
  question: QuestionProps;
  owner?: boolean;
}

const ItineraryQuestion: React.FC<ItineraryQuestionProps> = ({
  question,
  owner,
}) => {
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState('');
  const answerRef = useRef();

  let createDateFormated = useRef('');
  let updateDateFormated = useRef('');
  useMemo(() => {
    createDateFormated.current = format(
      parse(question.created_at, 'yyyy-MM-dd HH:mm:ss', new Date()),
      ' dd MMM yyyy H:mm',
      {
        locale: pt,
      },
    );
    updateDateFormated.current = format(
      parse(question.updated_at, 'yyyy-MM-dd HH:mm:ss', new Date()),
      ' dd MMM yyyy H:mm',
      {
        locale: pt,
      },
    );
  }, [question.created_at, question.updated_at]);

  function handleSubmitAnwser(questionId: number) {
    if (!answer) {
      return;
    }

    dispatch(replyQuestionRequest(question.itinerary_id, questionId, answer));
    setAnswer('');
  }

  return (
    <Container>
      <OwnerDetails>
        <UserImage
          source={{
            uri: question.owner.person.file?.url,
          }}
          resizeMode="cover"
        />
        <ColumnGroup>
          <Name>{question.owner.username}</Name>
          <QuestionDate>{createDateFormated.current}</QuestionDate>
        </ColumnGroup>
      </OwnerDetails>
      <Question>{question.question}</Question>
      {owner ? (
        question.anwser ? (
          <AnswerContent>
            <AnswerDate>{updateDateFormated.current}</AnswerDate>
            <Answer>{question.anwser}</Answer>
          </AnswerContent>
        ) : (
          <>
            <TextArea
              placeholder="sua resposta..."
              value={answer}
              ref={answerRef}
              onChange={setAnswer}
            />
            <SendButton onPress={() => handleSubmitAnwser(question.id)}>
              <Icon name="send-outline" size={24} color="#FFF" />
              <SendButtonText>Responder</SendButtonText>
            </SendButton>
          </>
        )
      ) : (
        question.anwser && (
          <AnswerContent>
            <AnswerDate>{updateDateFormated.current}</AnswerDate>
            <Answer>{question.anwser}</Answer>
          </AnswerContent>
        )
      )}
    </Container>
  );
};

export default ItineraryQuestion;
