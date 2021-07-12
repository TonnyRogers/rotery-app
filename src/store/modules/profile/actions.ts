import {ProfileProps} from '../../../utils/types';

export enum ProfileActions {
  GET_PROFILE_REQUEST = '@profile/GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS = '@profile/GET_PROFILE_SUCCESS',
  GET_PROFILE_FAILURE = '@profile/GET_PROFILE_FAILURE',
  UPDATE_PROFILE_REQUEST = '@profile/UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS = '@profile/UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE = '@profile/UPDATE_PROFILE_FAILURE',
  UPDATE_PROFILE_IMAGE_REQUEST = '@profile/UPDATE_PROFILE_IMAGE_REQUEST',
  UPDATE_PROFILE_IMAGE_SUCCESS = '@profile/UPDATE_PROFILE_IMAGE_SUCCESS',
  UPDATE_PROFILE_IMAGE_FAILURE = '@profile/UPDATE_PROFILE_IMAGE_FAILURE',
  REMOVE_USER_REQUEST = '@profile/REMOVE_USER_REQUEST',
  REMOVE_USER_SUCCESS = '@profile/REMOVE_USER_SUCCESS',
  REMOVE_USER_FAILURE = '@profile/REMOVE_USER_FAILURE',
}

export function getProfileRequest(userId: number) {
  return {
    type: ProfileActions.GET_PROFILE_REQUEST,
    payload: {userId},
  };
}

export function getProfileSuccess(profile: ProfileProps) {
  return {
    type: ProfileActions.GET_PROFILE_SUCCESS,
    payload: {profile},
  };
}

export function getProfileFail() {
  return {
    type: ProfileActions.GET_PROFILE_FAILURE,
  };
}

export function updateProfileRequest(
  name: string,
  gender: string,
  birth: string,
  cpf: number,
  profission: string,
  phone: number,
) {
  return {
    type: ProfileActions.UPDATE_PROFILE_REQUEST,
    payload: {name, gender, birth, cpf, profission, phone},
  };
}

export function updateProfileSuccess(profile: ProfileProps) {
  return {
    type: ProfileActions.UPDATE_PROFILE_SUCCESS,
    payload: {profile},
  };
}

export function updateProfileFailure() {
  return {
    type: ProfileActions.UPDATE_PROFILE_FAILURE,
  };
}

export function updateProfileImageRequest(file_id: number) {
  return {
    type: ProfileActions.UPDATE_PROFILE_IMAGE_REQUEST,
    payload: {file_id},
  };
}

export function updateProfileImageSuccess(profile: ProfileProps) {
  return {
    type: ProfileActions.UPDATE_PROFILE_IMAGE_SUCCESS,
    payload: {profile},
  };
}

export function updateProfileImageFailure() {
  return {
    type: ProfileActions.UPDATE_PROFILE_IMAGE_FAILURE,
  };
}

export function removeUserRequest() {
  return {
    type: ProfileActions.REMOVE_USER_REQUEST,
  };
}

export function removeUserSuccess() {
  return {
    type: ProfileActions.REMOVE_USER_SUCCESS,
  };
}

export function removeUserFailure() {
  return {
    type: ProfileActions.REMOVE_USER_FAILURE,
  };
}
