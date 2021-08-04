import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import BurgerIngredientsItem from "../burger-ingredients-item";
import { setDetailInfo, deleteDetailInfo } from "../../services/action-creators/ingredient";
import style from "./burger-ingredients-list.module.css";
import { TIngredient } from "../../data/types";

type TBurgerIngredientsListProps = {
  type: string;
  name: string;
  items: ReadonlyArray<TIngredient>;
  propsRef: React.RefObject<HTMLDivElement>;
};

const BurgerIngredientsList: React.FC<TBurgerIngredientsListProps> = ({
  items,
  type,
  name,
  propsRef,
}: TBurgerIngredientsListProps) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  const openModal = (ingredientDetail: TIngredient): void => {
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

export default BurgerIngredientsList;
