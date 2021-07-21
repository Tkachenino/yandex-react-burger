import { useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("ru");
import style from "./order-card.module.css";
import PropTypes from "prop-types";

const statusDictionary = {
  done: "Выполнен",
  pending: "Готовиться",
  createв: "Создан",
};

const OrderCard = ({ order, ingredients }) => {
  const currentIngredients = useMemo(() => {
    return order.ingredients.map((i) => {
      return ingredients.find((ingredient) => {
        return ingredient._id === i;
      });
    });
  }, [order, ingredients]);

  const orderTotalCost = useMemo(() => {
    return currentIngredients.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
  }, [currentIngredients]);

  return (
    <div className={style.ordersItem}>
      <div className={style.orderInfo}>
        <p className={`text text_type_digits-default ${style.id}`}>#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {dayjs(new Date(order.createdAt)).fromNow()},{" "}
          {dayjs(new Date(order.createdAt)).format("HH:mm")} i-GMT
          {dayjs(new Date(order.createdAt)).format("Z").split(":")[0]}
        </p>
      </div>
      <h2 className="text text_type_main-medium">{order.name}</h2>
      <p className={`text text_type_main-default ${order.status === "done" ? style.done : ""}`}>
        {statusDictionary[order.status]}
      </p>
      <div className={style.ingredientsInfo}>
        <div className={style.ingredientsList}>
          {currentIngredients.map((ingredient, idx) => (
            <div
              className={style.ingredientWrapper}
              key={idx}
              style={{ zIndex: `${currentIngredients.length - idx}` }}
            >
              <div className={style.ingredient}>
                <img src={ingredient.image_mobile} width="64" />
              </div>
            </div>
          ))}
        </div>
        <div className={style.ingredientsCost}>
          <p className="text text_type_digits-default">{orderTotalCost}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    number: PropTypes.number,
    _id: PropTypes.string,
    createdAt: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    ingredients: PropTypes.array,
  }),
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      image_mobile: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.number,
    })
  ),
};

export default OrderCard;
