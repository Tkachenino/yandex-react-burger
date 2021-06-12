import { useContext } from "react";
import { IngredientContext } from "../../context/context";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorTotal from "../Burger-constructor-total";
import style from "./Burger-constructor.module.css";

const BurgerConstructor = () => {
  const [{ bun, constructorIngredient, error, loading }] = useContext(IngredientContext);

  return (
    <>
      {loading && !!error && <div>Загрузка данных</div>}
      {!loading && !error && <div>{error}</div>}
      {!loading && !error && !!constructorIngredient.length && (
        <section className={`${style.constructor} pl-4 pt-25 pb-13`}>
          <div className={`ml-8`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>

          <ul className={`${style.constructorList}`}>
            {constructorIngredient.map((i) => (
              <li key={i._id} className={`${style.constructorItem}`}>
                <DragIcon type="primary" />
                <ConstructorElement text={i.name} price={i.price} thumbnail={i.image} />
              </li>
            ))}
          </ul>
          <div className={`ml-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>

          <BurgerConstructorTotal />
        </section>
      )}
    </>
  );
};

export default BurgerConstructor;
