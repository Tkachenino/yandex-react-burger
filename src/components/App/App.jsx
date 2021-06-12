import {
  useCallback,
  // useState,
  useEffect,
  useReducer,
} from "react";
import { IngredientContext } from "../../context/context";
import AppHeader from "../App-header";
import BurgerIngredients from "../Burger-ingredients";
import BurgerConstructor from "../Burger-constructor";
import { reducer, initState } from "../../reducer";
import { URL_ADRESS } from "../../utils/const";
// import { getIngredients } from "../../utils/api";
import "./App.css";

const App = () => {
  // const [ingredients, setIngredients] = useState([]);
  const storeObject = useReducer(reducer, initState);
  const [, dispatch] = storeObject;
  // const [constructorIngredients, setConstructorIngredients] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  const getIngredients = useCallback(async () => {
    dispatch({ type: "GET_ITEM_REQUEST" });
    // setLoading(true);
    try {
      const resp = await fetch(`${URL_ADRESS}/ingredients`);
      if (!resp.ok) {
        throw new Error("Ответ сети не ok");
      }
      const answer = await resp.json();
      if (!answer.success) {
        throw new Error("Не удачный запрос от сервера");
      }
      dispatch({ type: "GET_ITEM_SUCCESS", ingredients: answer.data });

      // setIngredients(answer.data);
    } catch (error) {
      dispatch({ type: "GET_ITEM_ERROR", error });
      // setError(error);
    }
    //  finally {
    //   setLoading(false);
    // }
  }, [dispatch]);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  // useEffect(() => {
  //   if (ingredients.length) {
  //     const constructorIngredients = ingredients.filter((i) => i.type !== "bun");
  //     setConstructorIngredients(constructorIngredients);
  //   }
  // }, [ingredients]);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <IngredientContext.Provider value={storeObject}>
          <BurgerIngredients
          //  ingredients={ingredients}
          // error={error}
          // loading={loading}
          />
          <BurgerConstructor
          //  ingredients={constructorIngredients}
          />
        </IngredientContext.Provider>
      </main>
    </div>
  );
};

export default App;
