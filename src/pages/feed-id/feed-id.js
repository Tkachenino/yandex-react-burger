import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder, getIngredients } from "../../services/effects";
import dayjs from "dayjs";
import style from "./feed-id.module.css";

const statusDictionary = {
  done: "Выполнен",
  pending: "Готовиться",
  createв: "Создан",
};

const FeedId = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
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

  const currentIngredients = useMemo(() => {
    if (order !== null) {
      return order.ingredients.map((i) => {
        return ingredients.find((ingredient) => {
          return ingredient._id === i;
        });
      });
    } else {
      return [];
    }
  }, [order, ingredients]);

  const orderTotalCost = useMemo(() => {
    return currentIngredients.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
  }, [currentIngredients]);

  return (
    <div className={style.feedIdWrapper}>
      {order !== null && (
        <>
          <p className={`text text_type_digits-default ${style.orderId}`}>#{order.number}</p>
          <h2 className="text text_type_main-medium">{order.name}</h2>
          <p
            className={`text text_type_main-default ${style.status} ${
              order.status === "done" ? style.done : ""
            }`}
          >
            {statusDictionary[order.status]}
          </p>
          <h2 className="text text_type_main-medium">Состав:</h2>
          <div className={style.ingredientsList}>
            {currentIngredients.map((ingredient, idx) => (
              <div className={style.ingredientWrapper} key={idx}>
                <div
                  className={style.imgWrapper}
                  style={{ zIndex: `${currentIngredients.length - idx}` }}
                >
                  <div className={style.img}>
                    <img src={ingredient.image_mobile} width="64" />
                  </div>
                </div>
                <p className={`text text_type_main-default ${style.name}`}>{ingredient.name}</p>
                <div className={style.ingredientCost}>
                  <p className="text text_type_digits-default">{ingredient.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            ))}
          </div>
          <div className={style.ingredientsFooter}>
            <p className="text text_type_main-default text_color_inactive">
              {dayjs(new Date(order.createdAt)).fromNow()},{" "}
              {dayjs(new Date(order.createdAt)).format("HH:mm")} i-GMT
              {dayjs(new Date(order.createdAt)).format("Z").split(":")[0]}
            </p>
            <div className={style.ingredientCost}>
              <p className="text text_type_digits-default">{orderTotalCost}</p>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedId;
