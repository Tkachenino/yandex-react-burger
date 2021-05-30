import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorTotal from "../Burger-constructor-total";
import style from "./Burger-constructor.module.css";
import PropTypes from "prop-types";

const BurgerConstructor = ({ ingredients }) => {
  return (
    <section className={`${style.constructor} pl-4 pt-25 pb-13`}>
      <div className={`ml-8`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Флюоресцентная булка R2-D3 (верх)"
          price={1255}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
        />
      </div>

      <ul className={`${style.constructorList}`}>
        {ingredients.map((i) => (
          <li key={i._id} className={`${style.constructorItem}`}>
            <DragIcon type="primary" />
            <ConstructorElement
              text={i.name}
              price={i.price}
              thumbnail={i.image}
            />
          </li>
        ))}
      </ul>
      <div className={`ml-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Флюоресцентная булка R2-D3 (низ)"
          price={1255}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-01.png"}
        />
      </div>

      <BurgerConstructorTotal />
    </section>
  );
};

BurgerConstructor.propTypes = {
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

export default BurgerConstructor;
