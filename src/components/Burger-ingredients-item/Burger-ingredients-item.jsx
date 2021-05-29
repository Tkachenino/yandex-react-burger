import { useState } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../Modal-overlay";
import Modal from "../Modal";
import OrderDetails from "../Order-details";
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
      {showModal &&
        ReactDOM.createPortal(
          <ModalOverlay onDestroyModal={() => setShowModal(false)}>
            <Modal
              header="Детали ингредиента"
              onDestroyModal={() => setShowModal(false)}
            >
              <OrderDetails item={data} />
            </Modal>
          </ModalOverlay>,
          document.querySelector(".App")
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
