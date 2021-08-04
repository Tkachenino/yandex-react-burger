import OrderDetail from "../../components/order-detail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../data/hooks";
import { useParams } from "react-router-dom";
import { getOrder, getIngredients } from "../../services/effects";
import style from "./order.module.css";

const Order: React.FC = () => {
  const dispatch = useDispatch();
  const { id }: { id: string } = useParams();
  const { ingredients } = useSelector((store) => store.ingredients);
  const { order } = useSelector((store) => store.order);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(getIngredients());
    }
  }, [ingredients, dispatch]);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  return (
    <div className={style.wrapper}>
      {order !== null && (
        <>
          <h2 className={`text text_type_digits-default ${style.header}`}>#{order.number}</h2>
          <OrderDetail order={order} ingredients={ingredients} />;
        </>
      )}
    </div>
  );
};

export default Order;
