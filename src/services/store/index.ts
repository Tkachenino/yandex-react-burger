import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { socketMiddleware, socketMiddlewareOwn } from "../../middleware";
import Cookies from "js-cookie";
import thunk from "redux-thunk";
import { orderReducer } from "../reducers/order";
import { profileReducer } from "../reducers/profile";
import { constructorReducer } from "../reducers/constructor";
import { ingredientReducer } from "../reducers/ingredient";
import { ingredientsReducer } from "../reducers/ingredients";
import { wsReducer } from "../reducers/websocket";
import { wsOwnReducer } from "../reducers/websocket-own";

let token = Cookies.get("token") || null;
const accessToken = token === null ? null : token.split(" ")[1];

const reducer = combineReducers({
  order: orderReducer,
  constructorIngredient: constructorReducer,
  ingredient: ingredientReducer,
  ingredients: ingredientsReducer,
  profile: profileReducer,
  ws: wsReducer,
  wsOwn: wsOwnReducer,
});

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as unknown as typeof compose) || compose;

export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      socketMiddleware("wss://norma.nomoreparties.space/orders/all"),
      socketMiddlewareOwn(`wss://norma.nomoreparties.space/orders?token=${accessToken}`)
    )
  )
);
