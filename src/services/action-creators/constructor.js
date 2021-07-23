import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  REMOVE_BUN,
  CLEAR_INGREDIENTS,
  REBASE_ITEMS,
  CALC_TOTAL_COST,
} from "../action-types/constructor";

export const addIngredient = ({ ingredient }) => ({
  type: ADD_INGREDIENT,
  ingredient,
});

export const removeIngredient = ({ id }) => ({
  type: REMOVE_INGREDIENT,
  id,
});

export const clearIngredients = () => ({
  type: CLEAR_INGREDIENTS,
});

export const addBun = ({ bun }) => ({
  type: ADD_BUN,
  bun,
});

export const removeBun = () => ({
  type: REMOVE_BUN,
});

export const rebaseItems = ({ dragIndex, hoverIndex }) => ({
  type: REBASE_ITEMS,
  dragIndex,
  hoverIndex,
});

export const calcTotalCost = () => ({
  type: CALC_TOTAL_COST,
});
