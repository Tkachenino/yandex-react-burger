import { GET_ITEM_REQUEST, GET_ITEM_SUCCESS, GET_ITEM_ERROR } from "../action-types/ingredients";

export const initState = {
  loading: false,
  error: null,
  ingredients: [],
};

export const ingredientsReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_ITEM_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ITEM_SUCCESS: {
      return {
        loading: false,
        error: null,
        ingredients: action.ingredients,
      };
    }
    case GET_ITEM_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
