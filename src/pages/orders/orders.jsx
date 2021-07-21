import { NavLink } from "react-router-dom";
import OrderCard from "src/components/order-card";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "src/services/effects";
import style from "./orders.module.css";

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

const Orders = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handlerLogout = () => {
    dispatch(logout(history));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.navWrapper}>
        <nav className={style.nav}>
          <div className={style.navItemWrapper}>
            <NavLink
              to="/profile"
              exact={true}
              className={`text text_type_main-medium ${style.navLink}`}
              activeClassName={style.activeLink}
            >
              Профиль
            </NavLink>
          </div>

          <div className={style.navItemWrapper}>
            <NavLink
              to="/profile/orders"
              exact={true}
              className={`text text_type_main-medium ${style.navLink}`}
              activeClassName={style.activeLink}
            >
              История заказов
            </NavLink>
          </div>

          <div className={style.navItemWrapper}>
            <button className={style.navButton} onClick={handlerLogout}>
              <p className={`text text_type_main-medium ${style.navLink}`}>Выход</p>
            </button>
          </div>
        </nav>

        <p className={`text text_color_inactive ${style.description}`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>

      <div className={style.ordersList}>
        {fakeData.map((i) => (
          <OrderCard key={i.id} order={i} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
