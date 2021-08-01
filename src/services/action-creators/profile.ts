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
import { TRegisterData, IRegisterDataWithPassword } from "../../data/types";

interface IGtRegisterReguest {
  type: typeof REGISTER_REQUEST;
}

interface IGetRegisterSuccess {
  type: typeof REGISTER_SUCCESS;
  payload: IRegisterDataWithPassword;
}

interface IGetRegisterError {
  type: typeof REGISTER_ERROR;
  payload: { error: {} };
}

interface IGetAuthReguest {
  type: typeof AUTH_REQUEST;
}

interface IGetAuthSuccess {
  type: typeof AUTH_SUCCESS;
  payload: IRegisterDataWithPassword;
}

interface IGetAuthError {
  type: typeof AUTH_ERROR;
  payload: { error: {} };
}

interface IGetProfileReguest {
  type: typeof PROFILE_REQUEST;
}

interface IGetProfileSuccess {
  type: typeof PROFILE_SUCCESS;
  payload: TRegisterData;
}

interface IGetProfileError {
  type: typeof PROFILE_ERROR;
  payload: { error: {} };
}

interface IClearProfile {
  type: typeof CLEAR_PROFILE;
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

export const getRegisterSuccess = ({
  name,
  email,
  password,
}: IRegisterDataWithPassword): IGetRegisterSuccess => ({
  type: REGISTER_SUCCESS,
  payload: { name, email, password },
});

export const getRegisterError = ({ error }: { error: {} }): IGetRegisterError => ({
  type: REGISTER_ERROR,
  payload: { error },
});

export const getAuthReguest = (): IGetAuthReguest => ({
  type: AUTH_REQUEST,
});

export const getAuthSuccess = ({
  name,
  email,
  password,
}: IRegisterDataWithPassword): IGetAuthSuccess => ({
  type: AUTH_SUCCESS,
  payload: { name, email, password },
});

export const getAuthError = ({ error }: { error: {} }): IGetAuthError => ({
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

export const getProfileError = ({ error }: { error: {} }): IGetProfileError => ({
  type: PROFILE_ERROR,
  payload: { error },
});

export const clearProfile = (): IClearProfile => ({
  type: CLEAR_PROFILE,
});
