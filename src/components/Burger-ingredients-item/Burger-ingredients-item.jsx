import { useState } from "react";
import Modal from "../Modal";
import IngredientDetails from "../Ingredient-details";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import style from "./Burger-ingredients-item.module.css";

const BurgerIngredientsItem = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className={style.wrapper}
        onClick={() => {
          setShowModal(true);
        }}
      >
        <Counter count={1} size="default" />
        <img className={style.image} src={data.image} />
        <div className={style.price_wrapper}>
          <p className="text text_type_digits-default mr-2">{data.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${style.description} text text_type_main-default`}>
          {data.name}
        </p>
      </div>
      {showModal && (
        <Modal
          header="Детали ингредиента"
          onDestroyModal={() => setShowModal(false)}
        >
          <IngredientDetails item={data} />
        </Modal>
      )}
    </>
  );
};

BurgerIngredientsItem.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
  }),
};

export default BurgerIngredientsItem;
