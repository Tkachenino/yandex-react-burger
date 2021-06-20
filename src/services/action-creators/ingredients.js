import { GET_ITEM_REQUEST, GET_ITEM_SUCCESS, GET_ITEM_ERROR } from "../action-types/ingredients";

export const getItemRequest = () => ({
  type: GET_ITEM_REQUEST,
});

export const getItemSuccess = ({ ingredients }) => ({
  type: GET_ITEM_SUCCESS,
  ingredients,
});

export const getItemError = ({ error }) => ({
  type: GET_ITEM_ERROR,
  error,
});
