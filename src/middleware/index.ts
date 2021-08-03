import {
  WS_CONNECTION_START_OWN,
  WS_CONNECTION_SUCCESS_OWN,
  WS_CONNECTION_ERROR_OWN,
  WS_CONNECTION_CLOSED_OWN,
  WS_CONNECTION_USER_CLOSE_OWN,
  WS_GET_MESSAGE_OWN,
  WS_SEND_MESSAGE_OWN,
} from "../services/action-types/websocket-own";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_USER_CLOSE,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../services/action-types/websocket";
import { AnyAction, MiddlewareAPI } from "redux";
import { refreshToken } from "../services/effects";
import Cookies from "js-cookie";

export const socketMiddleware = (wsUrl: string) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (a: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(wsUrl);
      }

      if (type === WS_CONNECTION_USER_CLOSE) {
        // объект класса WebSocket
        if (socket) {
          socket.close(1000, "Юзер покинул страницу");
        }
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const messeges = JSON.parse(data);
          dispatch({
            type: WS_GET_MESSAGE,
            payload: {
              orders: messeges.orders,
              total: messeges.total,
              totalToday: messeges.totalToday,
            },
          });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_SEND_MESSAGE) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};

export const socketMiddlewareOwn = (wsUrl: string) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (a: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START_OWN) {
        // объект класса WebSocket
        if (payload?.wsUrl !== undefined) {
          socket = new WebSocket(payload.wsUrl);
        } else {
          socket = new WebSocket(wsUrl);
        }
      }

      if (type === WS_CONNECTION_USER_CLOSE_OWN) {
        // объект класса WebSocket
        if (socket) {
          socket.close(1000, "Юзер покинул страницу");
        }
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: WS_CONNECTION_SUCCESS_OWN, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: WS_CONNECTION_ERROR_OWN, payload: event });
        };

        // функция, которая вызывается при получения события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const messeges = JSON.parse(data);

          if (messeges.message && messeges.message === "Invalid or missing token") {
            refreshToken().then(() => {
              const token: string | undefined = Cookies.get("token");
              if (token === undefined) {
                return;
              }
              const accessToken = token.split(" ")[1];
              const wsUrl = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;
              dispatch({ type: WS_CONNECTION_START_OWN, payload: { wsUrl } });
            });
          } else if (messeges.success) {
            dispatch({
              type: WS_GET_MESSAGE_OWN,
              payload: {
                orders: messeges.orders,
                total: messeges.total,
                totalToday: messeges.totalToday,
              },
            });
          }
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: WS_CONNECTION_CLOSED_OWN, payload: event });
        };

        if (type === WS_SEND_MESSAGE_OWN) {
          const message = payload;
          // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};
