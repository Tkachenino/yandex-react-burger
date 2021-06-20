import { nanoid } from "@reduxjs/toolkit";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  REMOVE_BUN,
  REBASE_ITEMS,
  CALC_TOTAL_COST,
} from "../action-types/constructor";

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
