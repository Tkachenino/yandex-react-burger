import { SET_DETAIL_INFO, DELETE_DETAIL_INFO } from "../action-types/ingredient";
import { TIngredient } from "../../data/types";

export interface ISetDetailInfo {
  readonly type: typeof SET_DETAIL_INFO;
  ingredientDetail: TIngredient;
}

export interface IDeleteDetailInfo {
  readonly type: typeof DELETE_DETAIL_INFO;
}

export type TIngredientActions = ISetDetailInfo | IDeleteDetailInfo;

export const setDetailInfo = ({
  ingredientDetail,
}: {
  ingredientDetail: TIngredient;
}): ISetDetailInfo => ({
  type: SET_DETAIL_INFO,
  ingredientDetail,
});

export const deleteDetailInfo = (): IDeleteDetailInfo => ({
  type: DELETE_DETAIL_INFO,
});
