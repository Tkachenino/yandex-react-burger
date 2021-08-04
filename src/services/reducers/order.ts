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
import { TOrderActions } from "../action-creators/order";

type TOrderStore = {
  orderId: null | number;
  order: null | TOrder;
  orderLoading: boolean;
  orderError: null | string;
};

export const initState: TOrderStore = {
  orderId: null,
  order: null,
  orderLoading: false,
  orderError: null,
};

export const orderReducer = (state = initState, action: TOrderActions): TOrderStore => {
  switch (action.type) {
    case SET_ORDER_REQUEST: {
      return {
        ...state,
        orderLoading: true,
      };
    }
    case SET_ORDER_SUCCESS: {
      return {
        ...state,
        orderLoading: false,
        orderId: action.orderId,
        orderError: null,
      };
    }
    case SET_ORDER_ERROR: {
      return {
        ...state,
        orderLoading: false,
        orderError: action.error,
      };
    }

    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderLoading: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderLoading: false,
        order: action.order,
        orderError: null,
      };
    }
    case GET_ORDER_ERROR: {
      return {
        ...state,
        orderLoading: false,
        orderError: action.error,
      };
    }
    case CLEAR_ORDER_ERROR: {
      return {
        ...state,
        orderError: null,
      };
    }
    default: {
      return state;
    }
  }
};
