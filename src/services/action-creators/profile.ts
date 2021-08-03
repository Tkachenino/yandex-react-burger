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
import { TRegisterData } from "../../data/types";

interface IGtRegisterReguest {
  readonly type: typeof REGISTER_REQUEST;
}

interface IGetRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS;
  payload: TRegisterData;
}

interface IGetRegisterError {
  readonly type: typeof REGISTER_ERROR;
  payload: { error: unknown };
}

interface IGetAuthReguest {
  readonly type: typeof AUTH_REQUEST;
}

interface IGetAuthSuccess {
  readonly type: typeof AUTH_SUCCESS;
  payload: TRegisterData;
}

interface IGetAuthError {
  readonly type: typeof AUTH_ERROR;
  payload: { error: unknown };
}

interface IGetProfileReguest {
  readonly type: typeof PROFILE_REQUEST;
}

interface IGetProfileSuccess {
  readonly type: typeof PROFILE_SUCCESS;
  payload: TRegisterData;
}

interface IGetProfileError {
  readonly type: typeof PROFILE_ERROR;
  payload: { error: unknown };
}

interface IClearProfile {
  readonly type: typeof CLEAR_PROFILE;
}

export type TProfileActions =
  | IGtRegisterReguest
  | IGetRegisterSuccess
  | IGetRegisterError
  | IGetAuthReguest
  | IGetAuthSuccess
  | IGetAuthError
  | IGetProfileReguest
  | IGetProfileSuccess
  | IGetProfileError
  | IClearProfile;

export const getRegisterReguest = (): IGtRegisterReguest => ({
  type: REGISTER_REQUEST,
});

export const getRegisterSuccess = ({ name, email }: TRegisterData): IGetRegisterSuccess => ({
  type: REGISTER_SUCCESS,
  payload: { name, email },
});

export const getRegisterError = ({ error }: { error: unknown }): IGetRegisterError => ({
  type: REGISTER_ERROR,
  payload: { error },
});

export const getAuthReguest = (): IGetAuthReguest => ({
  type: AUTH_REQUEST,
});

export const getAuthSuccess = ({ name, email }: TRegisterData): IGetAuthSuccess => ({
  type: AUTH_SUCCESS,
  payload: { name, email },
});

export const getAuthError = ({ error }: { error: unknown }): IGetAuthError => ({
  type: AUTH_ERROR,
  payload: { error },
});

export const getProfileReguest = (): IGetProfileReguest => ({
  type: PROFILE_REQUEST,
});

export const getProfileSuccess = ({ name, email }: TRegisterData): IGetProfileSuccess => ({
  type: PROFILE_SUCCESS,
  payload: { name, email },
});

export const getProfileError = ({ error }: { error: unknown }): IGetProfileError => ({
  type: PROFILE_ERROR,
  payload: { error },
});

export const clearProfile = (): IClearProfile => ({
  type: CLEAR_PROFILE,
});
