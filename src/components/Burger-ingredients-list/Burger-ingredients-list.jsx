import BurgerIngredientsItem from "../Burger-ingredients-item";
import style from "./Burger-ingredients-list.module.css";
import PropTypes from "prop-types";

const BurgerIngredientsList = ({ items, type, name }) => {
  return (
    <div className={style.wrapper}>
      <h2 className={`${style.ingredients_header} text text_type_main-medium`}>
        {name}
      </h2>
      <div className={`${style.ingredients_list}`}>
        {items
          .filter((i) => i.type === type)
          .map((i) => (
            <BurgerIngredientsItem key={i._id} data={i} />
          ))}
      </div>
    </div>
  );
};

BurgerIngredientsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      price: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  type: PropTypes.string,
  name: PropTypes.string,
};

export default BurgerIngredientsList;
