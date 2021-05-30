import { useState } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../Modal-overlay";
import Modal from "../Modal";
import OrderDetails from "../Order-details";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./Burger-constructor-total.module.css";

const BurgerConstructorTotal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`${style.total_wrapper} mt-10 mb-13`}>
      <div className={`${style.price_wrapper} mr-10`}>
        <p className="text text_type_digits-medium mr-2">650</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={() => setShowModal(true)}>
        Нажми на меня
      </Button>
      {showModal &&
        ReactDOM.createPortal(
          <ModalOverlay onDestroyModal={() => setShowModal(false)}>
            <Modal onDestroyModal={() => setShowModal(false)}>
              <OrderDetails />
            </Modal>
          </ModalOverlay>,
          document.querySelector(".App")
        )}
    </div>
  );
};

export default BurgerConstructorTotal;
