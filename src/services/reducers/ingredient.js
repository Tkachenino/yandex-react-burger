export const SET_DETAIL_INFO = "SET_DETAIL_INFO";
export const DELETE_DETAIL_INFO = "DELETE_DETAIL_INFO";

export const initState = {
  ingredientDetail: null,
};

export const IngredientReducer = (state = initState, action) => {
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
