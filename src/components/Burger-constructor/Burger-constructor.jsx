import { useContext } from "react";
import { IngredientsContext } from "../../context/context";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorTotal from "../burger-constructor-total";
import style from "./burger-constructor.module.css";

const BurgerConstructor = () => {
  const [{ bun, constructorIngredient, error, loading }] = useContext(IngredientsContext);

  return (
    <>
      {loading && !!error && <div>Загрузка данных</div>}
      {!loading && !error && <div>{error}</div>}
      {!loading && !error && (
        <section className={`${style.constructor} pl-4 pt-25 pb-13`}>
          {!bun && (
            <div className={`ml-8`}>
              <p className={`${style.emptyBut} ${style.emptyButTop}`}>
                Это место зарезервировано под верхнюю булочку
              </p>
            </div>
          )}
          {!!bun && (
            <div className={`ml-8`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          )}

          <ul className={`${style.constructorList}`}>
            {!constructorIngredient.length && (
              <div className={`ml-8`}>
                <p className={`${style.emptyConstructor}`}>
                  Кажется меж булочек ничего нет. Попробуй перетащить несколько ингредиентов
                </p>
              </div>
            )}
            {constructorIngredient.map((i) => (
              <li key={i._id} className={`${style.constructorItem}`}>
                <DragIcon type="primary" />
                <ConstructorElement text={i.name} price={i.price} thumbnail={i.image} />
              </li>
            ))}
          </ul>
          {!bun && (
            <div className={`ml-8`}>
              <p className={`${style.emptyBut} ${style.emptyButBottom}`}>
                Это место зарезервировано под нижнюю булочку
              </p>
            </div>
          )}
          {!!bun && (
            <div className={`ml-8`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          )}
          {!!constructorIngredient.length && !!bun && <BurgerConstructorTotal />}
        </section>
      )}
    </>
  );
};

export default BurgerConstructor;
