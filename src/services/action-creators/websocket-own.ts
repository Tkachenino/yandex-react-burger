import {
  WS_CONNECTION_START_OWN,
  WS_CONNECTION_SUCCESS_OWN,
  WS_CONNECTION_ERROR_OWN,
  WS_CONNECTION_CLOSED_OWN,
  WS_CONNECTION_USER_CLOSE_OWN,
  WS_GET_MESSAGE_OWN,
} from "../action-types/websocket-own";
import { TOrder } from "../../data/types";

interface IGetConnectionOwn {
  type: typeof WS_CONNECTION_START_OWN;
}

interface IGetConnectionSuccessOwn {
  type: typeof WS_CONNECTION_SUCCESS_OWN;
}

interface IGetConnectionErrorOwn {
  type: typeof WS_CONNECTION_ERROR_OWN;
  payload: { error: {} };
}

interface ICloseConnectionOwn {
  type: typeof WS_CONNECTION_CLOSED_OWN;
}

interface IUserCloseConnectionOwn {
  type: typeof WS_CONNECTION_USER_CLOSE_OWN;
}

interface IGetMessageOwn {
  type: typeof WS_GET_MESSAGE_OWN;
  payload: {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
  };
}

export type TWsOwnActions =
  | IGetConnectionOwn
  | IGetConnectionSuccessOwn
  | IGetConnectionErrorOwn
  | ICloseConnectionOwn
  | IUserCloseConnectionOwn
  | IGetMessageOwn;

export const getConnectionOwn = (): IGetConnectionOwn => ({
  type: WS_CONNECTION_START_OWN,
});

export const getConnectionSuccessOwn = (): IGetConnectionSuccessOwn => ({
  type: WS_CONNECTION_SUCCESS_OWN,
});

export const getConnectionErrorOwn = ({ error }: { error: {} }): IGetConnectionErrorOwn => ({
  type: WS_CONNECTION_ERROR_OWN,
  payload: { error },
});

export const closeConnectionOwn = (): ICloseConnectionOwn => ({
  type: WS_CONNECTION_CLOSED_OWN,
});

export const userCloseConnectionOwn = (): IUserCloseConnectionOwn => ({
  type: WS_CONNECTION_USER_CLOSE_OWN,
});

export const getMessageOwn = ({
  payload: { orders, total, totalToday },
}: {
  payload: {
    orders: Array<TOrder>;
    total: number;
    totalToday: number;
  };
}): IGetMessageOwn => ({
  type: WS_GET_MESSAGE_OWN,
  payload: {
    orders,
    total,
    totalToday,
  },
});
