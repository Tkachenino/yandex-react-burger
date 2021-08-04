import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_USER_CLOSE,
  WS_GET_MESSAGE,
} from "../action-types/websocket";
import { TOrder } from "../../data/types";

interface IGetConnection {
  readonly type: typeof WS_CONNECTION_START;
}

interface IGetConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IGetConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  payload: { error: string };
}

interface ICloseConnection {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IUserCloseConnection {
  readonly type: typeof WS_CONNECTION_USER_CLOSE;
}

interface IGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  payload: {
    orders: ReadonlyArray<TOrder>;
    total: number;
    totalToday: number;
  };
}

export type TWsActions =
  | IGetConnection
  | IGetConnectionSuccess
  | IGetConnectionError
  | ICloseConnection
  | IUserCloseConnection
  | IGetMessage;

export const getConnection = (): IGetConnection => ({
  type: WS_CONNECTION_START,
});

export const getConnectionSuccess = (): IGetConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export const getConnectionError = ({ error }: { error: string }): IGetConnectionError => ({
  type: WS_CONNECTION_ERROR,
  payload: { error },
});

export const closeConnection = (): ICloseConnection => ({
  type: WS_CONNECTION_CLOSED,
});

export const userCloseConnection = (): IUserCloseConnection => ({
  type: WS_CONNECTION_USER_CLOSE,
});

export const getMessage = ({
  payload: { orders, total, totalToday },
}: {
  payload: {
    orders: ReadonlyArray<TOrder>;
    total: number;
    totalToday: number;
  };
}): IGetMessage => ({
  type: WS_GET_MESSAGE,
  payload: {
    orders,
    total,
    totalToday,
  },
});
