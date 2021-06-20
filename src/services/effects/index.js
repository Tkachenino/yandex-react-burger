import { URL_ADDRESS } from "../../utils/const";
import { getItemError, getItemRequest, getItemSuccess } from "../action-creators/ingredients";
import { setOrderError, setOrderRequest, setOrderSuccess } from "../action-creators/order";

export const getIngredients = () => async (dispatch) => {
  dispatch(getItemRequest());
  try {
    const resp = await fetch(`${URL_ADDRESS}/ingredients`);
    if (!resp.ok) {
      throw new Error("Ответ сети не ok");
    }
    const answer = await resp.json();
    if (!answer.success) {
      throw new Error("Не удачный запрос от сервера");
    }
    dispatch(getItemSuccess({ ingredients: answer.data }));
  } catch (error) {
    console.log(error);
    dispatch(getItemError({ error: error.message }));
  }
};

export const getOrder = (setShowModal) => async (dispatch, store) => {
  const { bun, constructorIngredient } = store().constructorIngredient;
  dispatch(setOrderRequest());
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
    dispatch(setOrderSuccess({ orderId: answer.order.number }));
    setShowModal(true);
  } catch (error) {
    dispatch(setOrderError({ error: error.message }));
  }
};
