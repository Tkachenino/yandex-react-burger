import { GET_ITEM_REQUEST, GET_ITEM_SUCCESS, GET_ITEM_ERROR } from "../action-types/ingredients";
import { TIngredient } from "../../data/types";
import { TIngredientsActions } from "../action-creators/ingredients";

type TIngredientsState = {
  loading: boolean;
  error: null | {};
  ingredients: Array<TIngredient>;
};

export const initState: TIngredientsState = {
  loading: false,
  error: null,
  ingredients: [],
};

export const ingredientsReducer = (
  state = initState,
  action: TIngredientsActions
): TIngredientsState => {
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
