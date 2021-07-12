import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import style from "./burger-ingredients-item.module.css";
import { setDetailInfo, deleteDetailInfo } from "../../services/action-creators/ingredient";

const BurgerIngredientsItem = ({ data }) => {
  const dispatch = useDispatch();
  const { constructorIngredient, bun } = useSelector((state) => state.constructorIngredient);

  const count = useMemo(() => {
    if (data.type === "bun" && bun && bun._id === data._id) {
      return 2;
    } else if (constructorIngredient.some((item) => item._id === data._id)) {
      return constructorIngredient.filter((item) => item._id === data._id).length;
    }
    return 0;
  }, [bun, constructorIngredient, data._id, data.type]);

  const [showModal, setShowModal] = useState(false);
  const [, ref] = useDrag({
    type: "ingredient",
    item: data,
  });

  return (
    <>
      <div
        className={style.wrapper}
        onClick={() => {
          window.history.replaceState(null, null, `/ingredients/${data._id}`);
          dispatch(setDetailInfo({ ingredientDetail: data }));
          setShowModal(true);
        }}
      >
        {!!count && <Counter count={count} size="default" />}
        <img ref={ref} className={style.image} src={data.image} />
        <div className={style.price_wrapper}>
          <p className="text text_type_digits-default mr-2">{data.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${style.description} text text_type_main-default`}>{data.name}</p>
      </div>
      {showModal && (
        <Modal
          header="Детали ингредиента"
          onDestroyModal={() => {
            window.history.replaceState(null, null, "/");
            dispatch(deleteDetailInfo());
            setShowModal(false);
          }}
        >
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

BurgerIngredientsItem.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    type: PropTypes.string,
    _id: PropTypes.string,
  }),
};

export default BurgerIngredientsItem;
