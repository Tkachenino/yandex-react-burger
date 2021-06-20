import {
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_ERROR,
  CLEAR_ORDER_ERROR,
} from "../action-types/order";

export const setOrderRequest = () => ({
  type: SET_ORDER_REQUEST,
});

export const setOrderSuccess = ({ orderId }) => ({
  type: SET_ORDER_SUCCESS,
  orderId,
});

export const setOrderError = ({ error }) => ({
  type: SET_ORDER_ERROR,
  error,
});

export const clearOrderError = () => ({
  type: CLEAR_ORDER_ERROR,
});
