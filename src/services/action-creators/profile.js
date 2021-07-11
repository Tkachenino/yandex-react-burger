import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  CLEAR_PROFILE,
} from "../action-types/profile";

export const getRegisterReguest = () => ({
  type: REGISTER_REQUEST,
});

export const getRegisterSuccess = ({ name, email, password }) => ({
  type: REGISTER_SUCCESS,
  payload: { name, email, password },
});

export const getRegisterError = ({ error }) => ({
  type: REGISTER_ERROR,
  payload: { error },
});

export const getAuthReguest = () => ({
  type: AUTH_REQUEST,
});

export const getAuthSuccess = ({ name, email, password }) => ({
  type: AUTH_SUCCESS,
  payload: { name, email, password },
});

export const getAuthError = ({ error }) => ({
  type: AUTH_ERROR,
  payload: { error },
});

export const getProfileReguest = () => ({
  type: PROFILE_REQUEST,
});

export const getProfileSuccess = ({ name, email }) => ({
  type: PROFILE_SUCCESS,
  payload: { name, email },
});

export const getProfileError = ({ error }) => ({
  type: PROFILE_ERROR,
  payload: { error },
});

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
});
