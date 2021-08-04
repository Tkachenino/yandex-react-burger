import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "../../data/hooks";
import { getIngredients } from "../../services/effects";
import OrderCard from "../../components/order-card";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_USER_CLOSE,
} from "../../services/action-types/websocket";
import style from "./feed.module.css";

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const { wsConnected, orders, error, total, totalToday } = useSelector((store) => store.ws);
  const { ingredients } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_USER_CLOSE });
    };
  }, [dispatch]);

  const doneOrders = useMemo(() => {
    return orders.filter((order) => {
      return order.status === "done";
    });
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter((order) => {
      return order.status === "pending";
    });
  }, [orders]);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [ingredients, dispatch]);

  return (
    <div>
      <h1 className={`text text_type_main-large ${style.header}`}>Лента заказов</h1>
      {!!error && <p className="text text_type_main-medium">{error}</p>}
      {!wsConnected && (
        <p className="text text_type_main-medium">
          Кажется стабильная работа нарушена, давайте презеагрузим роутер
        </p>
      )}
      {wsConnected && !!ingredients.length && !!orders.length && (
        <div className={style.contentWrapper}>
          <div className={style.orderList}>
            {orders.map((i) => (
              <OrderCard key={i._id} order={i} ingredients={ingredients} />
            ))}
          </div>

          <div className={style.infoWrapper}>
            <div className={style.infoTable}>
              <div className={style.done}>
                <h2 className="text text_type_main-medium">Готовы:</h2>
                <ul className={style.list}>
                  {doneOrders.map((doneOrder) => (
                    <li
                      key={doneOrder._id}
                      className={`text text_type_digits-default ${style.listItem} ${style.listItemDone}`}
                    >
                      {doneOrder.number}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={style.progress}>
                <h2 className="text text_type_main-medium">В работе:</h2>
                <ul className={style.list}>
                  {pendingOrders.map((pendingOrder) => (
                    <li
                      key={pendingOrder._id}
                      className={`text text_type_digits-default ${style.listItem}`}
                    >
                      {pendingOrder.number}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={style.totalCount}>
              <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
              <p className={`text text_type_digits-large ${style.count}`}>{total}</p>
            </div>
            <div className={style.todayCount}>
              <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
              <p className={`text text_type_digits-large ${style.count}`}>{totalToday}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
