import AppHeader from "../App-header";
import BurgerIngredients from "../Burger-ingredients";
import BurgerConstructor from "../Burger-constructor";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
