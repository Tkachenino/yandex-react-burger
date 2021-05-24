import "./App.css";
import AppHeader from "./components/App-header";
import BurgerIngredients from "./components/Burger-ingredients";

import BurgerConstructor from "./components/Burger-constructor";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main style={{ display: "flex", justifyContent: "center" }}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
