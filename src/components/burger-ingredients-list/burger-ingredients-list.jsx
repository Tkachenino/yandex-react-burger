import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import BurgerIngredientsItem from "../burger-ingredients-item";
import { setDetailInfo, deleteDetailInfo } from "../../services/action-creators/ingredient";
import style from "./burger-ingredients-list.module.css";
import PropTypes from "prop-types";

const BurgerIngredientsList = ({ items, type, name, propsRef = null }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const openModal = (ingredientDetail) => {
    dispatch(setDetailInfo({ ingredientDetail }));
    setShowModal(true);
  };

  return (
    <div ref={propsRef} className={style.wrapper} id={type}>
      <h2 className={`${style.ingredients_header} text text_type_main-medium`}>{name}</h2>
      <div className={`${style.ingredients_list}`}>
        {items
          .filter((i) => i.type === type)
          .map((i) => (
            <BurgerIngredientsItem key={i._id} data={i} openModal={() => openModal(i)} />
          ))}
      </div>
      {showModal && (
        <Modal
          header="Детали ингредиента"
          onDestroyModal={() => {
            setShowModal(false);
            dispatch(deleteDetailInfo());
          }}
        >
          <IngredientDetails />
        </Modal>
      )}
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
