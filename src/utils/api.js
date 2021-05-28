const URL_ADRESS = "https://norma.nomoreparties.space/api/ingredients";

export const getIngredients = async () => {
  try {
    const resp = await fetch(URL_ADRESS);
    const answer = await resp.json();
    console.log("api", answer);
    return answer;
  } catch (error) {
    console.log(error);
  }
};
