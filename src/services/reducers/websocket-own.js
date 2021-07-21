import {
  // WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS_OWN,
  WS_CONNECTION_ERROR_OWN,
  WS_CONNECTION_CLOSED_OWN,
  WS_GET_MESSAGE_OWN,
  // WS_SEND_MESSAGE,
} from "../action-types/websocket-own.js";

const initialState = {
  wsConnected: false,
  orders: [],
  error: null,
  total: null,
  totalToday: null,
};

// Создадим редьюсер для WebSocket
export const wsOwnReducer = (state = initialState, action) => {
  switch (action.type) {
    // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
    // Установим флаг wsConnected в состояние true
    case WS_CONNECTION_SUCCESS_OWN:
      return {
        ...state,
        error: null,
        wsConnected: true,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_ERROR
    // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
    case WS_CONNECTION_ERROR_OWN:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
    // Установим флаг wsConnected в состояние false
    case WS_CONNECTION_CLOSED_OWN:
      return {
        ...state,
        error: null,
        wsConnected: false,
      };

    // Опишем обработку экшена с типом WS_GET_MESSAGE
    // Обработка происходит, когда с сервера возвращаются данные
    // В messages передадим данные, которые пришли с сервера
    case WS_GET_MESSAGE_OWN:
      return {
        ...state,
        error: null,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
