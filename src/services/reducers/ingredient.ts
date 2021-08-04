import { SET_DETAIL_INFO, DELETE_DETAIL_INFO } from "../action-types/ingredient";
import { TIngredientActions } from "../action-creators/ingredient";
import { TIngredient } from "../../data/types";

type TIngredientState = {
  ingredientDetail: null | TIngredient;
};

export const initState: TIngredientState = {
  ingredientDetail: null,
};

export const ingredientReducer = (
  state = initState,
  action: TIngredientActions
): TIngredientState => {
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
