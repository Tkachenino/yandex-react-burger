import Cookies from "js-cookie";
import { URL_ADDRESS } from "../../utils/const";
import { getItemError, getItemRequest, getItemSuccess } from "../action-creators/ingredients";
import { setOrderError, setOrderRequest, setOrderSuccess } from "../action-creators/order";
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

const setToken = ({ accessToken, refreshToken }) => {
  // const preparedToken = accessToken.split(" ")[1];
  Cookies.set("token", accessToken);
  localStorage.setItem("refresh", refreshToken);
};

const clearToken = () => {
  Cookies.remove("token");
  localStorage.removeItem("refresh");
};

const refreshToken = async (cb, ...params) => {
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
    cb(...params);
  } catch (error) {
    console.log(error);
  }
};

export const getIngredients = () => async (dispatch) => {
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

export const getOrder = (setShowModal) => async (dispatch, store) => {
  const { bun, constructorIngredient } = store().constructorIngredient;
  dispatch(setOrderRequest());
  try {
    const resp = await fetch(`${URL_ADDRESS}/orders`, {
      method: "POST",
      body: JSON.stringify({
        ingredients: [bun._id, ...constructorIngredient.map((item) => item._id)],
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
      throw new Error("Запрос завершился с отрицательным статусом");
    }
    dispatch(setOrderSuccess({ orderId: answer.order.number }));
    setShowModal(true);
  } catch (error) {
    dispatch(setOrderError({ error: error.message }));
  }
};

export const createNewProfile =
  ({ email, password, name }, history) =>
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
      const answer = await resp.json();
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

export const getProfile = () => async (dispatch) => {
  dispatch(getProfileReguest());
  try {
    const resp = await fetch(`${URL_ADDRESS}/auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: Cookies.get("token"),
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

export const updateProfile =
  ({ email, name }) =>
  async (dispatch) => {
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
          authorization: Cookies.get("token"),
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

export const login =
  ({ email, password }, history) =>
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
      history.replace("/");
    } catch (error) {
      dispatch(getAuthError({ error: error.message }));
    }
  };

export const logout = (history) => async (dispatch) => {
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

export const checkEmail = (email, history) => async () => {
  // dispatch(getItemRequest());
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

    console.log(answer);
    history.push("/reset-password");
    // dispatch(getItemSuccess({ ingredients: answer.data }));
  } catch (error) {
    console.log(error);
    // dispatch(getItemError({ error: error.message }));
  }
};

export const setPasswordReset = (email, history) => async () => {
  // dispatch(getItemRequest());
  try {
    const resp = await fetch(`${URL_ADDRESS}/password-reset/reset`, {
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

    console.log(answer);
    history.push("/login");
    // dispatch(getItemSuccess({ ingredients: answer.data }));
  } catch (error) {
    console.log(error);
    // dispatch(getItemError({ error: error.message }));
  }
};
