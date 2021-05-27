import "./App.css";
import AppHeader from "./components/App-header";
import BurgerIngredients from "./components/Burger-ingredients";
import BurgerConstructor from "./components/Burger-constructor";

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
