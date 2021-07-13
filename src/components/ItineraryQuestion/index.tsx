import React, {useState, useRef, useMemo} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {format} from 'date-fns';
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

import {QuestionProps} from '../../utils/types';
import {toDateTimeZone} from '../../utils/helpers';
import ShadowBox from '../ShadowBox';

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
    const createdZonedDate = toDateTimeZone(question.created_at);
    const updatedZonedDate = toDateTimeZone(question.updated_at);
    createDateFormated.current = format(createdZonedDate, ' dd MMM yyyy H:mm', {
      locale: pt,
    });
    updateDateFormated.current = format(updatedZonedDate, ' dd MMM yyyy H:mm', {
      locale: pt,
    });
  }, [question.created_at, question.updated_at]);

  function handleSubmitAnwser(questionId: number) {
    if (!answer) {
      return;
    }

    dispatch(replyQuestionRequest(question.itinerary_id, questionId, answer));
    setAnswer('');
  }

  return (
    <ShadowBox>
      <OwnerDetails>
        <UserImage
          source={{
            uri: question.owner.person.file?.url || undefined,
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
    </ShadowBox>
  );
};

export default ItineraryQuestion;
