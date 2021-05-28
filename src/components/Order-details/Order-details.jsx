import PropTypes from "prop-types";
import style from "./Order-details.module.css";

const OrderDetails = ({ item }) => {
  return (
    <div className={style.wrapper}>
      <h3 className={`${style.header} text text_type_main-medium mt-4 mb-8`}>
        {item.name}
      </h3>
      <img className={style.image} src={item.image_large} />
      <div className={style.info_list}>
        <div className={style.info_item}>
          <p className=" text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {item.calories}
          </p>
        </div>
        <div className={style.info_item}>
          <p className=" text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {item.proteins}
          </p>
        </div>
        <div className={style.info_item}>
          <p className=" text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {item.fat}
          </p>
        </div>
        <div className={style.info_item}>
          <p className=" text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default  text_color_inactive">
            {item.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

OrderDetails.propTypes = {
  item: PropTypes.shape({
    image_large: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
  }),
};

export default OrderDetails;
