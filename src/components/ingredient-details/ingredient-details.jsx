import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import style from "./ingredient-details.module.css";

const IngredientDetails = () => {
  const { ingredientDetail } = useSelector((store) => store.ingredient);
  return (
    <div className={style.wrapper}>
      <h3 className={`${style.header} text text_type_main-medium mt-4 mb-8`}>
        {ingredientDetail.name}
      </h3>
      <img className={style.image} src={ingredientDetail.image_large} />
      <div className={style.info_list}>
        <div className={style.info_item}>
          <p className=" text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default  text_color_inactive">
            {ingredientDetail.calories}
          </p>
        </div>
        <div className={style.info_item}>
          <p className=" text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default  text_color_inactive">
            {ingredientDetail.proteins}
          </p>
        </div>
        <div className={style.info_item}>
          <p className=" text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default  text_color_inactive">
            {ingredientDetail.fat}
          </p>
        </div>
        <div className={style.info_item}>
          <p className=" text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default  text_color_inactive">
            {ingredientDetail.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
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

export default IngredientDetails;
