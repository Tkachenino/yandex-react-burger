import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  REMOVE_BUN,
  CLEAR_INGREDIENTS,
  REBASE_ITEMS,
  CALC_TOTAL_COST,
} from "../action-types/constructor";
import { TIngredient } from "../../data/types";

interface IAddIngredient {
  type: typeof ADD_INGREDIENT;
  ingredient: TIngredient;
  constructorId: string;
}

interface IRemoveIngredient {
  type: typeof REMOVE_INGREDIENT;
  id: string;
}

interface IClearIngredients {
  type: typeof CLEAR_INGREDIENTS;
}

interface IAddBun {
  type: typeof ADD_BUN;
  bun: TIngredient;
  constructorId: string;
}

interface IRemoveBun {
  type: typeof REMOVE_BUN;
}

interface IRebaseItems {
  type: typeof REBASE_ITEMS;
  dragIndex: number;
  hoverIndex: number;
}

interface ICalcTotalCost {
  type: typeof CALC_TOTAL_COST;
}

export type TConstructorActions =
  | IAddIngredient
  | IRemoveIngredient
  | IClearIngredients
  | IAddBun
  | IRemoveBun
  | IRebaseItems
  | ICalcTotalCost;

export const addIngredient = ({
  ingredient,
  constructorId,
}: {
  ingredient: TIngredient;
  constructorId: string;
}): IAddIngredient => ({
  type: ADD_INGREDIENT,
  ingredient,
  constructorId,
});

export const removeIngredient = ({ id }: { id: string }): IRemoveIngredient => ({
  type: REMOVE_INGREDIENT,
  id,
});

export const clearIngredients = (): IClearIngredients => ({
  type: CLEAR_INGREDIENTS,
});

export const addBun = ({
  bun,
  constructorId,
}: {
  bun: TIngredient;
  constructorId: string;
}): IAddBun => ({
  type: ADD_BUN,
  bun,
  constructorId,
});

export const removeBun = (): IRemoveBun => ({
  type: REMOVE_BUN,
});

export const rebaseItems = ({
  dragIndex,
  hoverIndex,
}: {
  dragIndex: number;
  hoverIndex: number;
}): IRebaseItems => ({
  type: REBASE_ITEMS,
  dragIndex,
  hoverIndex,
});

export const calcTotalCost = (): ICalcTotalCost => ({
  type: CALC_TOTAL_COST,
});
