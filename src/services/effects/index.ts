import Cookies from "js-cookie";
import { URL_ADDRESS } from "../../utils/const";
import { getItemError, getItemRequest, getItemSuccess } from "../action-creators/ingredients";
import {
  setOrderError,
  setOrderRequest,
  setOrderSuccess,
  getOrderError,
  getOrderRequest,
  getOrderSuccess,
} from "../action-creators/order";
import {
  getRegisterReguest,
  getRegisterSuccess,
  getRegisterError,
  getAuthReguest,
  getAuthSuccess,
  getAuthError,
  getProfileReguest,
  getProfileSuccess,
  getProfileError,
  clearProfile,
} from "../action-creators/profile";
import { AppDispatch, AppThunk } from "../../data/store";

type TAnswer = {
  user: { email: string; name: string };
  accessToken: string;
  refreshToken: string;
  success: boolean;
};

const setToken = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  const inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
  Cookies.set("token", accessToken, { expires: inTwentyMinutes });
  localStorage.setItem("refresh", refreshToken);
};

const clearToken = () => {
  Cookies.remove("token");
  localStorage.removeItem("refresh");
};

export const refreshToken = async (
  cb?: AppThunk<void> | undefined,
  params?: undefined | { email: string; name: string }
): Promise<void> => {
  try {
    const resp = await fetch(`${URL_ADDRESS}/auth/token`, {
      method: "POST",
      body: JSON.stringify({
        token: `${localStorage.getItem("refresh")}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error("Ответ сети не ok");
    }
    const answer = await resp.json();
    if (!answer.success) {
      throw new Error("Не удачный запрос от сервера");
    }

    setToken({ accessToken: answer.accessToken, refreshToken: answer.refreshToken });

    if (cb) {
      cb(params);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getIngredients: AppThunk = () => async (dispatch: AppDispatch) => {
  dispatch(getItemRequest());
  try {
    const resp = await fetch(`${URL_ADDRESS}/ingredients`);
    if (!resp.ok) {
      throw new Error("Ответ сети не ok");
    }
    const answer = await resp.json();
    if (!answer.success) {
      throw new Error("Не удачный запрос от сервера");
    }
    dispatch(getItemSuccess({ ingredients: answer.data }));
  } catch (error) {
    console.log(error);
    dispatch(getItemError({ error: error.message }));
  }
};

export const setOrder: AppThunk = (setShowModal) => async (dispatch, store) => {
  const authToken: string | undefined = Cookies.get("token");

  if (authToken === undefined) {
    await refreshToken(setOrder, setShowModal);
    return;
  }
  const { bun, constructorIngredient } = store().constructorIngredient;
  if (bun === null) {
    return;
  }
  dispatch(setOrderRequest());
  try {
    const resp = await fetch(`${URL_ADDRESS}/orders`, {
      method: "POST",
      body: JSON.stringify({
        ingredients: [bun._id, ...constructorIngredient.map((item) => item._id)],
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
    });

    if (!resp.ok) {
      throw new Error("Ответ сети не ok");
    }
    const answer = await resp.json();
    if (!answer.success) {
      throw new Error("Запрос завершился с отрицательным статусом");
    }
    dispatch(setOrderSuccess({ orderId: answer.order.number }));
    setShowModal(true);
  } catch (error) {
    dispatch(setOrderError({ error: error.message }));
  }
};

export const getOrder: AppThunk = (id) => async (dispatch) => {
  dispatch(getOrderRequest());
  try {
    const resp = await fetch(`${URL_ADDRESS}/orders/${id}`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!resp.ok) {
      throw new Error("Ответ сети не ok");
    }
    const answer = await resp.json();
    if (!answer.success) {
      throw new Error("Запрос завершился с отрицательным статусом");
    }

    dispatch(getOrderSuccess({ order: answer.orders[0] }));
  } catch (error) {
    dispatch(getOrderError({ error: error.message }));
  }
};

export const createNewProfile: AppThunk =
  ({ email, password, name }: { email: string; password: string; name: string }, history) =>
  async (dispatch) => {
    dispatch(getRegisterReguest());
    try {
      const resp = await fetch(`${URL_ADDRESS}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Ответ сети не ok");
      }
      const answer: TAnswer = await resp.json();
      if (!answer.success) {
        throw new Error("Не удачный запрос от сервера");
      }

      setToken({ accessToken: answer.accessToken, refreshToken: answer.refreshToken });
      dispatch(getRegisterSuccess({ email: answer.user.email, name: answer.user.name }));
      history.replace("/");
    } catch (error) {
      dispatch(getRegisterError({ error: error.message }));
    }
  };

export const getProfile: AppThunk = () => async (dispatch) => {
  const authToken: string | undefined = Cookies.get("token");

  if (authToken === undefined) {
    await refreshToken(getProfile);
    return;
  }
  dispatch(getProfileReguest());
  try {
    const resp = await fetch(`${URL_ADDRESS}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
    });
    if (!resp.ok) {
      throw new Error("Ответ сети не ok");
    }
    const answer = await resp.json();
    if (!answer.success && answer.message === "jwt expired") {
      throw new Error("Необходимо обновить токен");
    }
    if (!answer.success) {
      throw new Error("Не удачный запрос от сервера");
    }

    dispatch(getProfileSuccess({ email: answer.user.email, name: answer.user.name }));
  } catch (error) {
    if (error.message === "Необходимо обновить токен") {
      refreshToken(getProfile);
      return;
    }
    dispatch(getProfileError({ error: error.message }));
  }
};

export const updateProfile: AppThunk =
  ({ email, name }) =>
  async (dispatch) => {
    const authToken: string | undefined = Cookies.get("token");

    if (authToken === undefined) {
      await refreshToken(updateProfile, { email, name });
      return;
    }
    dispatch(getProfileReguest());
    try {
      const resp = await fetch(`${URL_ADDRESS}/auth/user`, {
        method: "PATCH",
        body: JSON.stringify({
          email,
          name,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: authToken,
        },
      });
      if (!resp.ok) {
        throw new Error("Ответ сети не ok");
      }
      const answer = await resp.json();
      if (!answer.success && answer.message === "jwt expired") {
        throw new Error("Необходимо обновить токен");
      }
      if (!answer.success) {
        throw new Error("Не удачный запрос от сервера");
      }

      dispatch(getProfileSuccess({ email: answer.user.email, name: answer.user.name }));
    } catch (error) {
      if (error.message === "Необходимо обновить токен") {
        refreshToken(updateProfile, { email, name });
        return;
      }
      dispatch(getProfileError({ error: error.message }));
    }
  };

export const login: AppThunk =
  ({ email, password }, history, path) =>
  async (dispatch) => {
    dispatch(getAuthReguest());
    try {
      const resp = await fetch(`${URL_ADDRESS}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Ответ сети не ok");
      }
      const answer = await resp.json();
      if (!answer.success) {
        throw new Error("Не удачный запрос от сервера");
      }

      setToken({ accessToken: answer.accessToken, refreshToken: answer.refreshToken });
      dispatch(getAuthSuccess({ email: answer.user.email, name: answer.user.name }));

      if (path) {
        history.push({ pathname: path });
      } else {
        history.push("/");
      }
    } catch (error) {
      dispatch(getAuthError({ error: error.message }));
    }
  };

export const logout: AppThunk = (history) => async (dispatch) => {
  try {
    const resp = await fetch(`${URL_ADDRESS}/auth/logout`, {
      method: "POST",
      body: JSON.stringify({
        token: `${localStorage.getItem("refresh")}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error("Ответ сети не ok");
    }
    const answer = await resp.json();

    if (!answer.success) {
      throw new Error("Не удачный запрос от сервера");
    }

    clearToken();
    dispatch(clearProfile());
    history.replace("/login");
  } catch (error) {
    dispatch(getAuthError({ error: error.message }));
  }
};

export const checkEmail: AppThunk = (email, history) => async () => {
  try {
    const resp = await fetch(`${URL_ADDRESS}/password-reset`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!resp.ok) {
      throw new Error("Ответ сети не ok");
    }
    const answer = await resp.json();
    if (!answer.success) {
      throw new Error("Не удачный запрос от сервера");
    }

    history.push({
      pathname: "/reset-password",
      state: { reset: true },
    });
  } catch (error) {
    console.log(error);
  }
};

export const setPasswordReset: AppThunk =
  ({ password, token }, history) =>
  async () => {
    try {
      const resp = await fetch(`${URL_ADDRESS}/password-reset/reset`, {
        method: "POST",
        body: JSON.stringify({
          password,
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!resp.ok) {
        throw new Error("Ответ сети не ok");
      }
      const answer = await resp.json();
      if (!answer.success) {
        throw new Error("Не удачный запрос от сервера");
      }

      history.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
