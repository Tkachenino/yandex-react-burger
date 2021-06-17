import { useState, useContext, useEffect } from "react";
import Modal from "../modal";
import OrderDetails from "../order-details";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsContext } from "../../context/context";
import {
  SET_ORDER_REQUEST,
  SET_ORDER_SUCCESS,
  SET_ORDER_ERROR,
  SET_ORDER_COST,
  CLEAR_ORDER_ERROR,
} from "../../reducer";
import { URL_ADDRESS } from "../../utils/const";
import style from "./burger-constructor-total.module.css";

const BurgerConstructorTotal = () => {
  const [showModal, setShowModal] = useState(false);
  const [{ constructorIngredient, bun, orderCost, orderId, orderLoading, orderError }, dispatch] =
    useContext(IngredientsContext);

  useEffect(() => {
    dispatch({ type: SET_ORDER_COST });
  }, [constructorIngredient, bun, dispatch]);

  useEffect(() => {
    if (orderError) {
      let timeOut = setTimeout(() => {
        dispatch({ type: CLEAR_ORDER_ERROR });
      }, 5000);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [dispatch, orderError]);

  const setOrder = async () => {
    if (orderLoading) {
      return;
    }
    try {
      dispatch({ type: SET_ORDER_REQUEST });
      const resp = await fetch(`${URL_ADDRESS}/orders`, {
        method: "POST",
        body: JSON.stringify({
          ingredients: [bun._id, ...constructorIngredient.map((item) => item._id)],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        throw new Error("Ответ сети не ok");
      }
      const answer = await resp.json();
      if (!answer.success) {
        throw new Error("Запрос завершился с отрицательным статусом");
      }
      dispatch({ type: SET_ORDER_SUCCESS, orderId: answer.order.number });
      setShowModal(true);
    } catch (error) {
      dispatch({ type: SET_ORDER_ERROR, error: error.message });
    }
  };

  return (
    <>
      <div className={`${style.total_wrapper} mt-10 mb-13`}>
        <div className={`${style.price_wrapper} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{orderCost}</p>
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
