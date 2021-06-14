import { useCallback, useEffect, useReducer } from "react";
import { IngredientsContext } from "../../context/context";
import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";
import {
  reducer,
  initState,
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  GET_ITEM_ERROR,
} from "../../reducer";
import { URL_ADDRESS } from "../../utils/const";
import "./app.css";

const App = () => {
  const storeObject = useReducer(reducer, initState);
  const [, dispatch] = storeObject;

  const getIngredients = useCallback(async () => {
    dispatch({ type: GET_ITEM_REQUEST });
    try {
      const resp = await fetch(`${URL_ADDRESS}/ingredients`);
      if (!resp.ok) {
        throw new Error("Ответ сети не ok");
      }
      const answer = await resp.json();
      if (!answer.success) {
        throw new Error("Не удачный запрос от сервера");
      }
      dispatch({ type: GET_ITEM_SUCCESS, ingredients: answer.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_ITEM_ERROR, error: error.message });
    }
  }, [dispatch]);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <IngredientsContext.Provider value={storeObject}>
          <BurgerIngredients />
          <BurgerConstructor />
        </IngredientsContext.Provider>
      </main>
    </div>
  );
};

export default App;
