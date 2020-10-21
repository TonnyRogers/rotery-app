import {Alert} from 'react-native';
import {takeLatest, put, call, all} from 'redux-saga/effects';

import api from '../../../services/api';
import * as RootNavigation from '../../../RootNavigation';
import {
  getItinerariesRequest,
  getItinerariesSuccess,
  createItineraryRequest,
  createItinerarySuccess,
  createItineraryFailure,
  deleteItineraryRequest,
  deleteItinerarySuccess,
  deleteItineraryFailure,
  updateItineraryRequest,
  updateItinerarySuccess,
  updateItineraryFailure,
  replyQuestionRequest,
  replyQuestionSuccess,
  replyQuestionFailure,
  promoteMemberRequest,
  promoteMemberSuccess,
  promoteMemberFailure,
  demoteMemberRequest,
  demoteMemberSuccess,
  demoteMemberFailure,
  acceptMemberRequest,
  acceptMemberSuccess,
  acceptMemberFailure,
  removeMemberRequest,
  removeMemberSuccess,
  removeMemberFailure,
} from './actions';

import {setLoadingTrue, setLoadingFalse} from '../auth/actions';
interface UpdateItemProps {
  id: number;
  capacity: number;
  description: string | null;
  price: number | null;
}

export function* getItineraries() {
  try {
    yield put(setLoadingTrue());

    const response = yield call(api.get, '/itineraries');

    yield put(getItinerariesSuccess(response.data));
    yield put(setLoadingFalse());
  } catch (error) {
    yield put(setLoadingFalse());
    Alert.alert('Erro ao buscar seus roteiros');
  }
}

export function* createItinerary({
  payload,
}: ReturnType<typeof createItineraryRequest>) {
  try {
    const {
      name,
      dateBegin,
      dateEnd,
      dateLimit,
      location,
      capacity,
      description,
      images,
      lodgings,
      activities,
      transports,
    } = payload;

    const imageArray: {id: number}[] = [];

    images?.forEach((image) => {
      imageArray.push({id: image.id});
    });
    yield put(setLoadingTrue());
    const response = yield call(api.post, '/itineraries', {
      name,
      description,
      dateBegin,
      dateEnd,
      dateLimit,
      capacity,
      location,
      lodgings,
      activities,
      transports,
      photos: imageArray,
    });

    yield put(createItinerarySuccess(response.data));
    yield put(setLoadingFalse());
    yield put(getItinerariesRequest());
    RootNavigation.navigate('MyItineraries', {});
  } catch (error) {
    yield put(createItineraryFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao criar roteiro.');
  }
}

export function* deleteItinerary({
  payload,
}: ReturnType<typeof deleteItineraryRequest>) {
  try {
    yield put(setLoadingTrue());

    const {itineraryId} = payload;
    yield call(api.delete, `/itineraries/${itineraryId}`);

    yield put(deleteItinerarySuccess());
    yield put(getItinerariesRequest());
    yield put(setLoadingFalse());
    RootNavigation.navigate('MyItineraries', {});
    Alert.alert('Roteiro deletado.');
  } catch (error) {
    Alert.alert('Não foi possivel deletar roteiro.');
    yield put(deleteItineraryFailure());
    yield put(setLoadingFalse());
  }
}

export function* updateItinerary({
  payload,
}: ReturnType<typeof updateItineraryRequest>) {
  try {
    const {
      itineraryId,
      name,
      dateBegin,
      dateEnd,
      dateLimit,
      location,
      capacity,
      description,
      images,
      lodgings,
      activities,
      transports,
    } = payload;

    const imageArray: {id: number}[] = [];
    const transportArray: UpdateItemProps[] = [];
    const lodgingArray: UpdateItemProps[] = [];
    const activityArray: UpdateItemProps[] = [];

    images?.forEach((image) => {
      imageArray.push({id: image.id});
    });

    transports?.forEach((transport) => {
      transportArray.push({
        id: transport.id,
        capacity: transport.pivot.capacity,
        description: transport.pivot.description,
        price: transport.pivot.price,
      });
    });

    lodgings?.forEach((lodging) => {
      lodgingArray.push({
        id: lodging.id,
        capacity: lodging.pivot.capacity,
        description: lodging.pivot.description,
        price: lodging.pivot.price,
      });
    });

    activities?.forEach((activity) => {
      activityArray.push({
        id: activity.id,
        capacity: activity.pivot.capacity,
        description: activity.pivot.description,
        price: activity.pivot.price,
      });
    });

    yield put(setLoadingTrue());
    yield call(api.put, `/itineraries/${itineraryId}`, {
      name,
      description,
      dateBegin,
      dateEnd,
      dateLimit,
      capacity,
      location,
      lodgings: lodgingArray,
      activities: activityArray,
      transports: transportArray,
      photos: imageArray,
    });

    yield put(updateItinerarySuccess());
    yield put(setLoadingFalse());
    yield put(getItinerariesRequest());
    RootNavigation.navigate('MyItineraries', {});
    Alert.alert('Roteiro atualizado.');
  } catch (error) {
    yield put(updateItineraryFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao atualizar roteiro.');
  }
}

export function* replyQuestion({
  payload,
}: ReturnType<typeof replyQuestionRequest>) {
  try {
    yield put(setLoadingTrue());

    const {anwser, questionId, itineraryId} = payload;

    const response = yield call(
      api.put,
      `/itineraries/${itineraryId}/questions`,
      {anwser, question_id: questionId},
    );

    if (response.status !== 200) {
      yield put(replyQuestionFailure());
      yield put(setLoadingFalse());
      return;
    }

    yield put(replyQuestionSuccess());
    yield put(setLoadingFalse());
    yield put(getItinerariesRequest());
  } catch (error) {
    yield put(replyQuestionFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao enviar resposta.');
  }
}

export function* promoteMember({
  payload,
}: ReturnType<typeof promoteMemberRequest>) {
  try {
    yield put(setLoadingTrue());

    const {memberId, itineraryId} = payload;

    const response = yield call(
      api.post,
      `/itineraries/${itineraryId}/promote`,
      {user_id: memberId},
    );

    if (response.status === 401) {
      yield put(promoteMemberFailure());
      yield put(setLoadingFalse());
      return;
    }

    yield put(promoteMemberSuccess());
    yield put(setLoadingFalse());
    yield put(getItinerariesRequest());
  } catch (error) {
    yield put(promoteMemberFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao promover o membro.');
  }
}

export function* demoteMember({
  payload,
}: ReturnType<typeof demoteMemberRequest>) {
  try {
    yield put(setLoadingTrue());

    const {memberId, itineraryId} = payload;

    const response = yield call(
      api.post,
      `/itineraries/${itineraryId}/demote`,
      {user_id: memberId},
    );

    if (response.status === 401) {
      yield put(demoteMemberFailure());
      yield put(setLoadingFalse());
      return;
    }

    yield put(demoteMemberSuccess());
    yield put(setLoadingFalse());
    yield put(getItinerariesRequest());
  } catch (error) {
    yield put(demoteMemberFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao rebaixar o membro.');
  }
}

export function* acceptMember({
  payload,
}: ReturnType<typeof acceptMemberRequest>) {
  try {
    yield put(setLoadingTrue());

    const {memberId, itineraryId} = payload;

    const response = yield call(
      api.post,
      `/itineraries/${itineraryId}/approve`,
      {user_id: memberId},
    );

    if (response.status === 401) {
      yield put(acceptMemberFailure());
      yield put(setLoadingFalse());
      return;
    }

    yield put(acceptMemberSuccess());
    yield put(setLoadingFalse());
    yield put(getItinerariesRequest());
  } catch (error) {
    yield put(acceptMemberFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao aceitar o membro.');
  }
}

export function* removeMember({
  payload,
}: ReturnType<typeof removeMemberRequest>) {
  try {
    yield put(setLoadingTrue());

    const {memberId, itineraryId} = payload;

    const response = yield call(
      api.post,
      `/itineraries/${itineraryId}/remove`,
      {user_id: memberId},
    );

    if (response.status === 401) {
      yield put(removeMemberFailure());
      yield put(setLoadingFalse());
      return;
    }

    yield put(removeMemberSuccess());
    yield put(setLoadingFalse());
    yield put(getItinerariesRequest());
  } catch (error) {
    yield put(removeMemberFailure());
    yield put(setLoadingFalse());
    Alert.alert('Erro ao remover o membro.');
  }
}

export default all([
  takeLatest('@ws/NOTIFICATION_MESSAGES', getItineraries),
  takeLatest('@itineraries/UPDATE_ITINERARY_REQUEST', updateItinerary),
  takeLatest('@itineraries/DELETE_ITINERARY_REQUEST', deleteItinerary),
  takeLatest('@itineraries/REMOVE_MEMBER_REQUEST', removeMember),
  takeLatest('@itineraries/ACCEPT_MEMBER_REQUEST', acceptMember),
  takeLatest('@itineraries/DEMOTE_MEMBER_REQUEST', demoteMember),
  takeLatest('@itineraries/PROMOTE_MEMBER_REQUEST', promoteMember),
  takeLatest('@itineraries/REPLY_QUESTION_REQUEST', replyQuestion),
  takeLatest('@itineraries/CREATE_ITINERARY_REQUEST', createItinerary),
  takeLatest('@itineraries/GET_ITINERARIES_REQUEST', getItineraries),
]);
