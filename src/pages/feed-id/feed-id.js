import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./feed-id.module.css";

const fakeData = {
  id: 123454,
  name: "Death Star Starship Main бургер",
  status: "Выполнен",
  date: "01.02.1991",
  ingredients: [
    {
      id: "60d3b41abdacab0026a733c6",
      img: "https://code.s3.yandex.net/react/code/bun-02.png",
      name: "Флюоресцентная булка R2-D3",
    },
    {
      id: "60d3b41abdacab0026a733ca",
      img: "https://code.s3.yandex.net/react/code/meat-04.png",
      name: "Филе Люминесцентного тетраодонтимформа",
    },
    {
      id: "60d3b41abdacab0026a733d2",
      img: "https://code.s3.yandex.net/react/code/core.png",
      name: "Соус традиционный галактический",
    },
  ],
};
const FeedId = () => {
  return (
    <div className={style.feedIdWrapper}>
      <p className={`text text_type_digits-default ${style.orderId}`}>#{fakeData.id}</p>
      <h2 className="text text_type_main-medium">{fakeData.name}</h2>
      <p
        className={`text text_type_main-default ${style.status} ${
          fakeData.status === "Выполнен" ? style.done : ""
        }`}
      >
        {fakeData.status}
      </p>
      <h2 className="text text_type_main-medium">Состав:</h2>
      <div className={style.ingredientsList}>
        {fakeData.ingredients.map((ingredient, idx) => (
          <div className={style.ingredientWrapper} key={ingredient.id}>
            <div
              className={style.imgWrapper}
              style={{ zIndex: `${fakeData.ingredients.length - idx}` }}
            >
              <div className={style.img}>
                <img src={ingredient.img} width="64" />
              </div>
            </div>
            <p className={`text text_type_main-default ${style.name}`}>{ingredient.name}</p>
            <div className={style.ingredientCost}>
              <p className="text text_type_digits-default">
                {Math.round(Math.random() * 5) + 1} x 50
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        ))}
      </div>
      <div className={style.ingredientsFooter}>
        <p className="text text_type_main-default text_color_inactive">{fakeData.date}</p>
        <div className={style.ingredientCost}>
          <p className="text text_type_digits-default">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default FeedId;
