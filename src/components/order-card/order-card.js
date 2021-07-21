import style from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const OrderCard = ({ order }) => {
  return (
    <div className={style.ordersItem} key={order.id}>
      <div className={style.orderInfo}>
        <p className="text text_type_digits-default">#{order.id}</p>
        <p className="text text_type_main-default text_color_inactive">{order.date}</p>
      </div>
      <h2 className="text text_type_main-medium">{order.name}</h2>
      <p className={`text text_type_main-default ${order.status === "Выполнен" ? style.done : ""}`}>
        {order.status}
      </p>
      <div className={style.ingredientsInfo}>
        <div className={style.ingredientsList}>
          {order.ingredients.map((ingredient, idx) => (
            <div
              className={style.ingredientWrapper}
              key={ingredient.id}
              style={{ zIndex: `${order.ingredients.length - idx}` }}
            >
              <div className={style.ingredient}>
                <img src={ingredient.img} width="64" />
              </div>
            </div>
          ))}
        </div>
        <div className={style.ingredientsCost}>
          <p className="text text_type_digits-default">510</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    date: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    ingredients: PropTypes.array,
  }),
};

export default OrderCard;
