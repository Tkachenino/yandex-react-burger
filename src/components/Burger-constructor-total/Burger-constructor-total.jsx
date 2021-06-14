import { useState, useContext, useEffect } from "react";
import Modal from "../modal";
import OrderDetails from "../order-details";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsContext } from "../../context/context";
import { SET_ORDER_COST, SET_ORDER_ID, GET_ITEM_ERROR } from "../../reducer";
import { URL_ADDRESS } from "../../utils/const";
import style from "./burger-constructor-total.module.css";

const BurgerConstructorTotal = () => {
  const [showModal, setShowModal] = useState(false);
  const [{ constructorIngredient, bun, orderCost, orderId }, dispatch] =
    useContext(IngredientsContext);

  useEffect(() => {
    dispatch({ type: SET_ORDER_COST });
  }, [constructorIngredient, bun, dispatch]);

  const setOrder = async () => {
    try {
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
      dispatch({ type: SET_ORDER_ID, orderId: answer.order.number });
      setShowModal(true);
    } catch (error) {
      dispatch({ type: GET_ITEM_ERROR, error });
    }
  };

  return (
    <div className={`${style.total_wrapper} mt-10 mb-13`}>
      <div className={`${style.price_wrapper} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{orderCost}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={setOrder}>
        Нажми на меня
      </Button>
      {showModal && (
        <Modal onDestroyModal={() => setShowModal(false)}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </div>
  );
};

export default BurgerConstructorTotal;
