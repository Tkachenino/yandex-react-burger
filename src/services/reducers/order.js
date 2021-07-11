import {
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_ERROR,
  CLEAR_ORDER_ERROR,
} from "../action-types/order";

export const initState = {
  orderId: null,
  orderLoading: false,
  orderError: null,
};

export const orderReducer = (state = initState, action) => {
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
