import { URL_ADDRESS } from "../../utils/const";

export const getIngredients = () => async (dispatch) => {
  dispatch({ type: "GET_ITEM_REQUEST" });
  try {
    const resp = await fetch(`${URL_ADDRESS}/ingredients`);
    if (!resp.ok) {
      throw new Error("Ответ сети не ok");
    }
    const answer = await resp.json();
    if (!answer.success) {
      throw new Error("Не удачный запрос от сервера");
    }
    dispatch({ type: "GET_ITEM_SUCCESS", ingredients: answer.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "GET_ITEM_ERROR", error: error.message });
  }
};

export const getOrder = (setShowModal) => async (dispatch, store) => {
  const { bun, constructorIngredient } = store().constructorIngredient;
  dispatch({ type: "SET_ORDER_REQUEST" });
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
    dispatch({ type: "SET_ORDER_SUCCESS", orderId: answer.order.number });
    setShowModal(true);
  } catch (error) {
    dispatch({ type: "SET_ORDER_ERROR", error: error.message });
  }
};
