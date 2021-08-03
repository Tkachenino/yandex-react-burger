import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "../../data/hooks";
import { getIngredients } from "../../services/effects";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../loader";
import ErrorBounder from "../error-bounder";
import BurgerIngredientsList from "../burger-ingredients-list";
import style from "./burger-ingredients.module.css";

const BurgerIngredients: React.FC = () => {
  const dispatch = useDispatch();
  const { ingredients, error, loading } = useSelector((store) => store.ingredients);
  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [ingredients, dispatch]);

  const [current, setCurrent] = useState<string>("bun");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const hadnleTab = (value: "bun" | "sauce" | "main") => () => {
    setCurrent(value);
    if (value === "bun" && bunRef.current !== null) {
      bunRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    if (value === "sauce" && sauceRef.current !== null) {
      sauceRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    if (value === "main" && mainRef.current !== null) {
      mainRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  const handlerScrollBar = useCallback(() => {
    if (wrapperRef.current !== null && bunRef.current !== null && sauceRef.current !== null) {
      if (Math.ceil(wrapperRef.current.scrollTop) < bunRef.current.scrollHeight / 2) {
        setCurrent("bun");
      } else if (
        Math.ceil(wrapperRef.current.scrollTop) <
        bunRef.current.scrollHeight + sauceRef.current.scrollHeight / 2
      ) {
        setCurrent("sauce");
      } else {
        setCurrent("main");
      }
    }
  }, []);

  return (
    <div className={style.ingredients_wrapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={style.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={hadnleTab("bun")}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={hadnleTab("sauce")}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={hadnleTab("main")}>
          Начинки
        </Tab>
      </div>
      {loading && !error && <Loader />}
      {!loading && !!error && <ErrorBounder errorMessage={error} />}
      {!loading && !error && (
        <>
          {!ingredients.length && (
            <div>
              <p className="text text_type_main-default mt-10 mb-5">
                Все ингредиенты кончились. Мы работаем над этой проблемой. Попробуйте обновить
                страницу.
              </p>
            </div>
          )}
          <div ref={wrapperRef} className={style.ingredients_list} onScroll={handlerScrollBar}>
            {ingredients.some((i) => i.type === "bun") && (
              <BurgerIngredientsList
                propsRef={bunRef}
                items={ingredients}
                type="bun"
                name="Булки"
              />
            )}
            {ingredients.some((i) => i.type === "sauce") && (
              <BurgerIngredientsList
                propsRef={sauceRef}
                items={ingredients}
                type="sauce"
                name="Соусы"
              />
            )}
            {ingredients.some((i) => i.type === "main") && (
              <BurgerIngredientsList
                propsRef={mainRef}
                items={ingredients}
                type="main"
                name="Начинки"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BurgerIngredients;
