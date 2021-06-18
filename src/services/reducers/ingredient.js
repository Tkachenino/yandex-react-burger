export const GET_ITEM_REQUEST = "GET_ITEM_REQUEST";
export const GET_ITEM_SUCCESS = "GET_ITEM_SUCCESS";
export const GET_ITEM_ERROR = "GET_ITEM_ERROR";

export const initState = {
  ingredient: null,
};

export const IngredientReducer = (state = initState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
