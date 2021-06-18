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
