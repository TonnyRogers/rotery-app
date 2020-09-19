import {ProfileProps} from './reducer';

export function getProfileRequest(userId: number) {
  return {
    type: '@profile/GET_PROFILE_REQUEST',
    payload: {userId},
  };
}

export function getProfileSuccess(profile: ProfileProps) {
  return {
    type: '@profile/GET_PROFILE_SUCCESS',
    payload: {profile},
  };
}

export function getProfileFail() {
  return {
    type: '@profile/GET_PROFILE_FAIL',
  };
}

export function updateProfileRequest(
  name: string,
  birth: string,
  cpf: number,
  profission: string,
  phone: number,
) {
  return {
    type: '@profile/UPDATE_PROFILE_REQUEST',
    payload: {name, birth, cpf, profission, phone},
  };
}

export function updateProfileSuccess(profile: ProfileProps) {
  return {
    type: '@profile/UPDATE_PROFILE_SUCCESS',
    payload: {profile},
  };
}

export function updateProfileFailure() {
  return {
    type: '@profile/UPDATE_PROFILE_FAILURE',
  };
}
