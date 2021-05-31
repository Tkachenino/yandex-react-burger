import { useState, useEffect } from "react";
import AppHeader from "../App-header";
import BurgerIngredients from "../Burger-ingredients";
import BurgerConstructor from "../Burger-constructor";
// import { getIngredients } from "../../utils/api";
import "./App.css";

const URL_ADRESS = "https://norma.nomoreparties.space/api";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [constructorIngredients, setConstructorIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getIngredients = async () => {
    setLoading(true);
    try {
      const resp = await fetch(`${URL_ADRESS}/ingredients`);
      if (!resp.ok) {
        throw new Error("Ответ сети не ok");
      }
      const answer = await resp.json();
      if (!answer.success) {
        throw new Error("Не удачный запрос от сервера");
      }
      setIngredients(answer.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  useEffect(() => {
    if (ingredients.length) {
      const constructorIngredients = ingredients.filter(
        (i) => i.type !== "bun"
      );
      setConstructorIngredients(constructorIngredients);
    }
  }, [ingredients]);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients
          ingredients={ingredients}
          error={error}
          loading={loading}
        />
        <BurgerConstructor ingredients={constructorIngredients} />
      </main>
    </div>
  );
};

export default App;
