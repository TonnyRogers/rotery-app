import React, {useRef, useMemo, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {replyQuestionRequest} from '../../store/modules/itineraries/actions';
import isOpen from '../../guards/itineraryStatus';

import {
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

import {QuestionProps, ItineraryProps} from '../../utils/types';
import ShadowBox from '../ShadowBox';
import {formatLocale} from '../../providers/dayjs-format-locale';
import {YupValidationMessages} from '../../utils/enums';

const validationSchema = yup.object().shape({
  answer: yup.string().required(YupValidationMessages.REQUIRED),
});

interface ItineraryQuestionProps {
  question: QuestionProps;
  owner?: boolean;
  itinerary: ItineraryProps;
}

const ItineraryQuestion: React.FC<ItineraryQuestionProps> = ({
  question,
  owner,
  itinerary,
}) => {
  const dispatch = useDispatch();
  const answerRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({resolver: yupResolver(validationSchema)});

  let createDateFormated = useRef('');
  let updateDateFormated = useRef('');

  useEffect(() => {
    register('answer');
  }, [register]);

  useMemo(() => {
    createDateFormated.current = formatLocale(question.createdAt, 'DD MMM YY');
    updateDateFormated.current = formatLocale(question.updatedAt, 'DD MMM YY');
  }, [question]);

  const handleSubmitAnwser = (data: any) => {
    dispatch(
      replyQuestionRequest(question.itinerary, question.id, data.answer),
    );
  };

  return (
    <ShadowBox>
      <OwnerDetails>
        <UserImage
          source={{
            uri: question.owner.profile.file?.url || undefined,
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
        question.answer ? (
          <AnswerContent>
            <AnswerDate>{updateDateFormated.current}</AnswerDate>
            <Answer>{question.answer}</Answer>
          </AnswerContent>
        ) : (
          isOpen(itinerary.status, () => (
            <>
              <TextArea
                placeholder="sua resposta..."
                ref={answerRef}
                onChange={(value: string) => setValue('answer', value)}
                error={errors.answer?.message}
              />
              <SendButton onPress={handleSubmit(handleSubmitAnwser)}>
                <Icon name="send-outline" size={24} color="#FFF" />
                <SendButtonText>Responder</SendButtonText>
              </SendButton>
            </>
          ))
        )
      ) : (
        question.answer && (
          <AnswerContent>
            <AnswerDate>{updateDateFormated.current}</AnswerDate>
            <Answer>{question.answer}</Answer>
          </AnswerContent>
        )
      )}
    </ShadowBox>
  );
};

export default ItineraryQuestion;
