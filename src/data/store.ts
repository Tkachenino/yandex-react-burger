import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../services/store";
import { TConstructorActions } from "../services/action-creators/constructor";
import { TIngredientActions } from "../services/action-creators/ingredient";
import { TIngredientsActions } from "../services/action-creators/ingredients";
import { TOrderActions } from "../services/action-creators/order";
import { TProfileActions } from "../services/action-creators/profile";
import { TWsOwnActions } from "../services/action-creators/websocket-own";
import { TWsActions } from "../services/action-creators/websocket";

type TApplicationActions =
  | TConstructorActions
  | TIngredientActions
  | TIngredientsActions
  | TOrderActions
  | TProfileActions
  | TWsOwnActions
  | TWsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, Action, TApplicationActions>
>;
