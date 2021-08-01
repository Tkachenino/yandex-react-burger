import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  CLEAR_PROFILE,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
} from "../action-types/profile";
import { TRegisterData } from "../../data/types";
import { TProfileActions } from "../action-creators/profile";

type TProfileStore = {
  user: TRegisterData;
  loading: boolean;
  isAuth: boolean;
  error: null | {};
};

export const initState: TProfileStore = {
  user: { email: "", name: "" },
  loading: false,
  isAuth: !!localStorage.getItem("refresh"),
  error: null,
};

export const profileReducer = (state = initState, action: TProfileActions): TProfileStore => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        user: {
          email: action.payload.email,
          name: action.payload.name,
        },
        loading: false,
        isAuth: true,
        error: null,
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case AUTH_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case AUTH_SUCCESS: {
      return {
        user: {
          email: action.payload.email,
          name: action.payload.name,
        },
        loading: false,
        isAuth: true,
        error: null,
      };
    }
    case AUTH_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }

    case PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case PROFILE_SUCCESS: {
      return {
        user: {
          email: action.payload.email,
          name: action.payload.name,
        },
        loading: false,
        isAuth: true,
        error: null,
      };
    }
    case PROFILE_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    case CLEAR_PROFILE: {
      return { ...initState, isAuth: false };
    }

    default: {
      return state;
    }
  }
};
