import { useSelector, useDispatch } from "../../data/hooks";
import { addIngredient, addBun } from "../../services/action-creators/constructor";
import BurgerConstructorDragIngredient from "../burger-constructor-drag-ingredient";
import { useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorTotal from "../burger-constructor-total";
import style from "./burger-constructor.module.css";
import { nanoid } from "nanoid";
import { TIngredient } from "../../data/types";

const BurgerConstructor: React.FC = () => {
  const dispatch = useDispatch();
  const { bun, constructorIngredient } = useSelector((store) => store.constructorIngredient);

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      console.log(item);
      const constructorId = nanoid();
      if (item.type === "bun") {
        dispatch(addBun({ bun: item, constructorId }));
      } else {
        dispatch(addIngredient({ ingredient: item, constructorId }));
      }
    },
  });

  return (
    <>
      <section ref={dropRef} className={`${style.constructor} pl-4 pt-25 pb-13`}>
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
            <li className={`ml-8`}>
              <p className={`${style.emptyConstructor}`}>
                Кажется меж булочек ничего нет. Попробуй перетащить несколько ингредиентов
              </p>
            </li>
          )}
          {constructorIngredient.map((i, index) => (
            <BurgerConstructorDragIngredient
              key={i.constructorId}
              id={i.constructorId}
              item={i}
              index={index}
            />
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
    </>
  );
};

export default BurgerConstructor;
