import { GET_ITEM_REQUEST, GET_ITEM_SUCCESS, GET_ITEM_ERROR } from "../action-types/ingredients";
import { TIngredient } from "../../data/types";

interface IGetItemRequest {
  readonly type: typeof GET_ITEM_REQUEST;
}

interface IGtItemSuccess {
  readonly type: typeof GET_ITEM_SUCCESS;
  ingredients: ReadonlyArray<TIngredient>;
}

interface IGetItemError {
  readonly type: typeof GET_ITEM_ERROR;
  error: string;
}

export type TIngredientsActions = IGetItemRequest | IGtItemSuccess | IGetItemError;

export const getItemRequest = (): IGetItemRequest => ({
  type: GET_ITEM_REQUEST,
});

export const getItemSuccess = ({
  ingredients,
}: {
  ingredients: ReadonlyArray<TIngredient>;
}): IGtItemSuccess => ({
  type: GET_ITEM_SUCCESS,
  ingredients,
});

export const getItemError = ({ error }: { error: string }): IGetItemError => ({
  type: GET_ITEM_ERROR,
  error,
});
