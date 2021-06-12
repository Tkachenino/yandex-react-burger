import { useState, useCallback, useRef, useContext } from "react";
import { IngredientContext } from "../../context/context";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsList from "../Burger-ingredients-list";
import style from "./Burger-ingredients.module.css";

const BurgerIngredients = () => {
  const [{ ingredients, error, loading }] = useContext(IngredientContext);

  const [current, setCurrent] = useState("bun");
  const wrapperRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const hadnleTab = (value, ref) => () => {
    setCurrent(value);
    ref.current.scrollIntoView({ block: "start", behavior: "smooth" });
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
    <>
      {loading && !error && <div>Loading...</div>}
      {!loading && !!error && <div>{error}</div>}
      {!loading && !error && (
        <div className={style.ingredients_wrapper}>
          <h1 className="text text_type_main-large mt-10 mb-5">Соберить бургер</h1>
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
        </div>
      )}
    </>
  );
};

export default BurgerIngredients;
