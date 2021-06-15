import { useState, useCallback, useRef, useContext } from "react";
import { IngredientsContext } from "../../context/context";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from "../loader";
import ErrorBounder from "../error-bounder";
import BurgerIngredientsList from "../burger-ingredients-list";
import style from "./burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [{ ingredients, error, loading }] = useContext(IngredientsContext);

  const [current, setCurrent] = useState("bun");
  const wrapperRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const hadnleTab = (value, ref) => () => {
    setCurrent(value);
    if (bunRef.current && sauceRef.current && mainRef.current) {
      ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  };

  const handlerScrollBar = useCallback(() => {
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
  }, []);

  return (
    <div className={style.ingredients_wrapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={style.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={hadnleTab("bun", bunRef)}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={hadnleTab("sauce", sauceRef)}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={hadnleTab("main", mainRef)}>
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
