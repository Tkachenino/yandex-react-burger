export const GET_ITEM_REQUEST = "GET_ITEM_REQUEST";
export const GET_ITEM_SUCCESS = "GET_ITEM_SUCCESS";
export const GET_ITEM_ERROR = "GET_ITEM_ERROR";
export const SET_ORDER_COST = "SET_ORDER_COST";
export const SET_ORDER_REQUEST = "SET_ORDER_REQUEST";
export const SET_ORDER_SUCCESS = "SET_ORDER_SUCCESS";
export const SET_ORDER_ERROR = "SET_ORDER_ERROR";
export const CLEAR_ORDER_ERROR = "CLEAR_ORDER_ERROR";
export const SET_ORDER_ID = "SET_ORDER_ID";

export const initState = {
  loading: false,
  error: null,
  ingredients: [],
  constructorIngredient: [],
  bun: null,
  orderCost: 0,
  orderId: null,
  orderLoading: false,
  orderError: null,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ITEM_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ITEM_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        ingredients: action.ingredients,
        constructorIngredient: action.ingredients.filter((item) => item.type !== "bun"),
        bun: action.ingredients.find((item) => item.type === "bun"),
      };
    }
    case GET_ITEM_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case SET_ORDER_COST: {
      const ingredientsCost = state.constructorIngredient.reduce(
        (acc, item) => (acc += Number(item.price)),
        0
      );
      const bunCost = state.bun !== null ? state.bun.price * 2 : 0;
      const orderCost = ingredientsCost + bunCost;
      return {
        ...state,
        orderCost,
      };
    }
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
