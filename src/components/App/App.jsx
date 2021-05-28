import { useState, useEffect } from "react";
import AppHeader from "../App-header";
import BurgerIngredients from "../Burger-ingredients";
import BurgerConstructor from "../Burger-constructor";
// import { getIngredients } from "../../utils/api";
import "./App.css";

const URL_ADRESS = "https://norma.nomoreparties.space/api/ingredients";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getIngredients = async () => {
    setLoading(true);
    try {
      const resp = await fetch(URL_ADRESS);
      if (resp.ok) {
        const answer = await resp.json();
        if (answer.success) {
          setIngredients(answer.data);
        }
      }
    } catch (error) {
      setError("Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIngredients();
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients
          ingredients={ingredients}
          error={error}
          loading={loading}
        />
        <BurgerConstructor />
      </main>
    </div>
  );
};

export default App;
