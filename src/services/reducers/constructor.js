import { nanoid } from "@reduxjs/toolkit";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const ADD_BUN = "ADD_BUN";
export const REMOVE_BUN = "REMOVE_BUN";
export const REBASE_ITEMS = "REBASE_ITEMS";

export const CALC_TOTAL_COST = "CALC_TOTAL_COST";

export const initState = {
  constructorIngredient: [],
  bun: null,
  totalCost: 0,
};

export const ConstructorReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIngredient: [
          ...state.constructorIngredient,
          { ...action.ingredient, constructorId: nanoid() },
        ],
      };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        constructorIngredient: state.constructorIngredient.filter(
          (item) => item.constructorId !== action.id
        ),
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: { ...action.bun, constructorId: nanoid() },
      };
    }
    case REMOVE_BUN: {
      return {
        ...state,
        bun: null,
      };
    }
    case REBASE_ITEMS: {
      const newList = state.constructorIngredient.slice();
      const dragItem = state.constructorIngredient.slice()[action.dragIndex];
      const hoverItem = state.constructorIngredient.slice()[action.hoverIndex];
      newList[action.hoverIndex] = dragItem;
      newList[action.dragIndex] = hoverItem;

      return {
        ...state,
        constructorIngredient: newList,
      };
    }
    case CALC_TOTAL_COST: {
      const ingredientsCost = state.constructorIngredient.reduce(
        (acc, item) => (acc += Number(item.price)),
        0
      );
      const bunCost = state.bun !== null ? state.bun.price * 2 : 0;
      const totalCost = ingredientsCost + bunCost;
      return {
        ...state,
        totalCost,
      };
    }
    default: {
      return state;
    }
  }
};
