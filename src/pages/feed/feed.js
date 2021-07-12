import OrderCard from "src/components/order-card";
import style from "./feed.module.css";

const fakeData = [
  {
    id: 123456,
    name: "Death Star Starship Main бургер",
    status: "Создан",
    date: "01.02.1991",
    ingredients: [
      { id: "60d3b41abdacab0026a733c6", img: "https://code.s3.yandex.net/react/code/bun-02.png" },
      { id: "60d3b41abdacab0026a733ca", img: "https://code.s3.yandex.net/react/code/meat-04.png" },
      { id: "60d3b41abdacab0026a733d2", img: "https://code.s3.yandex.net/react/code/core.png" },
    ],
  },
  {
    id: 123451,
    name: "Death Star Starship Main бургер",
    status: "Готовится",
    date: "01.02.1991",
    ingredients: [
      { id: "60d3b41abdacab0026a733c6", img: "https://code.s3.yandex.net/react/code/bun-02.png" },
      { id: "60d3b41abdacab0026a733ca", img: "https://code.s3.yandex.net/react/code/meat-04.png" },
      { id: "60d3b41abdacab0026a733d2", img: "https://code.s3.yandex.net/react/code/core.png" },
    ],
  },
  {
    id: 123453,
    name: "Death Star Starship Main бургер",
    status: "Выполнен",
    date: "01.02.1991",
    ingredients: [
      { id: "60d3b41abdacab0026a733c6", img: "https://code.s3.yandex.net/react/code/bun-02.png" },
      { id: "60d3b41abdacab0026a733ca", img: "https://code.s3.yandex.net/react/code/meat-04.png" },
      { id: "60d3b41abdacab0026a733d2", img: "https://code.s3.yandex.net/react/code/core.png" },
    ],
  },
  {
    id: 123454,
    name: "Death Star Starship Main бургер",
    status: "Выполнен",
    date: "01.02.1991",
    ingredients: [
      { id: "60d3b41abdacab0026a733c6", img: "https://code.s3.yandex.net/react/code/bun-02.png" },
      { id: "60d3b41abdacab0026a733ca", img: "https://code.s3.yandex.net/react/code/meat-04.png" },
      { id: "60d3b41abdacab0026a733d2", img: "https://code.s3.yandex.net/react/code/core.png" },
    ],
  },
];

const Feed = () => {
  return (
    <div>
      <h1 className={`text text_type_main-large ${style.header}`}>Лента заказов</h1>
      <div className={style.contentWrapper}>
        <div className={style.orderList}>
          {fakeData.map((i) => (
            <OrderCard key={i.id} order={i} />
          ))}
        </div>

        <div className={style.infoWrapper}>
          <div className={style.infoTable}>
            <div className={style.done}>
              <h2 className="text text_type_main-medium">Готовы:</h2>
              <ul className={style.list}>
                <li
                  className={`text text_type_digits-default ${style.listItem} ${style.listItemDone}`}
                >
                  034533
                </li>
                <li
                  className={`text text_type_digits-default ${style.listItem} ${style.listItemDone}`}
                >
                  033233
                </li>
                <li
                  className={`text text_type_digits-default ${style.listItem} ${style.listItemDone}`}
                >
                  0341233
                </li>
              </ul>
            </div>
            <div className={style.progress}>
              <h2 className="text text_type_main-medium">В работе:</h2>
              <ul className={style.list}>
                <li className={`text text_type_digits-default ${style.listItem}`}>034533</li>
                <li className={`text text_type_digits-default ${style.listItem}`}>033233</li>
                <li className={`text text_type_digits-default ${style.listItem}`}>0341233</li>
              </ul>
            </div>
          </div>
          <div className={style.totalCount}>
            <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
            <p className={`text text_type_digits-large ${style.count}`}>28 752</p>
          </div>
          <div className={style.todayCount}>
            <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
            <p className={`text text_type_digits-large ${style.count}`}>138</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
