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
  notifyItineraryFinishSuccess,
} from './actions';
import {
  CreateItineraryPhotoItemProps,
  CreateItineraryTransportItemProps,
  CreateItineraryLodgingItemProps,
  CreateItineraryActivityItemProps,
  ItineraryProps,
  ItineraryMemberResponse,
} from '../../../utils/types';
import {AxiosResponse} from 'axios';
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
      yield put(getItinerariesFailure());
      return;
    }

    const response = yield call(api.get, '/itineraries');

    yield put(getItinerariesSuccess(response.data));
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
      yield put(createItineraryFailure());
      return;
    }

    const {
      name,
      begin,
      end,
      deadlineForJoin,
      location,
      capacity,
      description,
      photos,
      lodgings,
      isPrivate,
      activities,
      transports,
      locationJson,
    } = payload;

    const imageArray: CreateItineraryPhotoItemProps[] = [];

    photos?.forEach((image) => {
      imageArray.push({file: image.id});
    });

    const payloadRequest: any = {
      name,
      description,
      begin: begin.toISOString(),
      end: end.toISOString(),
      deadlineForJoin: deadlineForJoin.toISOString(),
      capacity,
      location,
      isPrivate,
      lodgings,
      activities,
      transports,
      photos: imageArray,
    };

    if (locationJson) {
      payloadRequest.locationJson = locationJson;
    }
    const response: AxiosResponse<ItineraryProps> = yield call(
      api.post,
      '/itineraries',
      payloadRequest,
    );

    yield put(createItinerarySuccess(response.data));
    RootNavigation.goBack();
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
      yield put(deleteItineraryFailure());
      return;
    }

    RootNavigation.replace('MyItineraries');

    const {itineraryId} = payload;
    yield call(api.delete, `/itineraries/${itineraryId}`);

    yield put(deleteItinerarySuccess(itineraryId));

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
      yield put(updateItineraryFailure());
      return;
    }

    const {
      itineraryId,
      name,
      begin,
      end,
      deadlineForJoin,
      location,
      isPrivate,
      capacity,
      description,
      photos,
      lodgings,
      activities,
      transports,
      locationJson,
    } = payload;

    const imageArray: CreateItineraryPhotoItemProps[] = [];
    const transportArray: CreateItineraryTransportItemProps[] = [];
    const lodgingArray: CreateItineraryLodgingItemProps[] = [];
    const activityArray: CreateItineraryActivityItemProps[] = [];

    photos?.forEach((image) => {
      imageArray.push({file: image.id});
    });

    transports?.forEach((transport) => {
      transportArray.push({
        transport: transport.transport,
        isFree: !!transport.price,
        capacity: transport.capacity,
        description: transport.description,
        price: transport.price,
      });
    });

    lodgings?.forEach((lodging) => {
      lodgingArray.push({
        lodging: lodging.lodging,
        isFree: !!lodging.price,
        capacity: lodging.capacity,
        description: lodging.description,
        price: lodging.price,
      });
    });

    activities?.forEach((activity) => {
      activityArray.push({
        activity: activity.activity,
        isFree: !!activity.price,
        capacity: activity.capacity,
        description: activity.description,
        price: activity.price,
      });
    });

    const updatePayload: any = {
      name,
      description,
      begin: begin.toISOString(),
      end: end.toISOString(),
      deadlineForJoin: deadlineForJoin.toISOString(),
      capacity,
      location,
      isPrivate,
      lodgings: lodgingArray,
      activities: activityArray,
      transports: transportArray,
      photos: imageArray,
    };

    if (locationJson) {
      updatePayload.locationJson = locationJson;
    }

    const response = yield call(
      api.put,
      `/itineraries/${itineraryId}`,
      updatePayload,
    );

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
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(replyQuestionFailure());
      return;
    }

    const {answer, questionId, itineraryId} = payload;

    const response = yield call(
      api.put,
      `/itineraries/${itineraryId}/questions`,
      {answer, questionId: questionId},
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
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(promoteMemberFailure());
      return;
    }

    const {userId, itineraryId} = payload;

    const response: AxiosResponse<ItineraryMemberResponse> = yield call(
      api.post,
      `/itineraries/${itineraryId}/promote`,
      {userId: userId},
    );

    if (response.status === 401) {
      yield put(promoteMemberFailure());
      return;
    }

    yield put(promoteMemberSuccess(response.data));
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
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(demoteMemberFailure());
      return;
    }

    const {userId, itineraryId} = payload;

    const response: AxiosResponse<ItineraryMemberResponse> = yield call(
      api.post,
      `/itineraries/${itineraryId}/demote`,
      {userId: userId},
    );

    if (response.status === 401) {
      yield put(demoteMemberFailure());
      return;
    }

    yield put(demoteMemberSuccess(response.data));
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
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(acceptMemberFailure());
      return;
    }

    const {userId, itineraryId} = payload;

    const response: AxiosResponse<ItineraryMemberResponse> = yield call(
      api.post,
      `/itineraries/${itineraryId}/approve`,
      {userId: userId},
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
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(removeMemberFailure());
      return;
    }

    const {userId, itineraryId} = payload;

    const response: AxiosResponse<ItineraryMemberResponse> = yield call(
      api.post,
      `/itineraries/${itineraryId}/remove`,
      {userId: userId},
    );

    if (response.status === 401) {
      yield put(removeMemberFailure());
      return;
    }

    yield put(removeMemberSuccess(itineraryId, userId));
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
    const info = yield call(NetInfo);

    if (!info.status) {
      yield put(notifyItineraryFinishFailure());
      return;
    }

    const {itineraryId} = payload;

    yield call(api.post, `/itineraries/${itineraryId}/finish`);
    yield put(notifyItineraryFinishSuccess(itineraryId));

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
