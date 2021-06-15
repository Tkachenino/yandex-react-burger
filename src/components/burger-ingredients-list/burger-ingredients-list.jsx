import BurgerIngredientsItem from "../burger-ingredients-item";
import style from "./burger-ingredients-list.module.css";
import PropTypes from "prop-types";

const BurgerIngredientsList = ({ items, type, name, propsRef = null }) => {
  return (
    <div ref={propsRef} className={style.wrapper} id={type}>
      <h2 className={`${style.ingredients_header} text text_type_main-medium`}>{name}</h2>
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
  propsRef: PropTypes.object,
};

export default BurgerIngredientsList;
