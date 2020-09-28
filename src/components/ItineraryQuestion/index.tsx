import React, {useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';

import {replyQuestionRequest} from '../../store/modules/itineraries/actions';

import {
  Container,
  OwnerDetails,
  UserImage,
  ColumnGroup,
  Name,
  QuestionDate,
  Question,
  AnwserContent,
  AnwserDate,
  Anwser,
  SendButton,
  SendButtonText,
} from './styles';
import TextArea from '../TextArea';

import {QuestionProps} from '../../store/modules/itineraries/reducer';

interface ItineraryQuestionProps {
  question: QuestionProps;
}

const ItineraryQuestion: React.FC<ItineraryQuestionProps> = ({question}) => {
  const dispatch = useDispatch();
  const [anwser, setAnwser] = useState('');
  const anwserRef = useRef();

  function handleSubmitAnwser(questionId: number) {
    if (!anwser) {
      return;
    }

    dispatch(replyQuestionRequest(question.itinerary_id, questionId, anwser));
    setAnwser('');
  }

  return (
    <Container>
      <OwnerDetails>
        <UserImage
          source={{
            uri: question.owner.person.file?.url || '..',
          }}
          resizeMode="cover"
        />
        <ColumnGroup>
          <Name>{question.owner.username}</Name>
          <QuestionDate>{question.created_at}</QuestionDate>
        </ColumnGroup>
      </OwnerDetails>
      <Question>{question.question}</Question>
      {question.anwser ? (
        <AnwserContent>
          <AnwserDate>{question.updated_at}</AnwserDate>
          <Anwser>{question.anwser}</Anwser>
        </AnwserContent>
      ) : (
        <>
          <TextArea
            placeholder="sua resposta..."
            value={anwser}
            ref={anwserRef}
            onChange={setAnwser}
          />
          <SendButton onPress={() => handleSubmitAnwser(question.id)}>
            <Icon name="send-outline" size={24} color="#FFF" />
            <SendButtonText>Responder</SendButtonText>
          </SendButton>
        </>
      )}
    </Container>
  );
};

export default ItineraryQuestion;
