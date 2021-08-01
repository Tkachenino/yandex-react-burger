import {
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_ERROR,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_ERROR,
  CLEAR_ORDER_ERROR,
} from "../action-types/order";
import { TOrder } from "../../data/types";

interface ISetOrderRequest {
  type: typeof SET_ORDER_REQUEST;
}

interface ISetOrderSuccess {
  type: typeof SET_ORDER_SUCCESS;
  orderId: number;
}

interface ISetOrderError {
  type: typeof SET_ORDER_ERROR;
  error: {};
}

interface IGetOrderRequest {
  type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccess {
  type: typeof GET_ORDER_SUCCESS;
  order: TOrder;
}

interface IGetOrderError {
  type: typeof GET_ORDER_ERROR;
  error: {};
}

interface IClearOrderError {
  type: typeof CLEAR_ORDER_ERROR;
}

export type TOrderActions =
  | ISetOrderRequest
  | ISetOrderSuccess
  | ISetOrderError
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderError
  | IClearOrderError;

export const setOrderRequest = (): ISetOrderRequest => ({
  type: SET_ORDER_REQUEST,
});

export const setOrderSuccess = ({ orderId }: { orderId: number }): ISetOrderSuccess => ({
  type: SET_ORDER_SUCCESS,
  orderId,
});

export const setOrderError = ({ error }: { error: {} }): ISetOrderError => ({
  type: SET_ORDER_ERROR,
  error,
});

export const getOrderRequest = (): IGetOrderRequest => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderSuccess = ({ order }: { order: TOrder }): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  order,
});

export const getOrderError = ({ error }: { error: {} }): IGetOrderError => ({
  type: GET_ORDER_ERROR,
  error,
});

export const clearOrderError = (): IClearOrderError => ({
  type: CLEAR_ORDER_ERROR,
});
