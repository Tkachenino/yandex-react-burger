import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import AppHeader from "../app-header";
import BurgerIngredients from "../burger-ingredients";
import BurgerConstructor from "../burger-constructor";

import "./app.module.css";

const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
};

export default App;
