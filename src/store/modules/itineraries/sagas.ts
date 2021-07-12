import {takeLatest, put, call, all} from 'redux-saga/effects';
import Toast from 'react-native-toast-message';

import api from '../../../services/api';
import NetInfo from '../../../services/netinfo';
import * as RootNavigation from '../../../RootNavigation';

import {
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
  notifyItineraryFinishRequest,
  notifyItineraryFinishFailure,
  getItinerariesFailure,
} from './actions';
import {updateDetailsRequest} from '../dynamicItinerary/actions';
interface UpdateItemProps {
  id: number;
  capacity: number;
  description: string | null;
  price: number | null;
}

export function* getItineraries() {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      return;
    }

    const response = yield call(api.get, '/itineraries');

    yield put(getItinerariesSuccess(response.data.data));
  } catch (error) {
    yield put(getItinerariesFailure());
    Toast.show({
      text1: 'Erro ao buscar seus roteiros.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* createItinerary({
  payload,
}: ReturnType<typeof createItineraryRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      return;
    }

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
      isPrivate,
      activities,
      transports,
    } = payload;

    const imageArray: {id: number}[] = [];

    images?.forEach((image) => {
      imageArray.push({id: image.id});
    });
    const response = yield call(api.post, '/itineraries', {
      name,
      description,
      dateBegin,
      dateEnd,
      dateLimit,
      capacity,
      location,
      isPrivate,
      lodgings,
      activities,
      transports,
      photos: imageArray,
    });

    yield put(createItinerarySuccess(response.data));
    RootNavigation.replace('MyItineraries');
  } catch (error) {
    yield put(createItineraryFailure());
    Toast.show({
      text1: 'Erro ao criar roteiro.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* deleteItinerary({
  payload,
}: ReturnType<typeof deleteItineraryRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      return;
    }

    const {itineraryId} = payload;
    yield call(api.delete, `/itineraries/${itineraryId}`);

    yield put(deleteItinerarySuccess(itineraryId));
    RootNavigation.replace('MyItineraries');
    Toast.show({
      text1: 'Roteiro deletado.',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    Toast.show({
      text1: 'Não foi possivel deletar roteiro.',
      position: 'bottom',
      type: 'error',
    });
    yield put(deleteItineraryFailure());
  }
}

export function* updateItinerary({
  payload,
}: ReturnType<typeof updateItineraryRequest>) {
  try {
    const info = yield call(NetInfo);

    if (!info.status) {
      return;
    }

    const {
      itineraryId,
      name,
      dateBegin,
      dateEnd,
      dateLimit,
      location,
      isPrivate,
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

    const response = yield call(api.put, `/itineraries/${itineraryId}`, {
      name,
      description,
      dateBegin,
      dateEnd,
      dateLimit,
      capacity,
      location,
      isPrivate,
      lodgings: lodgingArray,
      activities: activityArray,
      transports: transportArray,
      photos: imageArray,
    });

    yield put(updateItinerarySuccess(response.data));
    RootNavigation.goBack();
    RootNavigation.goBack();
    Toast.show({
      text1: 'Roteiro atualizado.',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    yield put(updateItineraryFailure());
    Toast.show({
      text1: 'Erro ao atualizar roteiro.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* replyQuestion({
  payload,
}: ReturnType<typeof replyQuestionRequest>) {
  try {
    const {anwser, questionId, itineraryId} = payload;

    const response = yield call(
      api.put,
      `/itineraries/${itineraryId}/questions`,
      {anwser, question_id: questionId},
    );

    if (response.status !== 200) {
      yield put(replyQuestionFailure());
      return;
    }

    yield put(replyQuestionSuccess(response.data));
  } catch (error) {
    yield put(replyQuestionFailure());
    Toast.show({
      text1: 'Erro ao enviar resposta.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* promoteMember({
  payload,
}: ReturnType<typeof promoteMemberRequest>) {
  try {
    const {memberId, itineraryId} = payload;

    const response = yield call(
      api.post,
      `/itineraries/${itineraryId}/promote`,
      {user_id: memberId},
    );

    if (response.status === 401) {
      yield put(promoteMemberFailure());
      return;
    }

    yield put(promoteMemberSuccess(response.data));
    yield put(updateDetailsRequest());
  } catch (error) {
    yield put(promoteMemberFailure());
    Toast.show({
      text1: 'Erro ao promover o membro.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* demoteMember({
  payload,
}: ReturnType<typeof demoteMemberRequest>) {
  try {
    const {memberId, itineraryId} = payload;

    const response = yield call(
      api.post,
      `/itineraries/${itineraryId}/demote`,
      {user_id: memberId},
    );

    if (response.status === 401) {
      yield put(demoteMemberFailure());
      return;
    }

    yield put(demoteMemberSuccess(response.data));
    yield put(updateDetailsRequest());
  } catch (error) {
    yield put(demoteMemberFailure());
    Toast.show({
      text1: 'Erro ao rebaixar o membro.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* acceptMember({
  payload,
}: ReturnType<typeof acceptMemberRequest>) {
  try {
    const {memberId, itineraryId} = payload;

    const response = yield call(
      api.post,
      `/itineraries/${itineraryId}/approve`,
      {user_id: memberId},
    );

    if (response.status === 401) {
      yield put(acceptMemberFailure());
      return;
    }

    yield put(acceptMemberSuccess(response.data));
  } catch (error) {
    yield put(acceptMemberFailure());
    Toast.show({
      text1: 'Erro ao aceitar o membro.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* removeMember({
  payload,
}: ReturnType<typeof removeMemberRequest>) {
  try {
    const {memberId, itineraryId} = payload;

    const response = yield call(
      api.post,
      `/itineraries/${itineraryId}/remove`,
      {user_id: memberId},
    );

    if (response.status === 401) {
      yield put(removeMemberFailure());
      return;
    }

    yield put(removeMemberSuccess(itineraryId, memberId));
  } catch (error) {
    yield put(removeMemberFailure());
    Toast.show({
      text1: 'Erro ao remover o membro.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export function* finishItinerary({
  payload,
}: ReturnType<typeof notifyItineraryFinishRequest>) {
  try {
    const {itineraryId} = payload;
    yield call(api.post, `/itineraries/${itineraryId}/notify`);
    yield put(updateDetailsRequest());
    RootNavigation.goBack();
    Toast.show({
      text1: 'Roteiro finalizado.',
      position: 'bottom',
      type: 'success',
    });
  } catch (error) {
    yield put(notifyItineraryFinishFailure());
    Toast.show({
      text1: 'Erro ao finizar roteiro.',
      position: 'bottom',
      type: 'error',
    });
  }
}

export default all([
  takeLatest('@itineraries/NOTIFY_ITINERARY_FINISH_REQUEST', finishItinerary),
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
