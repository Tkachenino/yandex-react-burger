import { SET_DETAIL_INFO, DELETE_DETAIL_INFO } from "../action-types/ingredient";

export const setDetailInfo = ({ ingredientDetail }) => ({
  type: SET_DETAIL_INFO,
  ingredientDetail,
});

export const deleteDetailInfo = () => ({
  type: DELETE_DETAIL_INFO,
});
