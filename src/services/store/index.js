import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { orderReducer } from "../reducers/order";
import { constructorReducer } from "../reducers/constructor";
import { ingredientReducer } from "../reducers/ingredient";
import { ingredientsReducer } from "../reducers/ingredients";

const reducer = combineReducers({
  order: orderReducer,
  constructorIngredient: constructorReducer,
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
