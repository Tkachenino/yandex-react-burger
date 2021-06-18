import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { OrderReducer } from "../reducers/order";
import { ConstructorReducer } from "../reducers/constructor";
import { IngredientReducer } from "../reducers/ingredient";
import { IngredientsReducer } from "../reducers/ingredients";

const reducer = combineReducers({
  order: OrderReducer,
  constructorIngredient: ConstructorReducer,
  ingredient: IngredientReducer,
  ingredients: IngredientsReducer,
});

const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
