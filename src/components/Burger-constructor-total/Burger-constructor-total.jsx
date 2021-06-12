import { useState, useContext, useEffect } from "react";
import Modal from "../Modal";
import OrderDetails from "../Order-details";
import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientContext } from "../../context/context";
import { URL_ADRESS } from "../../utils/const";
import style from "./Burger-constructor-total.module.css";

const BurgerConstructorTotal = () => {
  const [showModal, setShowModal] = useState(false);
  const [{ constructorIngredient, bun, orderCost, orderId }, dispatch] =
    useContext(IngredientContext);

  useEffect(() => {
    dispatch({ type: "SET_ORDER_COST" });
  }, [constructorIngredient, bun, dispatch]);

  const setOrder = async () => {
    try {
      const resp = await fetch(`${URL_ADRESS}/orders`, {
        method: "POST",
        body: JSON.stringify({
          ingredients: [bun._id, ...constructorIngredient.map((item) => item._id), bun._id],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const answer = await resp.json();
      if (!answer.success) {
        throw new Error("Запрос завершился с отрицательным статусом");
      }
      dispatch({ type: "SET_ORDER_ID", orderId: answer.order.number });
      setShowModal(true);
    } catch (error) {
      dispatch({ type: "GET_ITEM_ERROR", error });
    }
  };

  const hadnlerOrder = () => {
    setOrder();
  };

  return (
    <div className={`${style.total_wrapper} mt-10 mb-13`}>
      <div className={`${style.price_wrapper} mr-10`}>
        <p className="text text_type_digits-medium mr-2">{orderCost}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={hadnlerOrder}>
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
