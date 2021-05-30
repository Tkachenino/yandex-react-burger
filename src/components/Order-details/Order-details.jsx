import style from "./Order-details.module.css";

const OrderDetails = () => {
  return (
    <div className={style.wrapper}>
      <h3 className={`${style.header} text text_type_main-medium`}>
        идентификатор заказа
      </h3>
      <p className={`${style.id} text text_type_digits-large primary-light`}>
        034536
      </p>
      <div className={style.svg}></div>
      <p className={`${style.info} text text_type_main-default`}>
        Ваш заказ начили готовить
      </p>
      <p className="text text_type_main-default  text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
