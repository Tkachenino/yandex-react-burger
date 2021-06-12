export const initState = {
  loading: false,
  error: null,
  ingredients: [],
  constructorIngredient: [],
  bun: null,
  orderCost: 0,
  orderId: null,
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ITEM_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }
    case "GET_ITEM_SUCCESS": {
      return {
        ...state,
        loading: false,
        error: null,
        ingredients: action.ingredients,
        constructorIngredient: action.ingredients.filter((item) => item.type !== "bun"),
        bun: action.ingredients.find((item) => item.type === "bun"),
      };
    }
    case "GET_ITEM_ERROR": {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    case "SET_ORDER_COST": {
      const cost =
        state.constructorIngredient.reduce((acc, item) => (acc += Number(item.price)), 0) +
        state.bun.price * 2;
      return {
        ...state,
        orderCost: cost,
      };
    }
    case "SET_ORDER_ID": {
      return {
        ...state,
        orderId: action.orderId,
      };
    }
    default: {
      return state;
    }
  }
};
