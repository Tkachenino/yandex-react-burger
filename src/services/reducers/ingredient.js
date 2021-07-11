import { SET_DETAIL_INFO, DELETE_DETAIL_INFO } from "../action-types/ingredient";

export const initState = {
  ingredientDetail: null,
};

export const ingredientReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_DETAIL_INFO: {
      return {
        ingredientDetail: action.ingredientDetail,
      };
    }
    case DELETE_DETAIL_INFO: {
      return {
        ingredientDetail: null,
      };
    }
    default: {
      return state;
    }
  }
};
