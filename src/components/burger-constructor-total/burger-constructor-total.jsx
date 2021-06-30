import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../modal";
import OrderDetails from "../order-details";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getOrder } from "../../services/effects";
import style from "./burger-constructor-total.module.css";
import { calcTotalCost } from "../../services/action-creators/constructor";
import { clearOrderError } from "../../services/action-creators/order";

const BurgerConstructorTotal = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { constructorIngredient, bun, totalCost, orderId, orderLoading, orderError } = useSelector(
    (store) => ({
      ...store.order,
      ...store.constructorIngredient,
    })
  );

  useEffect(() => {
    dispatch(calcTotalCost());
  }, [constructorIngredient, bun, dispatch]);

  useEffect(() => {
    if (orderError) {
      let timeOut = setTimeout(() => {
        dispatch(clearOrderError());
      }, 5000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [dispatch, orderError]);

  const setOrder = () => {
    if (orderLoading) {
      return;
    }
    dispatch(getOrder(setShowModal));
  };

  return (
    <>
      <div className={`${style.total_wrapper} mt-10 mb-13`}>
        <div className={`${style.price_wrapper} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{totalCost}</p>
          <CurrencyIcon type="primary" />
        </div>

        <Button type="primary" size="large" onClick={setOrder}>
          {orderLoading ? "Идет запрос" : "Нажми на меня"}
        </Button>

        {showModal && (
          <Modal onDestroyModal={() => setShowModal(false)}>
            <OrderDetails orderId={orderId} />
          </Modal>
        )}
      </div>
      {!!orderError && (
        <div className={`${style.errorMessage}  text text_type_main-small`}>{orderError}</div>
      )}
    </>
  );
};

export default BurgerConstructorTotal;
