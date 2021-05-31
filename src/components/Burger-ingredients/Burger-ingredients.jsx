import { useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsList from "../Burger-ingredients-list";
import style from "./Burger-ingredients.module.css";
// import data from "../../utils/data.json";
import PropTypes from "prop-types";

const BurgerIngredients = ({ ingredients, error, loading }) => {
  const [current, setCurrent] = useState("bun");
  return (
    <>
      {loading && !error && <div>Loading...</div>}
      {!loading && error && <div>Error...</div>}
      {!loading && !error && (
        <div className={style.ingredients_wrapper}>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Соберить бургер
          </h1>
          <div className={style.tabs}>
            <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab
              value="sauce"
              active={current === "sauce"}
              onClick={setCurrent}
            >
              Соусы
            </Tab>
            <Tab value="main" active={current === "main"} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>
          <div className={style.ingredients_list}>
            {ingredients.some((i) => i.type === "bun") && (
              <BurgerIngredientsList
                items={ingredients}
                type="bun"
                name="Булки"
              />
            )}
            {ingredients.some((i) => i.type === "sauce") && (
              <BurgerIngredientsList
                items={ingredients}
                type="sauce"
                name="Соусы"
              />
            )}
            {ingredients.some((i) => i.type === "main") && (
              <BurgerIngredientsList
                items={ingredients}
                type="main"
                name="Начинки"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      price: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loading: PropTypes.bool,
};

export default BurgerIngredients;
