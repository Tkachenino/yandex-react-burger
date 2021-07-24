import { NavLink } from "react-router-dom";
import OrderCard from "src/components/order-card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { logout, getIngredients } from "src/services/effects";
import {
  WS_CONNECTION_START_OWN,
  WS_CONNECTION_USER_CLOSE_OWN,
} from "../../services/action-types/websocket-own";
import style from "./orders.module.css";

const Orders = () => {
  const { ingredients } = useSelector((store) => store.ingredients);
  const {
    wsConnected,
    orders,
    //  error, total, totalToday
  } = useSelector((store) => store.wsOwn);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_OWN });
    return () => {
      dispatch({ type: WS_CONNECTION_USER_CLOSE_OWN });
    };
  }, [dispatch]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [ingredients, dispatch]);

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
        {wsConnected &&
          !!ingredients.length &&
          !!orders.length &&
          orders.map((i) => <OrderCard key={i._id} order={i} ingredients={ingredients} />)}
      </div>
    </div>
  );
};

export default Orders;
