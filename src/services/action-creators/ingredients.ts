import { GET_ITEM_REQUEST, GET_ITEM_SUCCESS, GET_ITEM_ERROR } from "../action-types/ingredients";
import { TIngredient } from "./constructor";

interface IGetItemRequest {
  type: typeof GET_ITEM_REQUEST;
}

interface IGtItemSuccess {
  type: typeof GET_ITEM_SUCCESS;
  ingredients: Array<TIngredient>;
}

interface IGetItemError {
  type: typeof GET_ITEM_ERROR;
  error: {};
}

export const getItemRequest = (): IGetItemRequest => ({
  type: GET_ITEM_REQUEST,
});

export const getItemSuccess = ({
  ingredients,
}: {
  ingredients: Array<TIngredient>;
}): IGtItemSuccess => ({
  type: GET_ITEM_SUCCESS,
  ingredients,
});

export const getItemError = ({ error }: { error: {} }): IGetItemError => ({
  type: GET_ITEM_ERROR,
  error,
});
