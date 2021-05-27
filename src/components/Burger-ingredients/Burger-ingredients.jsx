import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsList from "../Burger-ingredients-list";
import style from "./Burger-ingredients.module.css";
import data from "../../utils/data.json";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("bun");
  return (
    <div className={style.ingredients_wrapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберить бургер</h1>
      <div className={style.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={style.ingredients_list}>
        {data.some((i) => i.type === "bun") && (
          <BurgerIngredientsList items={data} type="bun" name="Булки" />
        )}
        {data.some((i) => i.type === "sauce") && (
          <BurgerIngredientsList items={data} type="sauce" name="Соусы" />
        )}
        {data.some((i) => i.type === "main") && (
          <BurgerIngredientsList items={data} type="main" name="Начинки" />
        )}
      </div>
    </div>
  );
};

export default BurgerIngredients;
